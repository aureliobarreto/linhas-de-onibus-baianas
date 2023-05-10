import * as React from 'react';
import TextField from '@mui/material/TextField';

export default function BasicTextField({ title }) {
  return (
      <TextField variant="outlined" label={title} />
  );
}