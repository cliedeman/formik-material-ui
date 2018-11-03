import React from 'react';
import Button from '@material-ui/core/Button';
import { Formik, Field, Form } from 'formik';
import Wrapper from './Wrapper';
import { action } from '@storybook/addon-actions';

import { RadioGroup } from '../src/RadioGroup';
import { FormControlLabel, Radio, LinearProgress } from '@material-ui/core';
import FormValues from './FormValues';

interface Values {
  activity: string;
}

export default () => (
  <Wrapper title="Radio Group">
    <Formik<Values>
      initialValues={{
        activity: '',
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          setSubmitting(false);
          action('submit')(values);
        }, 2000);
      }}
      render={({ submitForm, values, isSubmitting, isValid }) => {
        return (
          <Form>
            <Field name="activity" label="Radio Group" component={RadioGroup}>
              <FormControlLabel
                value="painting"
                control={<Radio disabled={isSubmitting} />}
                label="Painting"
                disabled={isSubmitting}
              />
              <FormControlLabel
                value="drawing"
                control={<Radio disabled={isSubmitting} />}
                label="Drawing"
                disabled={isSubmitting}
              />
              <FormControlLabel
                value="none"
                control={<Radio disabled={isSubmitting} />}
                label="None"
                disabled
              />
            </Field>
            <br />
            {isSubmitting && <LinearProgress />}
            <br />
            <Button
              disabled={!isValid}
              variant="raised"
              color="primary"
              onClick={submitForm}
            >
              Submit
            </Button>
            <FormValues values={values} />
          </Form>
        );
      }}
    />
  </Wrapper>
);
