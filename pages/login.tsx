import React from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import ResponsiveAppBar from '../components/ResponsiveAppBar';

const Login = () => {
  const { data: session } = useSession();
  if (session) {
    return (
      <div>
        <p>Welcome, {session?.user?.name}</p>
        <img src={session?.user?.image || 'nonya.com'} alt="" />
        <button
          onClick={() => {
            signOut();
          }}
        >
          sign out
        </button>
      </div>
    );
  } else {
    return (
      <div>
        <ResponsiveAppBar />
        <p>you are not signed in</p>
        <button
          onClick={() => {
            signIn();
          }}
        >
          sign in
        </button>
      </div>
    );
  }
};

export default Login;
