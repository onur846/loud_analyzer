import Head from 'next/head';
import '../styles/globals.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [topUsers, setTopUsers] = useState([]);

  useEffect(() => {
    async function fetchTopUsers() {
      const response = await axios.get('/api/top25');
      setTopUsers(response.data);
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
            <h2>@{user.handle}</h2>
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
