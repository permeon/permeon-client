import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import { Loader, Dimmer, Divider, Form, Button, Message, Segment } from 'semantic-ui-react';
import yup from 'yup';

import TagEditor from "../../components/TagEditor/TagEditor";
import { postVideo } from "../../actions/postActions";

const LinkUploadForm = ({
  values,
  status,
  errors,
  touched,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
  setFieldValue,
}) => (
  <Form onSubmit={handleSubmit} error size='large'>
    <Dimmer active={isSubmitting} page>
      <Loader size='huge'>uploading</Loader>
    </Dimmer>
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
    <TagEditor name='tags' handleChange={setFieldValue} tags={values.tags}/>
    {touched.tags && errors.tags && <Message error content={errors.tags} />}
    <Divider />
    <Button size="large" floated='right' disabled={isSubmitting}>post</Button>
  </Form>
);

const LinkUpload = ({ dispatch }) => {
  return (
    <div>
      <Formik
        initialValues={{
          link: 'default link',
          title: 'default title',
          body: 'default bod',
          tags: ['firstTagger'],
        }}
        validationSchema={
          yup.object().shape({
            link: yup.string().required(),
            title: yup.string().required(),
            body: yup.string(),
            tags: yup.array().max(4),
          })
        }
        onSubmit={(
          values,
          { setSubmitting, setErrors }
        ) => {
          dispatch(postVideo(values))
            .then(response => {
              console.log('response:', response);
              setSubmitting(false);
            })
            .catch(error => {
              console.log('error:', error);
              setSubmitting(false);
            })
        }}
        render={props => <LinkUploadForm {...props} />}
      />
    </div>
  );
};

LinkUpload.propTypes = {

};

export default connect()(LinkUpload);
