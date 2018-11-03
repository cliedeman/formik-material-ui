import React from 'react';
import Button from '@material-ui/core/Button';
import { Formik, Field, Form } from 'formik';
import { action } from '@storybook/addon-actions';
import { createStyles, withStyles, Theme, WithStyles } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import * as Yup from 'yup';

import Wrapper from './Wrapper';
import FormValues from './FormValues';
import { Select } from '../src/main';

const schema = Yup.object().shape({
  age: Yup.string().required(),
});

const styles = ({ spacing }: Theme) =>
  createStyles({
    formControl: {
      margin: spacing.unit,
      minWidth: 120,
    },
  });

interface Values {
  age: string;
}

export default withStyles(styles)(({ classes }: WithStyles<typeof styles>) => (
  <Wrapper title="Select">
    <Formik<Values>
      validationSchema={schema}
      initialValues={{ age: '' }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          setSubmitting(false);
          action('submit')(values);
        }, 2000);
      }}
      render={({ submitForm, values }) => (
        <Form>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="age-simple">Age</InputLabel>
            <Field
              name="age"
              component={Select}
              inputProps={{
                name: 'age',
                id: 'age-simple',
              }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Field>
          </FormControl>
          <br />
          <Button variant="raised" color="primary" onClick={submitForm}>
            Submit
          </Button>
          <br />
          <FormValues values={values} />
        </Form>
      )}
    />
  </Wrapper>
));
