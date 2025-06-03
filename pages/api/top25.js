export default function handler(req, res) {
  // Mock data, replace with real StayLoud.io scraper later
  const users = Array.from({ length: 25 }, (_, i) => ({
    handle: `user${i + 1}`,
    engagement: Math.floor(Math.random() * 10000),
    lastTweet: "#LOUD to the moon!",
    likes: Math.floor(Math.random() * 300),
    retweets: Math.floor(Math.random() * 100),
  }));
  res.status(200).json(users);
}
