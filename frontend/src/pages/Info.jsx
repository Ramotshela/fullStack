import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Info() {
  const [number, setNumber] = useState("");
  const [name, setName] = useState("");
  const [getContact, setGetContact] = useState([]);
  const navigate = useNavigate();

  function create() {
    axios
      .post(
        "http://localhost:5174/contactInfo/contact",
        { name, number },
        { headers: { accessToken: sessionStorage.getItem("accessToken") } }
      )
      .then((response) => {
        console.log(response.data);
        setName("");
        setNumber("");
        setGetContact((prevContacts) => [...prevContacts, { name, number }]);
        navigate("/");
      })
      .catch((error) => {
        console.error("There was an error creating the contact!", error);
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
      })
      .catch((error) => {
        console.error("There was an error fetching the contacts!", error);
      });
  }, []);

  return (
    <div>
      <h1>Contact</h1>
      <div>
        <h4>Create Contacts</h4>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Name"
        />
        <input
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          type="text"
          placeholder="Number"
        />
        <button type="button" onClick={create}>
          Create
        </button>
      </div>
      <div>
        { (
          
            <div >
              Name: {getContact.name} Number: {getContact.number}
            </div>
          
        ) 
        }
      </div>
    </div>
  );
}

export default Info;
