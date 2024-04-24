import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { TextField, Button } from '@mui/material';

const SignInEmail = () => {
  const [email, setEmail] = useState('');
  const router = useRouter();

  const handleNext = () => {
    // Perform any validation you need here
    router.push({
      pathname: '/signin-pin',
      query: { email }, // Pass the email to the PIN screen
    });
  };

  return (
    <div>
      <TextField
        label="Email Address"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Button onClick={handleNext}>Next</Button>
    </div>
  );
};

export default SignInEmail;
