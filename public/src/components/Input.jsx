import React, { useState } from "react";
import styled from "styled-components";
import "./input.css";

export default function ChatInput({ handleSendMsg }) {
  const [msg, setMsg] = useState("");

  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };

  return (
    <div className="IContainer">
      <form className="input-container" onSubmit={(event) => sendChat(event)}>
        <input
          type="text"
          placeholder="type your message here"
          onChange={(e) => setMsg(e.target.value)}
          value={msg} />
        <button type="submit">
            {/* Icon */} 📩
        </button>
      </form>
    </div>
  );
}
