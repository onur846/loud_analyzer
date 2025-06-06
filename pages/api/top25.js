export default async function handler(req, res) {
  try {
    const response = await fetch("http://185.215.165.8:3000/top25");
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Fetch failed:", error);
    res.status(500).json({ error: "Could not fetch proxy data" });
  }
}
