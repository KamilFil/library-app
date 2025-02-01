import { useState } from 'react';
import { LoginForm } from './components/LoginForm.tsx';
import { RegisterForm } from './components/RegisterForm.tsx';
import { Box } from '@mui/material';

export const SignIn = () => {
  const [formSwitch, setFormSwitch] = useState<boolean>(true);

  return (
    <Box
      sx={{
        width: '100%',
        height: '80vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {formSwitch ? (
        <LoginForm handleSwitchForm={() => setFormSwitch(!formSwitch)} />
      ) : (
        <RegisterForm handleSwitchForm={() => setFormSwitch(!formSwitch)} />
      )}
    </Box>
  );
};
