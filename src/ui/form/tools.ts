import _ from 'lodash';
import {
  ControllerFieldState,
  ControllerRenderProps,
  FieldError,
  FieldPath,
  FieldValues,
  RegisterOptions
} from 'react-hook-form';

export type FormRules<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = Omit<
  RegisterOptions<TFieldValues, TName>,
  'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
>;

function parseNumber(s: any): number  {
  return isNaN(s) ? NaN : +s;
}

export function showError(name: string, error?: FieldError, rules?: FormRules): string | undefined {
  if (!error) {
    return;
  }
  if (!_.isEmpty(error.message)) {
    return error.message;
  }
  // make default error message
  const label = _.startCase(name);

  if (error.type === 'required') {
    return `${label} is required`;
  }
  if (error.type === 'min') {
    const rule = rules?.min as any;
    const n = parseNumber(rule?.value ?? rule);
    return _.isFinite(n) ? `${label} must be no lesser than ${n}` : `${label} is too little`;
  }
  if (error.type === 'max') {
    const rule = rules?.max as any;
    const n = parseNumber(rule?.value ?? rule);
    return _.isFinite(n) ? `${label} must be no greater than ${n}` : `${label} is too large`;
  }
  if (error.type === 'minLength') {
    const rule = rules?.minLength as any;
    const n = parseInt(rule?.value ?? rule);
    return _.isInteger(n) ? `${label} must be at least ${n} character long` : `${label} is too short`;
  }
  if (error.type === 'maxLength') {
    const rule = rules?.maxLength as any;
    const n = parseInt(rule?.value ?? rule);
    return _.isInteger(n) ? `${label} must be at most ${n} character long` : `${label} is too long`;
  }
  if (error.type === 'validate') {
    return `${label} has a invalid value`;
  }
}

export function textControl(
  name: string,
  field: ControllerRenderProps<any, any>,
  fieldState:  ControllerFieldState,
  rules?: FormRules
) {
  return {
    id: _.snakeCase(name),
    label: _.startCase(name),
    value: field.value,
    onChange: field.onChange,
    error: !_.isNil(fieldState.error),
    helperText: showError(name, fieldState.error, rules),
    onBlur: field.onBlur,
    inputRef: field.ref
  };
}


export function switchControl(
  name: string,
  field: ControllerRenderProps<any, any>
) {
  return {
    id: _.snakeCase(name),
    label: _.startCase(name),
    checked: field.value,
    onChange: field.onChange,
    onBlur: field.onBlur,
    inputRef: field.ref
  };
}
