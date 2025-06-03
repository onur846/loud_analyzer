import axios from 'axios';
import * as cheerio from 'cheerio';

export default async function handler(req, res) {
  try {
    const { data: html } = await axios.get('https://www.stayloud.io');
    const $ = cheerio.load(html);
    const handles = [];

    // Select Twitter profile links that match user id format
    $('a[href*="twitter.com/i/user/"]').each((_, el) => {
      const title = $(el).attr('title')?.trim();
      const displayName = $(el).text().trim();

      if (title && !handles.includes(title)) {
        handles.push(title);
      } else if (displayName && !handles.includes(displayName)) {
        handles.push(displayName);
      }
    });

    const top25 = handles.slice(0, 25).map((name) => ({
      handle: name,
      engagement: Math.floor(Math.random() * 10000), // placeholder
      lastTweet: "(fetched later)",
      likes: 0,
      retweets: 0,
    }));

    res.status(200).json(top25);
  } catch (error) {
    console.error('Error scraping StayLoud.io:', error.message);
    res.status(500).json({ error: 'Failed to fetch top 25 users' });
  }
}
