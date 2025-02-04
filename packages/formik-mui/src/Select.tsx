import { 
  type FormHelperTextProps,
  type FormControlProps,
  type InputLabelProps,
  type SelectProps as MuiSelectProps,
  FormControl,
  FormHelperText,
  InputLabel,
  Select as MuiSelect,
} from "@mui/material";
import { type FieldProps, getIn } from 'formik';
import * as React from 'react';

export interface SelectProps
  extends FieldProps,
    Omit<MuiSelectProps, 'name' | 'value'> {
  formControl?: FormControlProps;
  formHelperText?: FormHelperTextProps;
  inputLabel?: InputLabelProps;
}

export function fieldToSelect({
  disabled,
  field: { onBlur: _onBlur, onChange: fieldOnChange, ...field },
  form: { isSubmitting, touched, errors, setFieldTouched, setFieldValue },
  onClose,
  ...props
}: Omit<
  SelectProps,
  'formControl' | 'formHelperText' | 'inputLabel'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
>): MuiSelectProps & { formError: any } {
  const fieldError = getIn(errors, field.name);
  const showError = getIn(touched, field.name) && !!fieldError;

  return {
    disabled: disabled ?? isSubmitting,
    error: showError,
    formError: showError ? fieldError : undefined,
    onBlur: () => {
      // no-op
    },
    onChange:
      fieldOnChange ??
      (() => {
        // no-op
      }),
    // we must use `onClose` instead of `onChange` to be able to trigger validation when users click outside of the select list.
    onClose:
      onClose ??
      (async (e: React.SyntheticEvent) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const dataset = (e.target as any).dataset as DOMStringMap;
        if (dataset && dataset.value) {
          // out-of-sync issue since November 2019: https://github.com/formium/formik/issues/2059#issuecomment-890613538
          // without the await, formik validates with the former value
          await setFieldValue(field.name, dataset.value, false);
        }
        setFieldTouched(field.name, true, true);
      }),
    ...field,
    ...props,
  };
}

export function Select({
  formControl,
  inputLabel,
  formHelperText,
  ...selectProps
}: SelectProps) {
  const { error, formError, disabled, ...selectFieldProps } =
    fieldToSelect(selectProps);
  const { children: formHelperTextChildren, ...formHelperTextProps } =
    formHelperText || {};
  const shouldDisplayFormHelperText = error || formHelperTextChildren;

  return (
    <FormControl disabled={disabled} error={error} {...formControl}>
      <InputLabel id={selectFieldProps.labelId} {...inputLabel}>
        {selectFieldProps.label}
      </InputLabel>
      <MuiSelect {...selectFieldProps} />
      {shouldDisplayFormHelperText && (
        <FormHelperText {...formHelperTextProps}>
          {error ? formError : formHelperTextChildren}
        </FormHelperText>
      )}
    </FormControl>
  );
}

Select.displayName = 'FormikMaterialUISelect';
