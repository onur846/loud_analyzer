import { useEffect, useState } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Avatar } from '../components/ui/avatar';
import { Badge } from '../components/ui/badge';
import { Skeleton } from '../components/ui/skeleton';

export default function Home() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://loud-puppeteer.onrender.com/top25')
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
      .catch(err => console.error('Failed to load users:', err));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-[#f2fbf5] to-[#e1f4ff] p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center mb-6 text-gray-800">
          🚀 StayLoud Top 25 Leaderboard
        </h1>

        {loading ? (
          <div className="grid grid-cols-1 gap-4">
            {[...Array(10)].map((_, i) => (
              <Skeleton key={i} className="h-24 w-full rounded-2xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {users.map((user, index) => (
              <Card key={user.handle} className="rounded-2xl shadow-lg border border-gray-200 bg-white hover:shadow-xl transition">
                <CardContent className="p-5 flex items-center gap-4">
                  <div className="text-2xl font-bold text-gray-400">#{index + 1}</div>
                  <Avatar>
                    <img
                      src={user.avatar}
                      alt={user.username}
                      className="rounded-full w-14 h-14"
                    />
                  </Avatar>
                  <div className="flex-1">
                    <div className="text-lg font-semibold text-gray-800 truncate">
                      {user.username}
                    </div>
                    <div className="text-sm text-gray-500 truncate">@{user.handle}</div>
                  </div>
                  <Badge className="bg-[#01FF99] text-white font-bold text-sm py-1 px-2 rounded-md">
                    {user.mindshare}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
