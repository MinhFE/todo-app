import { Box } from '@mui/material';
import React, { ReactNode } from 'react';

interface ICustomTabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: Readonly<ICustomTabPanelProps>) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box
          sx={{
            p: 3,
            overflowY: 'auto',
            maxHeight: '30vh',
            display: 'flex',
            flexDirection: 'column',
          }}
          gap={1}
        >
          {children}
        </Box>
      )}
    </div>
  );
}

export default React.memo(CustomTabPanel);
