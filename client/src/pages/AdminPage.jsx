import React, { useState } from "react";
import Register from "./Register";
import Login from "../components/admin/Login";
import { QRCodeCanvas } from "qrcode.react";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css"; 
import { API } from "../config/api";
import { FaRegClipboard } from "react-icons/fa";
import {
  FacebookShareButton,
  FacebookIcon,
  WhatsappShareButton,
  WhatsappIcon,
  TelegramShareButton,
  TelegramIcon,
} from "react-share";


const AdminPage = () => {
  const [copied, setCopied] = useState(false);
  const title = "Fill out this form";


  const copyToClipboard = () => {
    navigator.clipboard.writeText(API.FORM_LINK)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 4000);
      })
      .catch((err) => console.error("Failed to copy: ", err));
  };

  return (
    <main>
      <h2>Admin Dashboard login</h2>
      <Login />


      <div >
          <h4>Shareable Form Link</h4>
          <p>Share this link with users to fill out the form:</p>

          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
  {/* Clipboard icon */}
  <span
    data-tooltip-id="copy-tooltip"
    data-tooltip-content={copied ? "Copied!" : "Copy Link"}
    onClick={copyToClipboard}
    style={{
      cursor: "pointer",
      fontSize: "24px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <FaRegClipboard />
  </span>
  <Tooltip id="copy-tooltip" />

  {/* Social media icons */}
  <FacebookShareButton url={API.FORM_LINK} quote={title}>
    <FacebookIcon size={24} round />
  </FacebookShareButton>

  <WhatsappShareButton url={API.FORM_LINK} title={title}>
    <WhatsappIcon size={24} round />
  </WhatsappShareButton>

  <TelegramShareButton url={API.FORM_LINK} title={title}>
    <TelegramIcon size={24} round />
  </TelegramShareButton>
</div>

  </div>




    </main>
  );
};

export default AdminPage;
