import React from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { FaGoogle, FaGithub, FaMicrosoft } from 'react-icons/fa';

const CustomAuth = ({ supabaseClient }) => {
  const signInWithGoogle = async () => {
    const { data, error } = await supabaseClient.auth.signInWithOAuth({
      provider: 'google'
    });
    if (error) console.error('Error signing in with Google:', error.message);
  };

  const signInWithGithub = async () => {
    const { data, error } = await supabaseClient.auth.signInWithOAuth({
      provider: 'github'
    });
    if (error) console.error('Error signing in with GitHub:', error.message);
  };

  const signInWithAzure = async () => {
    const { data, error } = await supabaseClient.auth.signInWithOAuth({
      provider: 'azure',
      options: {
        scopes: 'email',
      }
    });
    if (error) console.error('Error signing in with Azure:', error.message);
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-6 p-4" align="center"> 
      <div className="space-y-4">
        <button 
          className="w-full justify-center px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 transition-colors"
          onClick={signInWithGoogle} aria-setsize={500}
        >
          <FaGoogle />
          Sign in with Google
        </button>
        <br></br> 
        <br></br> 
        <button 
          className="w-full justify-center px-4 py-2 text-white bg-gray-800 rounded hover:bg-gray-900 transition-colors"
          onClick={signInWithGithub}
        >
          <FaGithub />
          Sign in with GitHub
        </button>
        <br></br> 
        <br></br> 
        <button 
          className="w-full justify-center px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 transition-colors"
          onClick={signInWithAzure}
        >
          <FaMicrosoft />
          Sign in with Azure
        </button>
        <br></br> 
        <br></br>
      </div>
      
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-gray-500"><b>Or continue with</b></span>
        </div>
      </div>

      <Auth
        supabaseClient={supabaseClient}
        appearance={{ theme: ThemeSupa }}
        providers={[]}
      />
    </div>
  );
};

export default CustomAuth;