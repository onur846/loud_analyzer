// pages/hidden/trigger.js
import { useEffect } from 'react';

export default function TriggerPage() {
  useEffect(() => {
    const fetchTop25AndLoop = async () => {
      let index = 0;

      while (true) {
        try {
          const response = await fetch('https://loud-puppeteer.onrender.com/top25');
          const data = await response.json();
          const handle = data[index]?.handle;

          if (handle) {
            console.log(`⏳ Triggering strategy for @${handle}`);
            const iframe = document.createElement('iframe');
            iframe.style.display = 'none';
            iframe.src = `https://loud-snscrape.onrender.com/strategy/${handle}`;
            document.body.appendChild(iframe);
          }

          index = (index + 1) % data.length;
        } catch (err) {
          console.error('❌ Trigger error:', err);
        }

        // Wait 4 minutes before the next request
        await new Promise((resolve) => setTimeout(resolve, 7 * 60 * 1000));
      }
    };

    fetchTop25AndLoop();
  }, []);

  return (
    <div>
      <h1 style={{ color: 'green' }}>🔒 Hidden Trigger Running...</h1>
      <p>This page is running the automatic strategy trigger loop.</p>
    </div>
  );
}
