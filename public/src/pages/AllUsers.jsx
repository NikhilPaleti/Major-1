import React, { useState, useEffect } from "react";
import './allUsers.css';

export default function AllUsers({ contacts, changeChat }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  useEffect( () => {
    async function plh3() {
    const data = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      );
      setCurrentUserName(data.username);
    }
    plh3();
  }, []);
  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };
    return (
      <div className="ALUcontainer">
      <div className="ALUbrand">
        <h3>SECURE CHAT</h3>
      </div>
      <div className="ALUcontacts">
        {contacts.map((contact, index) => {
          return (
            <div
              key={contact._id}
              className={`ALUcontact ${
                index === currentSelected ? "selected" : ""
              }`}
              onClick={() => changeCurrentChat(index, contact)}
            >
              <div className="avatar">
               {/* Add an IMG */}
              </div>
              <div className="username">
                <h3>{contact.username}</h3>
              </div>
            </div>
          );
        })}
      </div>
      <div className="ALUcurrent-user">
        <div className="avatar">
          {/* Add an IMG */}
        </div>
        <div className="ALUusername">
          <h2>{currentUserName}</h2>
        </div>
      </div>
    </div>
    );
  }
  