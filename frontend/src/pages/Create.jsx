import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Axios from "axios";

function Create() {
  const onSubmit = (data) => {
    try {
      Axios.post("http://localhost:5174/posts", data).then(() => {
        console.log(data);
      });
    } catch (error) {
      console.error("error trying to post the entries");
    }
  };
  const validationSchema = Yup.object().shape({
    title: Yup.string(),
    desc: Yup.string(),
    username: Yup.string(),
  });
  const initialValues = {
    title: "",
    desc: "",
    username: "",
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      <Form className="Form">
        <label>Title</label>
        <Field
          className="field"
          name="title"
          placeholder="title.."
          ErrorMessage="title missing"
          required
        />
        <label>Content</label>
        <Field
          className="field"
          name="desc"
          placeholder="Content.."
          ErrorMessage="write content"
          required
        />
        <label>Username</label>
        <Field
          className="field"
          name="username"
          placeholder="username"
          ErrorMessage="uername missing"
          required
        />
        <button onClick={onSubmit}>Submit</button>
      </Form>
    </Formik>
  );
}

export default Create;
