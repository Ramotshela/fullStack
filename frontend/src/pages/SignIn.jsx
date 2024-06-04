import React from 'react'
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Axios from 'axios'

function SignIn() {
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
            console.log(data)
        })
    }
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      <Form className="Form">
        <label htmlFor="">username</label>
        <Field name="username" className="field" placeholder="username"></Field>
        <label htmlFor="">password</label>
        <Field name="password" className="field" placeholder="password"></Field>

        <button type="submit" onSubmit={onSubmit}>register</button>
      </Form>
    </Formik>
  );
}

export default SignIn