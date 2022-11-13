import { io } from 'socket.io-client';
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
// import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";
import { allUsersRoute, host } from "../utils/APIRoutes";
import AllUsers from "./AllUsers";
import './chat.css';
import ChatComp from '../components/ChatComp';
import Blank from "../components/Blank";

export default function Chat() {
  const navigate = useNavigate();
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);
  useEffect( () => {
    async function plh() {
      if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
        navigate("/login");
      } else {
        setCurrentUser(
          await JSON.parse(
            localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
          )
        );
      }
    }
    plh();
  }, []);
  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  useEffect( () => {
    async function plh2() {
      if (currentUser) {
        const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
        setContacts(data.data);
      }
    }
    plh2();
  }, [currentUser]);
  
  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  return (
    <>
    <div className="CHcontainer">
      <div className="CHsub-container">
      <AllUsers contacts={contacts} changeChat={handleChatChange} />
        {currentChat === undefined ? (
          <Blank> </Blank>
        ) : (
          <ChatComp currentChat={currentChat} socket={socket} />
        )}
      </div>
    </div>
    </>
  )
}

