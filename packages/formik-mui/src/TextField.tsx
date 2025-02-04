import * as React from 'react';
import {
  type TextFieldProps as MuiTextFieldProps,
  TextField as MuiTextField
} from '@mui/material';
import { type FieldProps, getIn } from 'formik';

export interface TextFieldProps
  extends FieldProps,
    Omit<MuiTextFieldProps, 'name' | 'value' | 'error'> {}

export function fieldToTextField({
  disabled,
  field: { onBlur: fieldOnBlur, ...field },
  form: { isSubmitting, touched, errors },
  onBlur,
  helperText,
  ...props
}: TextFieldProps): MuiTextFieldProps {
  const fieldError = getIn(errors, field.name);
  const showError = getIn(touched, field.name) && !!fieldError;

  return {
    error: showError,
    helperText: showError ? fieldError : helperText,
    disabled: disabled ?? isSubmitting,
    onBlur:
      onBlur ??
      function (e) {
        fieldOnBlur(e ?? field.name);
      },
    ...field,
    ...props,
  };
}

export function TextField({ children, ...props }: TextFieldProps) {
  return <MuiTextField {...fieldToTextField(props)}>{children}</MuiTextField>;
}

TextField.displayName = 'FormikMaterialUITextField';
