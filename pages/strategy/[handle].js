// pages/strategy/[handle].js

import { useRouter } from 'next/router';
import fs from 'fs';
import path from 'path';

export async function getServerSideProps({ params }) {
  const filePath = path.join(process.cwd(), 'public', 'data', 'strategies', `${params.handle}.json`);
  let tweets = [];

  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    tweets = JSON.parse(fileContent);
  } catch (error) {
    console.error(`Could not read file for handle: ${params.handle}`, error);
  }

  return {
    props: {
      handle: params.handle,
      tweets,
    },
  };
}

export default function StrategyPage({ handle, tweets }) {
  const router = useRouter();

  if (!tweets || tweets.length === 0) {
    return <div className="p-4 text-center">No strategy data found for <b>{handle}</b>.</div>;
  }

  const loudioCount = tweets.filter(t => t.containsLoudio).length;
  const hashtagCount = tweets.reduce((acc, t) => acc + t.hashtags.length, 0);
  const mentionCount = tweets.reduce((acc, t) => acc + t.mentions.length, 0);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">@{handle}'s Strategy Insights</h1>

      <div className="mb-6 grid grid-cols-3 gap-4 text-center bg-gray-100 p-4 rounded-lg shadow">
        <div>
          <p className="text-lg font-semibold">{tweets.length}</p>
          <p className="text-sm">Total Tweets</p>
        </div>
        <div>
          <p className="text-lg font-semibold">{loudioCount}</p>
          <p className="text-sm">Mentions of “loudio”</p>
        </div>
        <div>
          <p className="text-lg font-semibold">{mentionCount}</p>
          <p className="text-sm">Total Mentions</p>
        </div>
      </div>

      <ul className="space-y-4">
        {tweets.map((tweet, idx) => (
          <li key={idx} className="border p-4 rounded-md shadow-sm bg-white">
            <a
              href={tweet.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 font-semibold"
            >
              View Tweet ↗
            </a>
            <p className="text-sm text-gray-600 mt-1">
              Time: {new Date(tweet.timestamp).toLocaleString()} <span className="text-xs">(UTC)</span>
            </p>
            {tweet.containsLoudio && (
              <p className="text-green-600 font-bold text-sm mt-1">🟢 Mentions “loudio”</p>
            )}
            {tweet.hashtags.length > 0 && (
              <p className="text-sm mt-1">
                Hashtags: <span className="text-gray-800">{tweet.hashtags.join(', ')}</span>
              </p>
            )}
            {tweet.mentions.length > 0 && (
              <p className="text-sm mt-1">
                Mentions: <span className="text-gray-800">{tweet.mentions.join(', ')}</span>
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
