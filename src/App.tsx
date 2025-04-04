import { Tldraw } from "tldraw";
import "tldraw/tldraw.css";

import { useState, useEffect } from "react";

import { Channel, Content } from "./types";

const fetchChannelUrl = "https://api.are.na/v2/channels/arena-influences/thumb";

function App() {
  const [channelData, setChannelData] = useState<Content[]>([]);

  useEffect(() => {
    const getDummyData = async () => {
      try {
        const response = await fetch(fetchChannelUrl);
        if (!response.ok) {
          throw new Error("Network error with fetching channel thumb");
        }
        const json: Channel = await response.json();
        setChannelData(json.contents);
      } catch (err) {
        if (err instanceof Error) {
          console.error(err.message);
        } else {
          throw err;
        }
      }
    };

    getDummyData();
  }, []);

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "grid",
        gridTemplateColumns: "2fr 1fr",
      }}
    >
      <div style={{}}>
        <Tldraw />
      </div>
      <div style={{ padding: "20px" }}>
        <ul>
          {channelData.map((elt, idx) => (
            <li key={idx}>{elt.title}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
