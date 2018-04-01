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
      placeholder='video url... eg. https://youtube.com/?vid=123k4j12jkl'
      onChange={handleChange}
      onBlur={handleBlur}
      value={values.link}
    />
    {touched.link && errors.link && <Message error content={errors.link} />}

    <Form.Input
      type="text"
      name="thumbnail"
      placeholder='video thumbnail'
      onChange={handleChange}
      onBlur={handleBlur}
      value={values.thumbnail}
    />
    {touched.thumbnail && errors.thumbnail && <Message error content={errors.thumbnail} />}

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
          link: 'https://www.youtube.com/watch?v=pjnBi_styks',
          thumbnail: 'https://img.youtube.com/vi/pjnBi_styks/mqdefault.jpg',
          title: 'Golden State Warriors vs Utah Jazz Full Game Highlights / March 25 / 2017-18 NBA Season',
          body: '🏀Golden State Warriors vs Utah Jazz Full Game Highlights / March 25 / 2017-18 NBA Season\n' +
          '\n' +
          '👍Follow Us on Twitter: https://twitter.com/stayhls\n' +
          '\n' +
          '👍Like Us on Facebook: https://www.facebook.com/stayhls\n' +
          '\n' +
          '👀Subscribe To Me On Social Networks To Keep Up To Date With Updates On My Channel :)\n' +
          '\n' +
          '⚠️Disclaimer:\n' +
          '➡️ Monetization is disabled.\n' +
          '➡️ Companies that claim rights to my videos are entitled to the \n' +
          'monetisations and will earn a profit from my videos if they \n' +
          'decide to monetize them. This is not my decision.\n' +
          '➡️ If you want the video removed, I\'d appreciate if you request the\n' +
          'video to be globally blocked or muted, since it\'s hassle to deal \n' +
          'with copyright strikes.\n' +
          '\n' +
          '📕Copyright Disclaimer Under Section 107 of the Copyright Act 1976,\n' +
          'allowance is made for "fair use" for purposes such as criticism,\n' +
          'comment, news reporting, teaching, scholarship, and research.\n' +
          'Fair use is a use permitted by copyright statute that might otherwise be infringing.\n' +
          'Non-profit, educational or personal use tips the balance in favor of fair use.',
          tags: ['nba', 'warriors', 'jazz'],
        }}
        validationSchema={
          yup.object().shape({
            link: yup.string().required(),
            thumbnail: yup.string().required(),
            title: yup.string().required().max(255),
            body: yup.string().max(65535, 'Body must not be over 65KB'),
            tags: yup.array().max(4),
          })
        }
        onSubmit={(
          values,
          { setSubmitting, setErrors }
        ) => {
          dispatch(postVideo(values))
            .then(response => {
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
