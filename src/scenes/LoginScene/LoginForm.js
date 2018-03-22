import React from "react";
import { withFormik } from "formik";
import yup from "yup";

import { Form, Button, Message } from "semantic-ui-react";

import { login } from "../../actions/authActions";

const LoginForm = ({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
  status
}) => (
  <Form onSubmit={handleSubmit} error>
    {status && status.map((error, idx) => <Message key={idx} error content={error} />)}
    <Form.Input
      name="username"
      label="username"
      placeholder="username..."
      onChange={handleChange}
      onBlur={handleBlur}
      value={values.username}
    />
    {touched.username && errors.username && <Message error content={errors.username} />}
    <Form.Input
      name="password"
      label="password"
      placeholder="password..."
      onChange={handleChange}
      onBlur={handleBlur}
      value={values.password}
    />
    {touched.password && errors.password && <Message error content={errors.password} />}
    <Button disabled={isSubmitting}>login</Button>
    <p>Test user - username: testuser password: password123</p>
  </Form>
);

const LoginFormContainer = withFormik({
  mapPropsToValues: props => ({ username: "", password: "" }),
  validationSchema: yup.object().shape({
    username: yup.string().required(),
    password: yup.string().required()
  }),
  handleSubmit: ({ username, password }, { props, setSubmitting, setStatus }) => {
    props
      .dispatch(login(username, password))
      .then(() => {
        setSubmitting(false);
        props.redirect();
      })
      .catch(() => {
        setSubmitting(false);
        setStatus(["Invalid username or password"]);
      });
  }
})(LoginForm);

export default LoginFormContainer;
