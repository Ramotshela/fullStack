import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { authContext } from "../../helper/helper";

function Message() {
  const { id } = useParams();
  const { contactState } = useContext(authContext);
  const [message, setMessage] = useState([]);

  function send() {
    useEffect(() => {
      axios
        .get(`http://localhost:5174/contacts/contacts/${id}`)
        .then((response) => {
          axios.post("http://localhost:5174/messages/sendText", {
            sender: contactState.number,
            receiver: response.data.number,
            message: message,
          });
        });
    }, []);
  }
axios.get("http://localhost:5174/messages/readText").then((response)=>{
  setMessage(response.data)
})
  return (
    <div className="message">
      <h6>name</h6>
      {message.map((text) => {
        return (
          <>
            <div className="msg1">message1</div>
            <div className="msg2">{text}</div>
            
          </>
        );
      })}<div>
              <input
                type="text"
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
                placeholder="Type..."
              />{" "}
              <button>attach</button> <button onClick={send}>send</button>{" "}
            </div>
    </div>
  );
}

export default Message;
