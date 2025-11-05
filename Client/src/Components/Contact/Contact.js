import React from "react";
import developerPng from "./images/developer-png.png";

const Contact = () => {
  return (
    <div className="contactUs-main-container">
      <div className="contactUs-left-para">
        <h3>Let's get in touch</h3>

        <div className="contact-item">
          <i className="fa fa-envelope" aria-hidden="true"></i>
          <a className="mail-links" href="mailto:laybashahid@example.com">
            laybashahid@example.com
          </a>
        </div>

        <div className="contact-item">
          <i className="fa fa-linkedin" aria-hidden="true"></i>
          <a
            className="mail-links"
            href="https://www.linkedin.com/in/laybashahid/"
            target="_blank"
            rel="noopener noreferrer"
          >
            laybashahid
          </a>
        </div>

        <div className="contact-item">
          <i className="fa fa-github" aria-hidden="true"></i>
          <a
            className="mail-links"
            href="https://github.com/laybashahid"
            target="_blank"
            rel="noopener noreferrer"
          >
            laybashahid
          </a>
        </div>

        <div className="contact-item">
          <i className="fa fa-instagram" aria-hidden="true"></i>
          <a
            className="mail-links"
            href="https://www.instagram.com/laybashahid/"
            target="_blank"
            rel="noopener noreferrer"
          >
            @laybashahid
          </a>
        </div>

        <div className="contact-item">
          <i className="fa fa-phone" aria-hidden="true"></i>
          <a className="mail-links" href="tel:+15551234567">
            +1 (555) 123-4567
          </a>
        </div>
      </div>

      <div className="contactUs-pic">
        <img src={developerPng} alt="Profile — Layba Shahid" />
      </div>
    </div>
  );
};

export default Contact;
