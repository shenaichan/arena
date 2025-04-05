import { Tldraw } from "tldraw";
import "tldraw/tldraw.css";

import { useState } from "react";

import { Channel, Content, Contents } from "./types";

const PAGE_LENGTH = 20;
const LOAD_MARGIN = 200;

function App() {
  const [blocks, setBlocks] = useState<Content[]>([]);
  const [currUrl, setCurrUrl] = useState("");
  const [slug, setSlug] = useState("");

  const getChannelThumb = async (slug: string) => {
    const url = `https://api.are.na/v2/channels/${slug}/thumb`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network error fetching channel thumb");
        // TODO: Something about auth here
      }
      const json: Channel = await response.json();
      setBlocks(json.contents);
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message);
      } else {
        throw err;
      }
    }
  };

  const getNextPage = async (slug: string) => {
    const url = `https://api.are.na/v2/channels/${slug}/contents`;
    try {
      const currPage = Math.floor(blocks.length / PAGE_LENGTH) + 1;
      const response = await fetch(`${url}?page=${currPage}`);
      if (!response.ok) {
        throw new Error("Network error fetching next page");
        // TODO: Something about auth here
      }
      const json: Contents = await response.json();
      setBlocks([...blocks, ...json.contents]);
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
      const s = currUrl.split("/").at(-1);
      // TODO: fix this too whoops
      if (s) {
        setSlug(s);
        getNextPage(s);
      }
    }
    setCurrUrl("");
  };

  const fetchMore = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    console.log(
      e.currentTarget.scrollHeight,
      e.currentTarget.clientHeight,
      e.currentTarget.scrollTop
    );
    if (
      e.currentTarget.scrollHeight <=
      e.currentTarget.clientHeight + e.currentTarget.scrollTop + LOAD_MARGIN
    ) {
      getNextPage(slug);
    }
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
      <Tldraw />

      <div style={{ padding: "20px", overflow: "scroll" }} onScroll={fetchMore}>
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
        <div>
          {blocks.map((elt) => (
            <div key={elt.id}>
              <h2>{elt.title}</h2>
              {elt.content && <p>{elt.content}</p>}
              {elt.image && <img src={elt.image.square.url}></img>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
