import { useEffect, useState } from 'react';

export default function Home() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch(
          'https://foundation-api.stayloud.io/ipfs/list/?type=leaderboard&page=1&limit=25&sortBy=score&sortOrder=desc'
        );
        const json = await res.json();

        const cleaned = json?.data?.map((entry) => ({
          username: entry.name,
          handle: entry.twitterHandle,
          avatar: entry.image,
          score: entry.score,
        })) || [];

        setUsers(cleaned);
      } catch (err) {
        console.error('❌ Failed to load users:', err);
      }
    }

    fetchUsers();
  }, []);

  return (
    <main style={{ padding: 32 }}>
      <h1 style={{ fontSize: '2rem', marginBottom: 24 }}>Top 25 StayLoud Users</h1>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {users.map((user, i) => (
          <li key={user.handle} style={{ marginBottom: 16, display: 'flex', alignItems: 'center' }}>
            <img
              src={user.avatar}
              alt={user.handle}
              style={{ width: 48, height: 48, borderRadius: '50%', marginRight: 16 }}
            />
            <div>
              <strong>{i + 1}. {user.username}</strong>
              <div style={{ color: '#888' }}>@{user.handle} • Score: {user.score.toFixed(4)}</div>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
