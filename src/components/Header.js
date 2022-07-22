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

  const title = "This is Example of PWA APP";
  const body = "Progressive Web APP(PWA) is";

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
                handleShowModal("Title", "Body", "Link", e);
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
