export default function handler(req, res) {
  const { handle } = req.query;

  const tweets = [
    {
      text: `Loving the $LOUD movement! #StayLoud #LOUD`,
      likes: 124,
      retweets: 44,
    },
    {
      text: `Huge momentum for #LOUD! 🚀🚀🚀`,
      likes: 98,
      retweets: 31,
    },
  ];

  const hashtags = ['StayLoud', 'LOUD'];
  const summary = `@${handle} posts consistently in the evening, uses trending hashtags like #LOUD, and includes emojis to boost engagement.`;

  res.status(200).json({ handle, tweets, hashtags, summary });
}
