import { Checkbox, Stack, Tooltip, Typography } from '@mui/material';
import { TodoItemProps } from '../types';
import React from 'react';

const TodoItem = ({ name, isCompleted }: TodoItemProps) => {
  return (
    <Stack
      direction={'row'}
      padding={1}
      alignItems={'center'}
      style={{
        borderRadius: '4px',
        backgroundColor: '#EEEEEE',
      }}
    >
      <Checkbox defaultChecked={isCompleted} color="success" />
      <Tooltip title={name}>
        <Typography
          noWrap
          style={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {name}
        </Typography>
      </Tooltip>
    </Stack>
  );
};

export default React.memo(TodoItem);
