import * as React from 'react';
import { 
  type InputBaseProps as MuiInputBaseProps,
  InputBase as MuiInputBase,
} from '@mui/material';
import type { FieldProps } from 'formik';

export interface InputBaseProps
  extends FieldProps,
    Omit<MuiInputBaseProps, 'name' | 'value' | 'error'> {}

export function fieldToInputBase({
  disabled,
  field: { onBlur: fieldOnBlur, ...field },
  form: { isSubmitting },
  onBlur,
  ...props
}: InputBaseProps): MuiInputBaseProps {
  return {
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

export function InputBase(props: InputBaseProps) {
  return <MuiInputBase {...fieldToInputBase(props)} />;
}

InputBase.displayName = 'FormikMaterialUIInputBase';
