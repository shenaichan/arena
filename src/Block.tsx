import { Content } from "./types";

import fonts from "./fonts.module.css";

function Block({ content }: { content: Content }) {
  // some MVP block versions
  // image
  // text
  // "link" --> anything that feels kind of like a URL snapshot
  // wait i found the field lol
  // class = "Image" | "Text" | "Link"

  const body = () => {
    if (content.class === "Image") {
      if (!content.image) {
        console.error("Image class should have image field");
        return;
      }
      return <img src={content.image.square.url}></img>;
    } else if (content.class === "Text") {
      if (!content.content) {
        console.error("Text class should have content field");
        return;
      }
      return <p>{content.content}</p>;
    } else if (content.class === "Link") {
      if (!content.source || !content.image) {
        console.error("Link class should have source and image fields");
        return;
      }
      return (
        <div>
          <p className={fonts.ahItalic}>
            <a href={content.source.url}>(Source)</a>
          </p>
          <img src={content.image.square.url}></img>
        </div>
      );
    }
  };
  return (
    <div>
      <p className={fonts.rhm}>{content.title}</p>
      {body()}
    </div>
  );
}

export default Block;
