import React from 'react';
import { useSession, signOut, getSession } from 'next-auth/react';
import { GetServerSideProps } from 'next';

const Account = () => {
  const { data: session, status } = useSession({
    required: true,
  });

  if (status === 'authenticated') {
    return (
      <div>
        <p>
          Account:
          {session?.user?.name}
        </p>
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
        <p>You are not signed in</p>
      </div>
    );
  }
};

export default Account;
// export const getServerSideProps = async (context) => {
//   const session = await getSession(context);
//   if (!session) {
//     return {
//       redirect: {
//         destination: '/login',
//       },
//     };
//   }

//   return {
//     props: { session },
//   };
// };
