const apiKey = `0ec94bda00221f0e8e5e3eede835ad0f`;
import express from "express";
import axios from "axios";

const app = express();
const PORT = 3000;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept"
  );
  next();
});

app.get("/api/search", async (req, res) => {
  try {
    const query = req.query.query || "";
    const resources = req.query.resources; // tags
    const externalUrl = `https://api.themoviedb.org/3/search/multi?query=${encodeURIComponent(
      query
    )}&api_key=${apiKey}`;
    /*const externalUrl = `https://api.rawg.io/api/games?key=${apiKey}&format=json&search=${encodeURIComponent(
      query
    )}&resources=${encodeURIComponent(resources)}`; */
    const response = await axios.get(externalUrl);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching external API:", error);
    res.status(500).json({ error: "Failed to fetch external data" });
  }
});

app.get("/api/:type/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const type = req.params.type;
    const externalUrl = `https://api.themoviedb.org/3/${type}/${id}?api_key=${apiKey}`;
    const response = await axios.get(externalUrl, {
      headers: { "User-Agent": "MyGameApp/1.0" },
    });
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching external API", error);
    res.status(500).json({ error: "Failed to fetch external data" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
