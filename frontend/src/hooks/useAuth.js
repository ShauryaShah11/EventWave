import { useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';

// Define your login function here
// Make sure to handle login API calls and token storage
async function loginUser(credentials) {
  // Perform the login API call and return the response
  // Example:
  return fetch('http://localhost:8000/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json());
}

export function useAuth() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    if (token) {
      const decodedToken = jwt_decode(token);
      setUser(decodedToken);
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await loginUser({ email, password });

      if (response.token) {
        const decodedToken = jwt_decode(response.token);
        setUser(decodedToken);

        // Store token in local storage based on user's role
        if (decodedToken.role === 'admin') {
          localStorage.setItem('adminToken', response.token);
        } else if (decodedToken.role === 'user') {
          localStorage.setItem('userToken', response.token);
        } else if (decodedToken.role === 'organizer') {
          localStorage.setItem('organizerToken', response.token);
        }

        console.log('Login successful');
        return true; // Indicate successful login
      } else {
        return false; // Indicate failed login
      }
    } catch (error) {
      console.error('Error during login:', error);
      throw new Error('An error occurred. Please try again later.');
    }
  };

  const logout = () => {
    // Clear user data and tokens from state and local storage
    setUser(null);
    localStorage.removeItem('adminToken');
    localStorage.removeItem('userToken');
    localStorage.removeItem('organizerToken');
  };

  const isAuthenticated = () => {
    return !!user; // Check if a user is authenticated
  };

  const getUserRole = () => {
    return user ? user.role : null;
  };

  return { login, logout, isAuthenticated, getUserRole };
}
