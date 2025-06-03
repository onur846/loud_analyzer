import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function UserDetail() {
  const router = useRouter();
  const { handle } = router.query;
  const [data, setData] = useState(null);

  useEffect(() => {
    if (handle) {
      axios.get(`/api/user/${handle}`).then((res) => setData(res.data));
    }
  }, [handle]);

  if (!data) return <p className="loading">Loading strategy…</p>;

  return (
    <div className="container">
      <header className="header">
        <h1>@{handle}'s Strategy</h1>
        <p>Explore how this user climbed to the top 💡</p>
      </header>
      <div className="card">
        <h3>🔥 Top Hashtags</h3>
        <ul className="hashtags">{data.hashtags.map((tag, i) => <li key={i}>#{tag}</li>)}</ul>

        <h3>🗣️ Tweets (Last 24h)</h3>
        <ul className="tweets">{data.tweets.map((tweet, i) => (
          <li key={i}><p>“{tweet.text}”</p><p>❤️ {tweet.likes} 🔁 {tweet.retweets}</p></li>
        ))}</ul>

        <h3>🧠 AI Strategy Summary</h3>
        <p className="summary">{data.summary}</p>
      </div>
    </div>
  );
}
