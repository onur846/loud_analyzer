import axios from 'axios';

export default async function handler(req, res) {
  try {
    const response = await axios.get('https://foundation-api.stayloud.io/ipfs/list/', {
      params: {
        type: 'leaderboard',
        page: 1,
        limit: 25,
        sortBy: 'score',
        sortOrder: 'desc',
      },
      headers: {
        // Set User-Agent to mimic a browser or stayloud official client
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) ' +
          'AppleWebKit/537.36 (KHTML, like Gecko) ' +
          'Chrome/114.0.0.0 Safari/537.36',
        // Optionally, you can add Accept header
        Accept: 'application/json',
      },
      timeout: 10000, // 10 seconds timeout
    });

    if (!response.data || !response.data.data) {
      return res.status(500).json({ error: 'Invalid data received from StayLoud API' });
    }

    const topUsers = response.data.data.map(({ twitterHandle, userName }) => ({
      handle: twitterHandle,
      username: userName,
    }));

    res.status(200).json(topUsers);
  } catch (error) {
    console.error('Error fetching leaderboard:', error.message);

    // If the error has a response from server, log that too
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    }

    res.status(500).json({ error: 'Could not fetch leaderboard data' });
  }
}
