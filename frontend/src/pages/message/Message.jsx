import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";


function Message() {
  const { id } = useParams();
  const [messages, setMessages] = useState([]);
  const [getSender,setGetSender]=useState([])
  const [getReceiver,setGetReceiver]=useState([])
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5174/messages/readText",{sender:getSender,receiver:getReceiver}
          
        );
        setMessages(response.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };
    fetchMessages();
  }, [id]);

  const send = async () => {
    try {
      const contactResponse = await axios.get(
        `http://localhost:5174/contacts/contacts/${id}`,
        {
          headers: { accessToken: sessionStorage.getItem("accessToken") },
        }
      );
      setGetSender(contactResponse.data.number)
        const response = await axios
        .get("http://localhost:5174/contactInfo/getContact", {
          headers: { accessToken: sessionStorage.getItem("accessToken") },
        })


      const receiverNumber = contactResponse.data.number;
      setGetReceiver(receiverNumber)
      await axios.post(
        "http://localhost:5174/messages/sendText",
        {
          sender: response.data.number,
          receiver: receiverNumber,
          text: newMessage,
        },
        { headers: { accessToken: sessionStorage.getItem("accessToken") } }
      );

      setMessages([
        ...messages,
        { sender: getSender, text: newMessage },
      ]);
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
          // key={index}
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
        <button>Attach</button>
        <button onClick={send}>Send</button>
      </div>
    </div>
  );
}

export default Message;
