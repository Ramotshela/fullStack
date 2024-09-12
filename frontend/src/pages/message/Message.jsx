import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { authContext } from "../../helper/helper";

function Message() {
  const { id } = useParams();
  const [messages, setMessages] = useState([]);
  const { authState } = useContext(authContext);
  const [getSender, setGetSender] = useState(null);
  const [receiver, setReceiver] = useState(null);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const fetchReceiver = async () => {
      try {
        const response = await axios.get(`http://localhost:5174/contacts/contacts/${id}`, {
          headers: { accessToken: sessionStorage.getItem("accessToken") }
        });
        setReceiver(response.data);
        setGetSender(authState.id); // Assuming authState.id is the sender
      } catch (error) {
        console.error("Error fetching receiver:", error);
      }
    };
    fetchReceiver();
  }, [id, authState.id]);

  useEffect(() => {
    const fetchMessages = async () => {
      if (receiver) {
        try {
          const response = await axios.get(`http://localhost:5174/messages/readText/${receiver.number}`, {
            headers: { accessToken: sessionStorage.getItem("accessToken") }
          });
          setMessages(response.data);
        } catch (error) {
          console.error("Error fetching messages:", error);
        }
      }
    };
    fetchMessages();
  }, [receiver]);

  const send = async () => {
    try {
      const response = await axios.post(
        `http://localhost:5174/messages/sendText/${receiver.number}`,
        { text: newMessage },
        { headers: { accessToken: sessionStorage.getItem("accessToken") } }
      );

      setMessages([...messages, { sender: getSender, text: newMessage }]);
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="message">
      <h6>Messages</h6>
      {messages.map((text, index) => (
        <div
          key={index}
          className={text.sender === getSender ? "msg1" : "msg2"}
        >
          {text.text}
        </div>
      ))}
      <div>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type..."
        />
        <button onClick={send}>Send</button>
      </div>
    </div>
  );
}

export default Message;
