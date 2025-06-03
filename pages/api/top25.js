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
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) ' +
          'AppleWebKit/537.36 (KHTML, like Gecko) ' +
          'Chrome/114.0.0.0 Safari/537.36',
        Accept: 'application/json',
      },
      timeout: 10000,
    });

    console.log('Data received from StayLoud:', response.data);

    if (!response.data || !response.data.data) {
      console.error('Invalid data structure from StayLoud API');
      return res.status(500).json({ error: 'Invalid data from API' });
    }

    const topUsers = response.data.data.map(({ twitterHandle, userName }) => ({
      handle: twitterHandle,
      username: userName,
    }));

    return res.status(200).json(topUsers);
  } catch (error) {
    console.error('Error in API route: ', error.message);

    if (error.response) {
      console.error('Status code:', error.response.status);
      console.error('Response data:', error.response.data);
    }

    return res.status(500).json({ error: 'Could not fetch leaderboard data' });
  }
}
