import React, { useEffect } from "react";
import { CSSTransition } from "react-transition-group";

const Modal = (props) => {
  // get image
  //   var PosterContoh = "url(/assets/modal/cth1.jpg)";

  //set close by state

  //set close by "esc"
  const closeOnEscapeKeyDown = (e) => {
    if (e.charCode || e.keyCode === 27) {
      props.onClose();
    }
  };

  //use effect to detect click "esc"
  useEffect(() => {
    document.body.addEventListener("keydown", closeOnEscapeKeyDown);
    return function cleanup() {
      document.body.removeEventListener("keydown", closeOnEscapeKeyDown);
    };
  }, []);

  return (
    <CSSTransition
      in={props.show}
      unmountOnExit
      timeout={{ enter: 500, exit: 500 }}
    >
      <div className="ui_modal" onClick={props.onClose}>
        <div
          className="ui_modal_modal-content"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="ui_modal_modal-header ">
            <div className="ui_modal_modal-title ">{props.modalTitle}</div>
            <div
              className="ui_modal_button-close"
              onClick={props.onClose}
            ></div>
          </div>
          <div className="ui_modal_modal-body ">
            blah
            {/* <img src={PosterContoh} alt={props.modalBody}></img> */}
          </div>
          <div className="ui_modal_modal-footer ">
            <a
              href={props.modalLink}
              className="button-next"
              target="_blank"
              rel="noreferrer"
            >
              Buka Link{" "}
              <span className="icon-right">{/* <RightArrowIcon /> */}</span>
            </a>
          </div>
        </div>
      </div>
    </CSSTransition>
  );
};

export default Modal;
