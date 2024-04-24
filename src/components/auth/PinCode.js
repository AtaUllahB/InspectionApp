import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { TextField, Button } from '@mui/material';

const PinCode = () => {
  const [pin, setPin] = useState('');
  const router = useRouter();
  const { email } = router.query; // Retrieve the email passed from the email screen

  const handleSignIn = async () => {
    // Perform your sign-in logic here using the email and pin
    try {
      const response = await login(email, pin);
      // Handle success - store tokens, redirect, etc.
    } catch (error) {
      // Handle error
      console.error('Login error:', error);
    }
  };

  return (
    <div>
      <TextField
        label="PIN"
        type="password"
        value={pin}
        onChange={(e) => setPin(e.target.value)}
        required
      />
      <Button onClick={handleSignIn}>Sign In</Button>
    </div>
  );
};

export default PinCode;
