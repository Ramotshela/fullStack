import React from 'react'
import { Formik, Form, Field,ErrorMessage } from "formik";
import * as Yup from "yup";
import Axios from 'axios'
import { useNavigate } from 'react-router-dom';

function SignIn() {
  const navigate=useNavigate()
    const validationSchema=Yup.object().shape({
        username:Yup.string(),
        password:Yup.string()
    })
    const initialValues={
        username:'',
        password:''
    }
    const onSubmit=(data)=>{
       Axios.post("http://localhost:5174/auth/register",data).then((response)=>{
         navigate('/posts')
        })
    }
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      <Form className="Form">
        <h1>register</h1>
        
        <ErrorMessage name="title"/>
        <Field name="username" className="field" placeholder="username"></Field>
      
        <ErrorMessage>Invalid password</ErrorMessage>
        <Field name="password" className="field" placeholder="password"></Field>

        <button type="submit" onSubmit={onSubmit}>register</button>
      </Form>
    </Formik>
  );
}

export default SignIn