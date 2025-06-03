import axios from 'axios';
import * as cheerio from 'cheerio';

export default async function handler(req, res) {
  try {
    const { data: html } = await axios.get('https://www.stayloud.io');
    const $ = cheerio.load(html);

    const users = [];

    $('tr[data-slot="table-row"]').each((_, el) => {
      if (users.length >= 25) return false;

      const row = $(el);
      const userLink = row.find('a[href*="twitter.com/i/user/"]').first();
      const handleSpan = row.find('span.text-sm.text-gray-500').first();

      if (!userLink.length || !handleSpan.length) return;

      const username = userLink.text().trim();
      let handle = handleSpan.text().trim();

      if (!username || !handle.startsWith('@')) return;

      handle = handle.slice(1); // Remove leading '@'
      users.push({ handle, username });
    });

    res.status(200).json(users);
  } catch (error) {
    console.error('Failed to scrape StayLoud.io:', error);
    res.status(500).json({ error: 'Could not fetch leaderboard data' });
  }
}
