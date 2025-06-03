export default async function handler(req, res) {
  try {
    const response = await fetch("https://loud-puppeteer.onrender.com/top25");
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Fetch failed:", error);
    res.status(500).json({ error: "Could not fetch proxy data" });
  }
}
