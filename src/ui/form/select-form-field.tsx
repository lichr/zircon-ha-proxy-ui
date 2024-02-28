import { FormControl, InputLabel, Select } from '@mui/material';
import _ from 'lodash';
import { ReactNode } from 'react';
import { Control, Controller } from 'react-hook-form';
import { FormRules } from './tools';

export function SelectFormField(
  props: {
    control: Control<any>;
    name: string;
    label?: string;
    rules?: FormRules;
    className?: string;
    children?: ReactNode;
  }
) {
  const { control, name, label, className, children } = props;
  const labelId = `select-label-${props.name}`;

  const label2 = label ?? _.upperCase(props.name);

  return (
    <Controller
      name={name}
      control={control}
      rules={{
        required: true
      }}
      render={
        ({ field, fieldState }) => (
          <FormControl size="small" className={className}>
            <InputLabel id={labelId}>{label2}</InputLabel>
            <Select
              labelId={labelId}
              label={label2}
              value={field.value}
              onChange={field.onChange}
            >
              {children}
            </Select>
          </FormControl>
        )
      }
    />
  );
}
