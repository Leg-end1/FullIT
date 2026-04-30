import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import cors from "cors";
import bodyParser from "body-parser";
import { GoogleGenAI } from "@google/genai";

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
    
    // This allows you to use your own key from the "Settings > Secrets" menu
    const apiKey = process.env.EXTERNAL_AI_API_KEY || process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({ error: "No AI API Key found. Please add EXTERNAL_AI_API_KEY in Settings > Secrets." });
    }

    try {
      // Using Gemini via server-side for better deployment reliability
      const ai = new GoogleGenAI({ apiKey });
      const result = await ai.models.generateContent({
        model: "gemini-1.5-flash",
        contents: `Evaluate this code for the task: "${taskDescription}". 
        Code: \n${code}\n
        Return JSON ONLY: { "success": boolean, "review": string, "score": number, "optimizationTips": string[] }`,
        config: {
          responseMimeType: "application/json"
        }
      });
      
      if (!result.text) {
        throw new Error("The AI model returned an empty response.");
      }

      const data = JSON.parse(result.text);
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
