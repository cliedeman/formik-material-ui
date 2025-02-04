import * as React from 'react';
import {
  type CheckboxProps as MuiCheckboxProps,
  Checkbox as MuiCheckbox, 
} from '@mui/material';
import type { FieldProps } from 'formik';
import invariant from 'tiny-warning';

export interface CheckboxProps
  extends FieldProps,
    Omit<
      MuiCheckboxProps,
      | 'name'
      | 'value'
      | 'error'
      | 'form'
      | 'checked'
      | 'defaultChecked'
      // Excluded for conflict with Field type
      | 'type'
    > {
  type?: string;
}

export function fieldToCheckbox({
  disabled,
  field: { onBlur: fieldOnBlur, ...field },
  form: { isSubmitting },
  type,
  onBlur,
  ...props
}: CheckboxProps): MuiCheckboxProps {
  const indeterminate = !Array.isArray(field.value) && field.value == null;

  if (process.env.NODE_ENV !== 'production') {
    invariant(
      type === 'checkbox',
      `property type=checkbox is missing from field ${field.name}, this can caused unexpected behaviour`
    );
  }

  return {
    disabled: disabled ?? isSubmitting,
    indeterminate,
    onBlur:
      onBlur ??
      function (e) {
        fieldOnBlur(e ?? field.name);
      },
    ...field,
    ...props,
  };
}

export function Checkbox(props: CheckboxProps) {
  return <MuiCheckbox {...fieldToCheckbox(props)} />;
}

Checkbox.displayName = 'FormikMaterialUICheckbox';
