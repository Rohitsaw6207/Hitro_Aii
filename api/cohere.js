// api/cohere.js

export default async function handler(req, res) {
  try {
    const { prompt, type } = req.body;

    const systemPromptMap = {
      blog: "You are a Blog Writing Assistant that writes SEO-friendly and engaging blog articles.",
      resume: "You are a Resume Assistant who writes, improves, and formats professional resumes."
    };

    const response = await fetch("https://api.cohere.ai/v1/chat", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.VITE_COHERE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "command-r-plus",
        message: `${systemPromptMap[type]}\n${prompt}`,
      }),
    });

    const data = await response.json();
    res.status(200).json({ text: data.text || "No response" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to call Cohere API' });
  }
}
