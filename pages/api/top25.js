export default async function handler(req, res) {
  try {
    const response = await fetch('https://loud-proxy.onrender.com');
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Frontend API error:', error);
    res.status(500).json({ error: 'Could not fetch proxy data' });
  }
}
