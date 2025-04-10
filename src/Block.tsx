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
    } else if (content.class === "Media") {
      // spotify and youtube and stuff
      if (!content.image) {
        console.error("Media class should have image field");
        return;
      }
      return <img src={content.image.square.url}></img>;
    } else if (content.class === "Attachment") {
      // pdfs and stuff
      if (!content.image) {
        console.error("Attachment class should have image field");
        return;
      }
      return <img src={content.image.square.url}></img>;
    } else {
      // nothing i think
      console.log(content.class);
    }
  };
  return (
    <div
      style={{
        margin: "10px",
        padding: "10px",
        width: "auto",
        aspectRatio: "1",
        border: "1px solid black",
        overflow: "hidden",
      }}
    >
      <p className={fonts.rhm}>{content.title}</p>
      {body()}
    </div>
  );
}

export default Block;
