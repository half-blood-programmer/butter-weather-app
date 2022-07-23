import React, { useState } from "react";
import Modal from "./Modal";
import menuIcon from "../assets/menu.png";

const Header = () => {
  const [show, setShow] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalBody, setModalBody] = useState("");
  const [modalLink, setModalLink] = useState("");
  //handle clik to show modal
  function handleShowModal(modalTitle, modalBody, modalLink, e) {
    setModalTitle(modalTitle);
    setModalBody(modalBody);
    setModalLink(modalLink);
    e.stopPropagation();
    e.preventDefault();
    setShow(true);
  }

  function NewlineText(props) {
    const text = props.text;
    const newText = text.split("\n").map((str) => <p>{str}</p>);

    return newText;
  }

  const title = "This is Example of PWA APP";
  const body = (
    <NewlineText
      text={
        "Progressive Web APP or PWA is a type of application software delivered through the web (Wikipedia).In short, PWA can be said to be a combination of web and application. it can be downloaded and access mobile features like an app, but runs like the web. even though it's said to be an app, it doesn't need to take up a lot of memory in your space because it runs like a web.\nThis PWA are one of the most common examples of PWAs. you can add this app to your device, without having to lose a lot of memory. In addition you can also see the difference with the commons web, namely by turning off your network and refreshing this page. You'll notice that PWAs can display cached pages and display them when there's no connection, just like an app."
      }
    />
  );

  return (
    <>
      <Modal
        onClose={() => setShow(false)}
        show={show}
        modalTitle={modalTitle}
        modalBody={modalBody}
        modalLink={modalLink}
      />
      <header>
        <div className="nav">
          <div className="row row_space">
            <div className="title">Weather App</div>
            <div
              className="menu"
              onClick={(e) => {
                handleShowModal(title, body, "Link", e);
              }}
            >
              <img src={menuIcon}></img>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
