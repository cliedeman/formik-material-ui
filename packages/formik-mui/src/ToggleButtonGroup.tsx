import * as React from 'react';
import { 
  type ToggleButtonGroupProps as MuiToggleButtonGroupProps,
  ToggleButtonGroup as MuiToggleButtonGroup
} from "@mui/material";
import type { FieldProps } from 'formik';
import invariant from 'tiny-warning';

export interface ToggleButtonGroupProps
  extends FieldProps,
    Omit<MuiToggleButtonGroupProps, 'name' | 'value' | 'error'> {
  type?: string;
}

export function fieldToToggleButtonGroup({
  field: { onChange: _onChange, onBlur: fieldOnBlur, ...field },
  type,
  onChange,
  onBlur,
  form,
  ...props
}: ToggleButtonGroupProps): MuiToggleButtonGroupProps {
  if (process.env.NODE_ENV !== 'production') {
    invariant(
      type === 'checkbox',
      `property type=checkbox is missing from field ${field.name}, this can caused unexpected behaviour`
    );

    if (!props.exclusive) {
      invariant(
        Array.isArray(field.value),
        `value for ${field.name} is not an array, this can caused unexpected behaviour`
      );
    }
  }

  return {
    onBlur:
      onBlur ??
      function () {
        fieldOnBlur(field.name);
      },
    onChange:
      onChange ??
      function (_event, newValue) {
        form.setFieldValue(field.name, newValue);
      },
    ...field,
    ...props,
  };
}

export function ToggleButtonGroup(props: ToggleButtonGroupProps) {
  return <MuiToggleButtonGroup {...fieldToToggleButtonGroup(props)} />;
}

ToggleButtonGroup.displayName = 'FormikMaterialUIToggleButtonGroup';
