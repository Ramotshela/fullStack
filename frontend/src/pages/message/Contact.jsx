import React, { useContext, useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { authContext } from "../../helper/helper";
import Message from "./Message";
import { useNavigate } from "react-router-dom";

function contact() {
  const { authState } = useContext(authContext);
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [contact, setContact] = useState([]);
  const [newContact,setNewContact]=useState([])
  const navigate = useNavigate();

 async function  Submit() {
    await axios
      .post(
        "http://localhost:5174/contacts/addContact",
        {
          name: name,
          number: number,
          
        },
        { headers: { accessToken: sessionStorage.getItem("accessToken") } }
      )
      .then((response) => {
        console.log( 
         response.data
        ); 
        setContact((preVal)=>[...preVal,response.data])        
        setName('')
        setNumber('')
      });
  }

  useEffect(() => {
    axios
      .get("http://localhost:5174/contacts/getContacts", {
        headers: { accessToken: sessionStorage.getItem("accessToken") },
      })
      .then((response) => {
        console.log(response.data);
        setContact(response.data);
      });
  },[]);
  function deleteContact(id) {
    axios
      .delete(`http://localhost:5174/contacts/delete/${id}`)
      .then((response) => {
       setContact(contact.filter((val)=>{
          return val.id!=id
        })) 
        
      });
  }
  function getContactById(id) {
    axios
      .get(`http://localhost:5174/contacts/contacts/${id}`)
      .then((response) => {
        navigate(`/contact/${id}`);
      });
  }
  
  return (
    <>
      <div className="contact">
        {" "}
        <div className="contact1">
          <nav>
            <h1>
              contacts
            </h1>
            <>
              
              <input
                placeholder="name" value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <input 
                onChange={(e) => {
                  setNumber(e.target.value);
                }}
                placeholder="cell number" value={number}
              />
              <button onClick={Submit}>+</button>
            </>
          </nav>{" "}
          <div >
            {contact.map((listContact,val) => {
              return (
              <div key={val} className="contactLst" >
                  <div onClick={()=>{getContactById(listContact.id)}} >{listContact.name} : {listContact.number}</div>
                    
                    <button className="del" onClick={()=>{deleteContact(listContact.id)}}>X</button>
                  </div>              
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default contact;
