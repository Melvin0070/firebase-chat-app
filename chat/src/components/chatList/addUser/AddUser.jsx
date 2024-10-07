import React, { useState, useEffect } from "react";
import "./addUser.css";
import {
  arrayUnion,
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../../lib/firebase";
import { useUserStore } from "../../../lib/userStore";

const AddUser = ({ onClose }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);
  const { currentUser } = useUserStore();

  useEffect(() => {
    const searchUsers = async () => {
      if (searchTerm.length === 0) {
        setUsers([]);
        return;
      }

      try {
        const userRef = collection(db, "users");
        const q = query(
          userRef,
          where("username", ">=", searchTerm),
          where("username", "<=", searchTerm + "\uf8ff")
        );
        const querySnapshot = await getDocs(q);
        const userList = querySnapshot.docs
          .map(doc => doc.data())
          .filter(user => user.id !== currentUser.id);
        setUsers(userList);
      } catch (err) {
        console.log(err);
      }
    };

    const debounceTimer = setTimeout(() => {
      searchUsers();
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchTerm, currentUser.id]);

  const handleAdd = async (user) => {
    const chatRef = collection(db, "chats");
    const userChatsRef = collection(db, "userchats");
    try {
      const newChatRef = doc(chatRef);
      await setDoc(newChatRef, {
        createdAt: serverTimestamp(),
        messages: [],
      });
      await updateDoc(doc(userChatsRef, user.id), {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: "",
          receiverId: currentUser.id,
          updatedAt: Date.now(),
        }),
      });
      await updateDoc(doc(userChatsRef, currentUser.id), {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: "",
          receiverId: user.id,
          updatedAt: Date.now(),
        }),
      });
      onClose(); // Close the modal after adding the user
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="addUser">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search username"
      />
      <div className="userList">
        {users.map((user) => (
          <div key={user.id} className="user">
            <div className="detail">
              <img src={user.avatar} alt="" />
              <span>{user.username}</span>
            </div>
            <button onClick={() => handleAdd(user)}>Add User</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddUser;