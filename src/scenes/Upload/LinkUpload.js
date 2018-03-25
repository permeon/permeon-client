import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { Form, Button, Message, Segment } from 'semantic-ui-react';
import yup from 'yup';


const LinkUploadForm = ({
  values,
  status,
  errors,
  touched,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
}) => (
  <Form onSubmit={handleSubmit} error size='large'>
    {status && status.map((error, idx) => <Message key={idx} error content={error} />)}
    <Form.Input
      type="text"
      name="link"
      placeholder='link eg. https://youtube.com/?vid=123k4j12jkl'
      onChange={handleChange}
      onBlur={handleBlur}
      value={values.link}
    />
    {touched.link && errors.link && <Message error content={errors.link} />}
    <Form.Input
      type="text"
      name="title"
      placeholder='title'
      onChange={handleChange}
      onBlur={handleBlur}
      value={values.title}
    />
    {touched.title && errors.title && <Message error content={errors.title} />}
    <Form.TextArea
      name="body"
      placeholder='body'
      onChange={handleChange}
      onBlur={handleBlur}
      value={values.body}
    />
    {touched.body && errors.body && <Message error content={errors.body} />}
    <Form.Input
      type="text"
      name="tags"
      placeholder='tags'
      onChange={handleChange}
      onBlur={handleBlur}
      value={values.title}
    />
    {touched.tags && errors.tags && <Message error content={errors.tags} />}
    <Button size="large" floated='right' disabled={isSubmitting}>post</Button>
  </Form>
);

const LinkUpload = (props) => {
  return (
    <div>
      <Formik
        initialValues={{
          link: '',
          title: '',
          body: '',
          tags: '',
        }}
        validationSchema={
          yup.object().shape({
            link: yup.string().required(),
            title: yup.string().required(),
            body: yup.string(),
            tags: yup.string(),
          })
        }
        onSubmit={(
          values,
          { setSubmitting, setErrors }
        ) => {
          setSubmitting(true);
          console.log('submitting')
          setTimeout(() => {
            setSubmitting(false);
            console.log('done');
          }, 800);
        }}
        render={props => <LinkUploadForm {...props} />}
      />
    </div>
  );
};

LinkUpload.propTypes = {

};

export default LinkUpload;
