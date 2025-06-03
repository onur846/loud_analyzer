import Head from 'next/head';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [topUsers, setTopUsers] = useState([]);

  useEffect(() => {
    async function fetchTopUsers() {
      try {
        const response = await axios.get('https://loud-puppeteer.onrender.com/top25'); // 🔁 Direct Render call
        setTopUsers(response.data);
      } catch (error) {
        console.error('Error fetching top users:', error);
      }
    }
    fetchTopUsers();
  }, []);

  return (
    <div className="container">
      <Head>
        <title>LOUD Top 25 Analyzer</title>
      </Head>

      <header className="header">
        <h1>🚀 LOUD Top 25 Analyzer</h1>
        <p>Discover what the top $LOUD influencers are doing to stay ahead.</p>
      </header>

      <section className="grid">
        {topUsers.map((user, index) => (
          <div className="card" key={index}>
            <div className="flex items-center gap-3 mb-2">
              <img
                src={user.avatar || `https://unavatar.io/twitter/${user.handle.replace('@', '')}`}
                alt="Avatar"
                className="w-12 h-12 rounded-full"
              />
              <div>
                <h2 className="text-lg font-bold">
                  #{index + 1} @{user.handle}
                </h2>
                <div className="text-sm text-gray-600">
                  {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : '🎯'}
                </div>
              </div>
            </div>
            <p><strong>Engagement:</strong> {user.engagement}</p>
            <p className="tweet">“{user.lastTweet}”</p>
            <p>❤️ {user.likes} 🔁 {user.retweets}</p>
            <a className="button" href={`/user/${user.handle}`}>View Strategy →</a>
          </div>
        ))}
      </section>
    </div>
  );
}
