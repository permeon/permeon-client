import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import { Loader, Dimmer, Divider, Form, Button, Message, Segment, Header } from 'semantic-ui-react';
import yup from 'yup';
import { updateSettings } from '../../actions/settingsActions';
import { selectors } from '../../reducers';

const localeOptions = [{ key: 'en-us', text: 'english', value: 'en-us' }];

const SettingsForm = ({
  values,
  status,
  errors,
  touched,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
  setFieldValue,
  setFieldTouched
}) => (
  <Form onSubmit={handleSubmit} error size="large">
    <Dimmer active={isSubmitting} page>
      <Loader size="huge">uploading</Loader>
    </Dimmer>
    {status && status.map((error, idx) => <Message key={idx} error content={error} />)}
    <Header as="h5">Language</Header>
    <Form.Select
      name="locale"
      placeholder="language"
      value={values.locale}
      options={localeOptions}
      onChange={(ev, { name, value }) => setFieldValue(name, value)}
      onBlur={(ev, { name, value }) => setFieldTouched(name, value, false)}
      fluid
    />
    {touched.locale && errors.locale && <Message error content={errors.locale} />}

    <Header as="h5">NSFW Videos</Header>
    <Form.Checkbox
      name="nsfw"
      label="Show nsfw videos"
      checked={values.nsfw}
      onChange={(ev, { name, checked }) => setFieldValue(name, checked)}
    />
    {touched.nsfw && errors.nsfw && <Message error content={errors.nsfw} />}
    <Divider />
    <Button size="large" primary disabled={isSubmitting}>
      save
    </Button>
  </Form>
);

const SettingsFormContainer = ({ dispatch, initialValues }) => {
  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={yup.object().shape({
          locale: yup.string().required(),
          nsfw: yup.boolean()
        })}
        onSubmit={(values, { setSubmitting, setErrors }) => {
          dispatch(updateSettings(values)).then(response => {
            setSubmitting(false);
          });
        }}
        render={props => <SettingsForm {...props} />}
      />
    </div>
  );
};

SettingsFormContainer.propTypes = {};

function mapStateToProps(state) {
  return {
    initialValues: selectors.settings.all(state)
  };
}

export default connect(mapStateToProps)(SettingsFormContainer);
