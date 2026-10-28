const PROMPT = `You are a photo-sharing safety reviewer. Look at the attached photo and decide who it is okay to share with.
Categories:
- "safe": harmless for anyone, including public social media (landscapes, food, pets, objects, art, groups in public settings with nothing sensitive).
- "family": fine for close family and friends but not for the public: identifiable children, people in private/home settings, swimwear or casual-intimate moments, visible home interior or address clues, workplace or school details, license plates, embarrassing moments, or location-revealing context.
- "unsafe": should not be shared: nudity or sexual content, graphic violence or injury, weapons, drugs, ID documents, bank cards, passwords or personal data readable in the image, minors in vulnerable situations, hateful imagery, or anything illegal or dangerous.
When unsure between two categories choose the more cautious one.
Reply with JSON only, no other text: {"category":"safe|family|unsafe","confidence":0-100,"title":"short 3-6 word description of the photo","reasons":["1-3 short reasons"],"tip":"one short practical tip, or empty string"}`;

module.exports = async (req, res) => {
  if (req.method !== "POST") return res.status(405).json({ error: "POST only" });
  const image = req.body && req.body.image;
  if (!image || typeof image !== "string" || image.length > 4000000)
    return res.status(400).json({ error: "Invalid image" });
  try {
    const r = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model: "claude-sonnet-5-5",
        max_tokens: 500,
        system: PROMPT,
        messages: [{ role: "user", content: [
          { type: "image", source: { type: "base64", media_type: "image/jpeg", data: image } },
          { type: "text", text: "Review this photo." }
        ]}]
      })
    });
    if (!r.ok) return res.status(502).json({ error: "AI service error" });
    const data = await r.json();
    const text = (data.content || []).map(c => c.text || "").join("");
    const json = JSON.parse(text.replace(/```json|```/g, "").trim());
    res.setHeader("Cache-Control", "no-store"); // nothing is stored
    return res.status(200).json(json);
  } catch (e) {
    return res.status(500).json({ error: "Could not analyze image" });
  }
};
