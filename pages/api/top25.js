import axios from 'axios';
import * as cheerio from 'cheerio';

export default async function handler(req, res) {
  try {
    const { data: html } = await axios.get('https://www.stayloud.io');
    const $ = cheerio.load(html);
    const handles = [];

    // Select anchor tags that link to Twitter profiles
    $('a[href*="twitter.com/"]').each((_, el) => {
      const url = $(el).attr('href');
      const match = url.match(/twitter\.com\/([A-Za-z0-9_]+)/);
      if (match && match[1] && !handles.includes(match[1])) {
        handles.push(match[1]);
      }
    });

    // Limit to top 25
    const top25 = handles.slice(0, 25).map((handle) => ({
      handle,
      engagement: Math.floor(Math.random() * 10000), // Placeholder
      lastTweet: "(to be fetched separately)",
      likes: 0,
      retweets: 0,
    }));

    res.status(200).json(top25);
  } catch (error) {
    console.error('Failed to scrape StayLoud.io:', error);
    res.status(500).json({ error: 'Could not fetch leaderboard data' });
  }
}
