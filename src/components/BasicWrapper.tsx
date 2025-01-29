import { Box } from '@mui/material';
import { ReactNode } from 'react';
import { StyledBasicWrapper } from './BasicWrapper.styled';

interface BasicWrapperInterface {
  children: ReactNode;
}

export const BasicWrapper = ({ children }: BasicWrapperInterface) => {
  return (
    <Box
      sx={{
        marginTop: '100px',
        marginBottom: '100px',
        width: '90%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
      }}
    >
      <StyledBasicWrapper>{children}</StyledBasicWrapper>
    </Box>
  );
};
