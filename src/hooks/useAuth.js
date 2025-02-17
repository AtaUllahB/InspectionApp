import { useContext } from 'react'

// Import the AuthContext from the correct location
import { AuthContext } from '../contexts/AuthContext';

const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context)
    throw new Error('AuthContext must be placed within AuthProvider');

  return context;
}

export default useAuth;