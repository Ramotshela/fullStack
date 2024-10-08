import React,{useContext} from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Axios from "axios";
import { authContext } from "../helper/helper";
import { useNavigate } from "react-router-dom";


function Login() {
  const {setAuthState} =useContext(authContext);
  const navigate=useNavigate()
  const validationSchema = Yup.object().shape({
    username: Yup.string(),
    password: Yup.string(),
  });
  const initialValues = {
    username: "",
    password: "",
  };
  const onSubmit = async (data) => {
    await Axios.post("http://localhost:5174/auth/login", data).then((response) => {
      if (response.data.error) {
        alert("error");
      } else {
        sessionStorage.setItem("accessToken", response.data);
        setAuthState(true);
        navigate('/posts')
      }
    });
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      <Form className="Form">
        <h1>Login</h1>
        
        <Field name="username" className="field" placeholder="username"></Field>
        
        <Field name="password" className="field" placeholder="password"></Field>
        <button type="submit">Login</button>
      </Form>
    </Formik>
  );
}

export default Login;
