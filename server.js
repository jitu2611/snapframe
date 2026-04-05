/**
 * SnapFrame — AI style suggestion backend
 * Uses @anthropic-ai/sdk (open-source connector) to analyze screenshots
 * and recommend the best visual style settings.
 *
 * Run: npm start  →  http://localhost:3000
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const Anthropic = require('@anthropic-ai/sdk');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.static(path.join(__dirname, 'public')));

// ── AI Style Suggestion endpoint ──────────────────────────────────────────────
app.post('/api/ai-suggest', async (req, res) => {
  const { apiKey, imageData } = req.body;

  if (!apiKey || !imageData) {
    return res.status(400).json({ error: 'Missing apiKey or imageData' });
  }

  const client = new Anthropic({ apiKey });

  try {
    const message = await client.messages.create({
      model: 'claude-opus-4-6',
      max_tokens: 512,
      system: `You are a visual design expert who specializes in making screenshots look beautiful for social media, documentation, and portfolio work.

When shown a screenshot, analyze:
1. The content type (UI, code, data, photo, etc.)
2. The dominant colors and mood
3. The appropriate platform/context it might be shared on

Then provide:
- A SHORT, specific style recommendation (2-3 sentences max)
- Concrete settings in the "apply" JSON

You MUST respond with valid JSON in exactly this format:
{
  "suggestion": "Your recommendation text here",
  "apply": {
    "frame": "none|browser|window|iphone|android|macbook",
    "bgType": "solid|gradient|mesh",
    "bgGradientIndex": 0-8,
    "padding": 40-120
  }
}

Frame guidelines:
- Code/terminal screenshots → "window" or "browser"
- Mobile app screenshots → "iphone" or "android"
- Desktop app screenshots → "macbook" or "browser"
- Abstract/design work → "none"

Background guidelines:
- Dark/code content → dark mesh (bgType: "mesh") or deep gradient
- Colorful/vibrant UI → gradient that complements
- Clean/minimal UI → solid dark or light color
- Photos → subtle gradient

Gradient index reference (0-8):
0=Aurora(purple-violet), 1=Sunset(pink-red), 2=Ocean(blue-cyan),
3=Lime(green-teal), 4=Peach(pink-yellow), 5=Midnight(deep blue),
6=Rose(gold-peach), 7=Violet(lavender-pink), 8=Mint(green-blue)`,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'image',
              source: {
                type: 'base64',
                media_type: 'image/jpeg',
                data: imageData,
              },
            },
            {
              type: 'text',
              text: 'Analyze this screenshot and recommend the best visual style settings for SnapFrame. Return valid JSON only.',
            },
          ],
        },
      ],
    });

    const raw = message.content[0]?.text?.trim() || '{}';

    // Extract JSON even if wrapped in markdown code blocks
    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('No JSON found in response');

    const parsed = JSON.parse(jsonMatch[0]);
    return res.json(parsed);

  } catch (err) {
    console.error('[AI] Error:', err.message);
    return res.status(500).json({
      suggestion: `Could not generate suggestion: ${err.message}`,
      apply: null,
    });
  }
});

// ── Fallback: serve index.html for all routes ────────────────────────────────
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`\n🖼  SnapFrame running at http://localhost:${PORT}`);
  console.log(`   AI style suggestions powered by Claude (Anthropic SDK)\n`);
});
