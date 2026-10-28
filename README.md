# ShareSafe – deploy in about 10 minutes (free)

## 1. Get an API key
Go to console.anthropic.com, create an account, add a few dollars of credit, and create an API key.
(Each photo costs a small fraction of a cent to a few cents.)

## 2. Put the project online with Vercel
1. Create a free account at vercel.com.
2. Upload this folder to a new GitHub repository (github.com -> New repository -> "uploading an existing file"), then in Vercel click "Add New -> Project" and import it.
   (Or install Vercel CLI and run `vercel` inside this folder.)
3. Before deploying, open Settings -> Environment Variables and add:
   Name: ANTHROPIC_API_KEY   Value: your key
4. Click Deploy. You get a real link such as https://sharesafe.vercel.app

## 3. Your own domain (optional)
Buy a domain (e.g. from Namecheap) and connect it in Vercel -> Settings -> Domains.

## 4. QR code
Paste your final link into qr-code-generator.com or qrcode-monkey.com and download the QR image.

## Privacy
Photos are never stored: the browser shows them locally, the server forwards them to the AI and returns the answer, and nothing is saved anywhere.

## Protect your wallet
Everyone who uses the site spends your API credit. In console.anthropic.com set a monthly spending limit.
