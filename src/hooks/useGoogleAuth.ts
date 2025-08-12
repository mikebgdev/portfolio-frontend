import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../store';
import { loginSuccess, logout, setLoading } from '../store/authSlice';
import { env } from '../utils/env';

declare global {
  interface Window {
    google: any;
    handleCredentialResponse: (response: any) => void;
  }
}

export const useGoogleAuth = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated, isLoading } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    // Load Google Identity Services script
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    // Global callback function for Google Sign-In
    window.handleCredentialResponse = async (response) => {
      dispatch(setLoading(true));
      
      try {
        // Decode the JWT token (in production, verify on server)
        const payload = JSON.parse(atob(response.credential.split('.')[1]));
        
        const userData = {
          id: payload.sub,
          email: payload.email,
          name: payload.name,
          picture: payload.picture,
        };

        // TODO: Send token to backend for verification and get actual auth token
        // For now, we'll use the Google JWT token directly (not recommended for production)
        dispatch(loginSuccess({
          user: userData,
          token: response.credential,
        }));
        
        console.log('Login successful:', userData);
      } catch (error) {
        console.error('Login failed:', error);
        dispatch(setLoading(false));
      }
    };

    script.onload = () => {
      if (window.google) {
        window.google.accounts.id.initialize({
          client_id: env.GOOGLE_CLIENT_ID,
          callback: window.handleCredentialResponse,
        });
      }
    };

    return () => {
      document.head.removeChild(script);
    };
  }, [dispatch]);

  const signIn = () => {
    if (window.google) {
      window.google.accounts.id.prompt();
    }
  };

  const signOut = () => {
    dispatch(logout());
    if (window.google) {
      window.google.accounts.id.disableAutoSelect();
    }
  };

  const renderSignInButton = (element: HTMLElement) => {
    if (window.google && element) {
      window.google.accounts.id.renderButton(element, {
        theme: 'outline',
        size: 'large',
        type: 'standard',
        text: 'signin_with',
        shape: 'rectangular',
        logo_alignment: 'left',
        width: 250,
      });
    }
  };

  return {
    user,
    isAuthenticated,
    isLoading,
    signIn,
    signOut,
    renderSignInButton,
  };
};