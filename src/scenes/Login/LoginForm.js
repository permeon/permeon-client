import React from 'react';
import { withFormik } from 'formik';
import yup from 'yup';

import { Form, Button, Message, Segment } from 'semantic-ui-react';

import { steemLogin } from '../../actions/authActions';
import config from '../../config';

const { STEEM_SIGNUP } = config.pick('STEEM_SIGNUP');

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
  <Form onSubmit={handleSubmit} error size="large">
    {status && status.map((error, idx) => <Message key={idx} error content={error} />)}
    <Segment stacked>
      <Form.Input
        name="username"
        label="username"
        placeholder="Steem username"
        onChange={handleChange}
        onBlur={handleBlur}
        fluid
        icon="user"
        iconPosition="left"
        value={values.username}
      />
      {touched.username && errors.username && <Message error content={errors.username} />}
      <Form.Input
        name="password"
        label="posting key"
        placeholder="Steem posting key"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.password}
        fluid
        icon="lock"
        iconPosition="left"
        type="password"
      />
      {touched.password && errors.password && <Message error content={errors.password} />}
      <Button fluid size="large" disabled={isSubmitting}>
        login
      </Button>
    </Segment>
    <p>
      New to Steem? <a href={STEEM_SIGNUP}>signup on steemit</a>
    </p>
  </Form>
);

const LoginFormContainer = withFormik({
  mapPropsToValues: props => ({ username: '', password: '' }),
  validationSchema: yup.object().shape({
    username: yup.string().required(),
    password: yup.string().required()
  }),
  handleSubmit: ({ username, password }, { props, setSubmitting, setStatus }) => {
    props
      .dispatch(steemLogin(username, password))
      .then(response => {
        console.log(response);
        setSubmitting(false);
        props.redirect();
      })
      .catch(error => {
        console.log(error);
        setSubmitting(false);
        setStatus([error.message || error]);
      });
  }
})(LoginForm);

export default LoginFormContainer;
