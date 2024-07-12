import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";



function Info() {
  const [number, setNumber] = useState("");
  const [name, setName] = useState("");
  const [getContact, setGetContact] = useState([]);
  const navigate=useNavigate()

  function create() {
    axios
      .post(
        "http://localhost:5174/contactInfo/contact",
        { name: name, number: number },
        { headers: { accessToken: sessionStorage.getItem("accessToken") } }
      )
      .then((response) => {
        console.log(response.data);
navigator('/')
      });
  }
  useEffect(() => {
    axios
      .get("http://localhost:5174/contactInfo/getContact", {
        headers: { accessToken: sessionStorage.getItem("accessToken") },
      })
      .then((response) => {
        setGetContact(response.data);
        console.log(response.data);
      });
  }, []);

  return (
    <div>
      <h1>Contact</h1>
      <div>
        <h4>create contacts</h4>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="name"
        />
        <input
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          type="text"
          placeholder="number"
        />
        <button type="button" onClick={create}>
          create
        </button>
      </div>
      <div>
        
          name:{getContact.name} number:{getContact.number}
        
      </div>
    </div>
  );
}

export default Info;
