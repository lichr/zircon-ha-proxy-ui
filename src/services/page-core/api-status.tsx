import { CircularProgress } from '@mui/material';
import { ApiInvokeStatus } from './types';

export function ApiStatus(
  props: {
    status: ApiInvokeStatus;
    hideError?: boolean;
    error?: any;
    className?: string;
  }
) {
  const color = '#f00';
  if (props.status === 'pending') {
    return (
      <CircularProgress variant="indeterminate" />
    )
  } else if (props.status === 'error' && !props.hideError) {
    return (
      <div css={{ color }}>
        Error: {props.error?.message}
      </div>
    )
  }
  return null;
}
