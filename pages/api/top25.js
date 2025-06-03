import axios from 'axios';

export default async function handler(req, res) {
  try {
    // Fetch leaderboard data from the actual StayLoud API
    const { data } = await axios.get('https://foundation-api.stayloud.io/ipfs/list/', {
      params: {
        type: 'leaderboard',
        page: 1,
        limit: 25,
        sortBy: 'score',
        sortOrder: 'desc',
      },
    });

    // `data.data` is an array of leaderboard entries
    // Each entry looks like:
    // {
    //   twitterHandle: "0xWenMoon",
    //   userName: "WenMoon 闻月 💚",
    //   ...other fields
    // }

    const topUsers = data.data.map(({ twitterHandle, userName }) => ({
      handle: twitterHandle,
      username: userName,
    }));

    res.status(200).json(topUsers);
  } catch (error) {
    console.error('Failed to fetch leaderboard:', error);
    res.status(500).json({ error: 'Could not fetch leaderboard data' });
  }
}
