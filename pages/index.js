import { useEffect, useState } from 'react';

export default function Home() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('https://loud-puppeteer.onrender.com/top25')
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.error('Failed to load users:', err));
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>🔥 StayLoud Top 25</h1>
      <ul>
        {users.map((u, i) => (
          <li key={u.handle} style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <img src={u.avatar} alt={u.username} width={48} height={48} style={{ borderRadius: '50%' }} />
            <div>
              <div><strong>{i + 1}. {u.username}</strong> @{u.handle}</div>
              <div>💰 {u.mindshare}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
