import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import cors from "cors";
import bodyParser from "body-parser";
import OpenAI from "openai";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(bodyParser.json());

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  app.post("/api/evaluate", async (req, res) => {
    const { code, taskDescription } = req.body;
    
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({ error: "No OpenAI API Key found. Please add OPENAI_API_KEY in Settings > Secrets." });
    }

    try {
      // Using OpenAI via server-side
      const openai = new OpenAI({ apiKey });
      
      const prompt = `Evaluate this code for the task: "${taskDescription}". 
      Code: \n${code}\n
      Return JSON ONLY: { "success": boolean, "review": string, "score": number, "optimizationTips": string[] }`;

      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini", // Use gpt-4o-mini or your preferred model
        messages: [{ role: "user", content: prompt }],
        response_format: { type: "json_object" }
      });
      
      const text = response.choices[0]?.message?.content;
      if (!text) {
        throw new Error("The AI model returned an empty response.");
      }

      const data = JSON.parse(text);
      res.json(data);
    } catch (error: any) {
      console.error("AI Evaluation Error:", error);
      const errorMessage = error?.message || "Check your API key and quota.";
      res.status(500).json({ error: `AI Error: ${errorMessage}` });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
