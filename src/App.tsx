import { Tldraw } from "tldraw";
import "tldraw/tldraw.css";

import fonts from "./fonts.module.css";
import base from "./base.module.css";
import classnames from "classnames";

import { useState } from "react";

import { Content, Contents } from "./types";

import Block from "./Block";

const PAGE_LENGTH = 20;
const LOAD_MARGIN = 200;

function App() {
  const [blocks, setBlocks] = useState<Content[]>([]);

  // probably want to consolidate this state
  const [currUrl, setCurrUrl] = useState("");
  const [urlIsValid, setUrlIsValid] = useState(false);
  const [slug, setSlug] = useState("");

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

  const channelUrlIsValid = (url: string) => {
    // https://www.are.na/{user}/{channel}
    const channelUrlRegex: RegExp =
      /^https:\/\/www\.are\.na\/([^\/]+)\/([^\/]+)$/;

    const match = url.match(channelUrlRegex);

    if (!match) return null;
    if (match[1] === "block") return null;

    return match[2]; // channel slug
  };

  const tryUrl = () => {
    if (!urlIsValid) {
      console.log(
        "Shouldn't have gotten here; button should have been disabled"
      );
      return;
    }
    const s = channelUrlIsValid(currUrl);
    if (s) {
      setSlug(s);
      getNextPage(s);
    }
    setCurrUrl("");
    setUrlIsValid(false);
  };

  const fetchMore = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    if (
      e.currentTarget.scrollHeight <=
      e.currentTarget.clientHeight + e.currentTarget.scrollTop + LOAD_MARGIN
    ) {
      getNextPage(slug);
    }
  };

  const updateUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrUrl(e.target.value);
    const s = channelUrlIsValid(e.target.value);
    setUrlIsValid(!!s);
  };

  return (
    <div className={classnames(base.root, fonts.ah)}>
      <Tldraw persistenceKey="foobar" />

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
            onChange={updateUrl}
          ></input>
          <button
            style={{ borderRadius: "8px" }}
            onClick={tryUrl}
            disabled={!urlIsValid}
          >
            Submit
          </button>
        </div>
        <div>
          {blocks.map((elt) => (
            // <div key={elt.id}>
            //   <h2 className={fonts.rhm}>{elt.title}</h2>
            //   {elt.content && <p>{elt.content}</p>}
            //   {elt.image && <img src={elt.image.square.url}></img>}
            // </div>
            <Block key={elt.id} content={elt} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
