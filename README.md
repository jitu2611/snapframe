# 🖼 SnapFrame — Screenshot Beautifier

> Open-source screenshot beautifier with AI-powered style suggestions. Inspired by Shotwell.

[![License: MIT](https://img.shields.io/badge/License-MIT-purple.svg)](LICENSE)
[![Claude AI](https://img.shields.io/badge/AI-Claude%20by%20Anthropic-blueviolet)](https://anthropic.com)

---

## What is SnapFrame?

Drop any screenshot in. Get a beautiful, shareable image out.

SnapFrame adds **device frames**, **gradient backgrounds**, **shadows**, and **corner rounding** to your screenshots — directly in the browser, zero installs. Paste from clipboard, export PNG, done.

The optional **AI style engine** (Claude) analyzes your screenshot and recommends the perfect background, frame, and padding automatically.

---

## Features

| Feature | Details |
|---|---|
| 📸 Drag & drop / paste | Drop files or Ctrl+V directly from clipboard |
| 🖥 Device frames | iPhone 15, Android, MacBook, Browser, Window chrome |
| 🎨 Backgrounds | 20 solid colors, 9 gradient presets, 6 mesh patterns |
| 🌑 Shadow & radius | Adjustable drop shadow blur, opacity, corner radius |
| 📐 Canvas presets | Auto, 1:1, 16:9, 4:3, Twitter card, OG Image |
| ✨ AI suggestions | Claude analyzes the screenshot and recommends style |
| 💾 Export | Download PNG or copy to clipboard in one click |
| 🔒 Private | No uploads, no tracking — all rendering is local in-browser |

---

## Quick Start

### Use without Node.js (core features only)

Open `public/index.html` directly in any modern browser. All canvas rendering is local — no server needed for the core features.

### Full setup (with AI suggestions)

```bash
git clone https://github.com/jitu2611/snapframe.git
cd snapframe
npm install
npm start
# → http://localhost:3000
```

Then enter your [Anthropic API key](https://console.anthropic.com) in the ✨ AI Style Suggest panel.

---

## Open Source AI Connector — Anthropic Claude SDK

The AI feature uses **[`@anthropic-ai/sdk`](https://github.com/anthropics/anthropic-sdk-node)**.

When you click "Suggest Style", Claude (Opus model with vision) receives your screenshot and returns:
- A short design recommendation explaining the reasoning
- Auto-applied settings: frame type, background style, gradient index, padding

The API key is stored only in `localStorage` and sent only to your local `server.js` — never to any third party.

---

## Project Structure

```
snapframe/
├── public/
│   └── index.html     # Full app — Canvas API, drag-drop, UI, export
├── server.js          # Express server — static files + /api/ai-suggest
├── package.json
├── .env.example
└── README.md
```

---

## Contributing

PRs welcome! Ideas:

- [ ] More device frames (iPad, Samsung, Apple Watch)
- [ ] Text overlays / captions
- [ ] Batch processing (multiple screenshots)
- [ ] Vercel/Netlify one-click deploy button
- [ ] Chrome extension for instant beautification

---

## License

MIT © 2026 [jitu2611](https://github.com/jitu2611)
