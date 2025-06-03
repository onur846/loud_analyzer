import axios from 'axios';
import * as cheerio from 'cheerio';

export default async function handler(req, res) {
  try {
    const { data: html } = await axios.get('https://www.stayloud.io');
    const $ = cheerio.load(html);

    const users = [];

    // Select all leaderboard rows - they are <tr> elements with a special attribute
    $('tr[data-slot="table-row"]').each((_, el) => {
      if (users.length >= 25) return false; // stop after 25

      const row = $(el);

      // Twitter username inside the <a> link's text
      // According to snippet, inside a div.flex.flex-col > a[href*="twitter.com"] with class containing font-bold text-base etc.
      const userLink = row.find('a[href*="twitter.com/i/user/"]').first();
      if (userLink.length === 0) return;

      const username = userLink.text().trim();
      if (!username) return;

      // Twitter handle inside the <span> with class "text-sm text-gray-500", format @handle
      const handleSpan = row.find('span.text-sm.text-gray-500').first();
      if (handleSpan.length === 0) return;

      let handle = handleSpan.text().trim();
      if (!handle.startsWith('@')) return;
      handle = handle.slice(1); // Remove leading '@'

      users.push({ handle, username });
    });

    res.status(200).json(users);
  } catch (error) {
    console.error('Failed to scrape StayLoud.io:', error);
    res.status(500).json({ error: 'Could not fetch leaderboard data' });
  }
}
