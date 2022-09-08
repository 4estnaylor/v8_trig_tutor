import React from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';

const Login = () => {
  const { data: session } = useSession();
  if (session) {
    return (
      <div>
        <p>Welcome, {session.user.name}</p>
        <img src={session.user.image} alt="" />
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
