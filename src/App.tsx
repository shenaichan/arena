import { Tldraw } from "tldraw";
import "tldraw/tldraw.css";

import { useState } from "react";

import { Channel, Content } from "./types";

// const fetchChannelUrl = "https://api.are.na/v2/channels/arena-influences/thumb";

function App() {
  const [channelData, setChannelData] = useState<Content[]>([]);
  const [currUrl, setCurrUrl] = useState("");

  const getDummyData = async (url: string) => {
    try {
      const response = await fetch(url);
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

  // TODO: fix this later lol
  const urlIsValid = (url: string) => {
    return url.length > 0;
  };

  const tryUrl = () => {
    if (urlIsValid(currUrl)) {
      const slug = currUrl.split("/").at(-1);
      const url = `https://api.are.na/v2/channels/${slug}/thumb`;
      getDummyData(url);
    }
    setCurrUrl("");
  };

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
      <div style={{ padding: "20px", overflow: "scroll" }}>
        <p>Paste the URL of the are.na channel you want to whiteboard here:</p>
        <div style={{ width: "100%", display: "flex", gap: "10px" }}>
          <input
            style={{
              flexGrow: "1",
              fontSize: "16px",
              border: "1px solid gray",
              borderRadius: "8px",
              padding: "5px",
            }}
            placeholder="Paste the URL here"
            value={currUrl}
            onChange={(e) => setCurrUrl(e.target.value)}
          ></input>
          <button onClick={tryUrl}>Submit</button>
        </div>

        {channelData.map((elt) => (
          <div key={elt.id}>
            <h2>{elt.title}</h2>
            {elt.content && <p>{elt.content}</p>}
            {elt.image && <img src={elt.image.square.url}></img>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
