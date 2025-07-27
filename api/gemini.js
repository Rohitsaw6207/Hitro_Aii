// api/gemini.js

export default async function handler(req, res) {
  try {
    const { prompt, type } = req.body;

    const systemPromptMap = {
      code: "You are a professional Code Assistant who writes, explains, and debugs code.",
      student: "You are a helpful Student Assistant that helps explain academic topics in simple terms.",
      translator: "You are a multilingual Translator that accurately translates text between languages."
    };

    const systemPrompt = systemPromptMap[type] || "";

    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=' + process.env.VITE_GEMINI_API_KEY, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `${systemPrompt}\n${prompt}`
              }
            ]
          }
        ]
      })
    });

    const data = await response.json();
    res.status(200).json({ text: data.candidates?.[0]?.content?.parts?.[0]?.text || "No response" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to call Gemini API' });
  }
}
