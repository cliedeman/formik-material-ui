import React from 'react';

import { storiesOf } from '@storybook/react';

import TextFieldStory from './TextField.story';
import InputBaseStory from './InputBase.story';
import KitchenSinkStory from './KitchenSink.story';
import SelectorStory from './Selector.story';
import SelectStory from './Select.story';
import SimpleFileUploadStory from './SimpleFileUpload.story';
import RadioGroupStory from './RadioGroup.story.tsx';
import DatePickerStory from './DatePicker.story.tsx';
import TimePickerStory from './TimePicker.story.tsx';
import DateTimePickerStory from './DateTimePicker.story.tsx';

storiesOf('Formik', module)
  .add('Text Field', () => <TextFieldStory />)
  .add('Input Base', () => <InputBaseStory />)
  .add('Radio Group', () => <RadioGroupStory />)
  .add('Selectors', () => <SelectorStory />)
  .add('Select', () => <SelectStory />)
  .add('Simple File Upload', () => <SimpleFileUploadStory />)
  .add('Kitchen Sink', () => <KitchenSinkStory />)
  .add('Date Picker', () => <DatePickerStory />)
  .add('Time Picker', () => <TimePickerStory />)
  .add('Date and Time Picker', () => <DateTimePickerStory />);
