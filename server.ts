import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import cors from "cors";
import bodyParser from "body-parser";
import OpenAI from "openai";

async function startServer() {
  const app = express();
  const PORT = 3000;

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  app.use(cors());
  app.use(bodyParser.json());

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  app.post("/api/evaluate", async (req, res) => {
    const { code, initialCode, taskTitle, taskDescription, coreObjectives } = req.body;

    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ error: "OpenAI API key not configured." });
    }

    try {
      const prompt = `You are an elite and strict Senior Software Architect. Your job is to evaluate a student's code submission for the technical assignment: "${taskTitle}".

      ASSIGNMENT CONTEXT:
      Description: ${taskDescription}
      Core Objectives: ${coreObjectives}
      
      INITIAL BOILERPLATE CODE (What they started with):
      \`\`\`javascript
      ${initialCode}
      \`\`\`

      STUDENT'S SUBMISSION (What to evaluate):
      \`\`\`javascript
      ${code}
      \`\`\`

      GRADING CRITERIA:
      1. CRITICAL: If the submission is identical to the boilerplate code, identical to an empty function, or lacks any actual implementation of the objectives, YOU MUST SET success: false and score: 0.
      2. CHEATING/LAZINESS: Do not pass the student if they only added comments or whitespace.
      3. Functional Correctness: Does it solve all objectives?
      4. Code Quality: Is it clean, readable, and idiomatic?
      5. Professionalism: Is there proper error handling if applicable?

      REVIEW STRUCTURE:
      - Start with a brief, professional observation.
      - If they failed because of no-op/boilerplate submission, tell them firmly that they must implement the logic.
      - Provide 1-2 specific architectural or security improvements.
      - Final score must be 0-100. Passing is 70+.

      Return ONLY a JSON object:
      {
        "success": boolean,
        "review": "markdown string",
        "score": number,
        "optimizationTips": ["tip 1", "tip 2"]
      }`;

      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [{ role: "system", content: "You are a senior mentor who values actual implementation over empty submissions." }, { role: "user", content: prompt }],
        response_format: { type: "json_object" },
      });

      const content = response.choices[0].message.content;
      if (!content) throw new Error("Empty response from OpenAI");

      const data = JSON.parse(content);
      res.json(data);
    } catch (error: any) {
      console.error("AI Evaluation Error:", error);
      res.status(500).json({ error: "System Review Error: " + (error.message || "Unknown error") });
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
