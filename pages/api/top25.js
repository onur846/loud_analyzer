import axios from 'axios';

export default async function handler(req, res) {
  try {
    const { data } = await axios.get(
      'https://foundation-api.stayloud.io/ipfs/list/',
      {
        params: {
          type: 'leaderboard',
          page: 1,
          limit: 25,
          sortBy: 'score',
          sortOrder: 'desc',
        },
      }
    );

    const users = data?.data?.map((entry) => ({
      username: entry.name || '',
      handle: entry.twitterHandle || '',
      avatar: entry.image || '',
      score: entry.score || 0,
    })) || [];

    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
}
