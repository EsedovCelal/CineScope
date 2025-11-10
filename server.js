const apiKey = `08eef91c5a865641cc85ae7b771d4002f78ef3cb`;
import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
const PORT = 3000;
app.use(cors());

app.get("/api/data", async (req, res) => {
  const { query } = req.query;
  try {
    const externalUrl = `https://www.giantbomb.com/api/search/?api_key=08eef91c5a865641cc85ae7b771d4002f78ef3cb&format=json&query=${encodeURIComponent(
      query
    )}`;
    const response = await fetch(externalUrl);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching external API:", error);
    res.status(500).json({ error: "Failed to fetch external data" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
