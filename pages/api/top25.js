import axios from 'axios';
import * as cheerio from 'cheerio';

export default async function handler(req, res) {
  try {
    const { data: html } = await axios.get('https://www.stayloud.io');
    const $ = cheerio.load(html);
    const users = [];

    $('td[data-slot="table-cell"]').each((_, el) => {
      const td = $(el);

      const displayName = td.find('a[title]').attr('title')?.trim();
      const handleText = td.find('span.text-gray-500').text()?.trim(); // e.g., "@0xWenMoon"
      const handle = handleText?.replace(/^@/, '');

      if (displayName && handle) {
        users.push({ displayName, handle });
      }
    });

    const top25 = users.slice(0, 25).map((user) => ({
      handle: user.handle,
      displayName: user.displayName,
      engagement: Math.floor(Math.random() * 10000),
      lastTweet: "(fetched later)",
      likes: 0,
      retweets: 0,
    }));

    res.status(200).json(top25);
  } catch (error) {
    console.error('Scraper error:', error.message);
    res.status(500).json({ error: 'Failed to scrape leaderboard' });
  }
}
