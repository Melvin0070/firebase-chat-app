import React, { useState } from "react";
import "./chatList.css";
import AddUser from "./addUser/AddUser";

function ChatList() {
  const [addModel, setAddModel] = useState(false);
  return (
    <div className="chatList">
      <div className="search">
        <div className="searchBar">
          <img src="/search.png" alt="" />
          <input type="search" placeholder="Search" />
        </div>
        <img
          src={addModel ? "./minus.png" : "./plus.png"}
          alt=""
          className="add"
          onClick={() => setAddModel((prev) => !prev)}
        />
      </div>
      <div className="item">
        <img src="./avatar.png" alt="" />
        <div className="texts">
          <span>Shnekithaa</span>
          <p>Hello</p>
        </div>
      </div>
      <div className="item">
        <img src="./avatar.png" alt="" />
        <div className="texts">
          <span>Shnekithaa</span>
          <p>Hello</p>
        </div>
      </div>
      <div className="item">
        <img src="./avatar.png" alt="" />
        <div className="texts">
          <span>Shnekithaa</span>
          <p>Hello</p>
        </div>
      </div>
      {addModel && <AddUser />}
    </div>
  );
}

export default ChatList;
