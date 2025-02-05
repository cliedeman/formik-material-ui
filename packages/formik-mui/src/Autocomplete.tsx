import * as React from 'react';
import { 
  type AutocompleteProps as MuiAutocompleteProps,
  Autocomplete as MuiAutocomplete,
} from '@mui/material';
import type { FieldProps } from 'formik';
import invariant from 'tiny-warning';

export type { AutocompleteRenderInputParams } from '@mui/material/Autocomplete';

export interface AutocompleteProps<
  T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
> extends FieldProps,
    Omit<
      MuiAutocompleteProps<T, Multiple, DisableClearable, FreeSolo>,
      'name' | 'value' | 'defaultValue'
    > {
  type?: string;
}

export function fieldToAutocomplete<
  T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
>({
  disabled,
  field,
  form: { isSubmitting, setFieldValue },
  type,
  onChange,
  onBlur,
  freeSolo,
  ...props
}: AutocompleteProps<
  T,
  Multiple,
  DisableClearable,
  FreeSolo
>): MuiAutocompleteProps<T, Multiple, DisableClearable, FreeSolo> {
  if (process.env.NODE_ENV !== 'production') {
    if (props.multiple) {
      invariant(
        Array.isArray(field.value),
        `value for ${field.name} is not an array, this can caused unexpected behaviour`
      );
    }
  }

  const {
    onChange: _onChange,
    onBlur: _onBlur,
    multiple: _multiple,
    ...fieldSubselection
  } = field;

  return {
    freeSolo,
    onBlur:
      onBlur ??
      function (event) {
        field.onBlur(event ?? field.name);
      },
    onChange:
      onChange ??
      function (_event, value) {
        setFieldValue(field.name, value);
      },
    disabled: disabled ?? isSubmitting,
    loading: isSubmitting,
    ...fieldSubselection,
    ...props,
  };
}

export function Autocomplete<
  T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
>(props: AutocompleteProps<T, Multiple, DisableClearable, FreeSolo>) {
  return <MuiAutocomplete {...fieldToAutocomplete(props)} />;
}

Autocomplete.displayName = 'FormikMaterialUIAutocomplete';
