import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { authContext } from "../../helper/helper";
import { useNavigate } from "react-router-dom";

function Contact() {
  const { authState } = useContext(authContext);
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [getContacts,setGetContacts]=useState([]);
  const [contacts, setContacts] = useState([]);
  const navigate = useNavigate();

  const submit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5174/contacts/addContact",
        { name:name, number:number },
        { headers: { accessToken: sessionStorage.getItem("accessToken") } }
      );
      console.log(response.data);
      setContacts((prevContacts) => [...prevContacts, response.data]);
      setName("");
      setNumber("");
    } catch (error) {
      console.error("Error adding contact:", error);
    }
  };

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get("http://localhost:5174/contacts/getContacts", {
          headers: { accessToken: sessionStorage.getItem("accessToken") },
        });
        console.log(response.data);
        setGetContacts(response.data);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };
    fetchContacts();
  }, []);

  const deleteContact = async (id) => {
    try {
      await axios.delete(`http://localhost:5174/contacts/delete/${id}`);
      setContacts(contacts.filter((contact) => contact.id !== id));
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  const getContactById = (id) => {
    navigate(`/contact/${id}`);
  };

  return (
    <div className="contact">
      <div className="contact-container">
        <nav>
          <h1>Contacts</h1>
          <div className="input-group">
            <input
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              placeholder="Cell number"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
            />
            <button onClick={submit}>+</button>
          </div>
        </nav>
        <div className="contact-list">
          {getContacts.map((contact, index) => (
            <div key={index} className="contact-item">
              <div onClick={() => getContactById(contact.id)}>
                {contact.name} : {contact.number}
              </div>
              <button className="delete-button" onClick={() => deleteContact(contact.id)}>X</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Contact;
