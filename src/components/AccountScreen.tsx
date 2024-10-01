import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_USER_QUERY } from '../graphql/queries';
import LogoutButton from './LogoutButton';
import { toast } from 'react-toastify';

interface UserData {
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
}

const AccountScreen: React.FC = () => {
  const userId = 2; 

  const { loading, error, data } = useQuery<UserData>(GET_USER_QUERY, {
    variables: { id: userId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) {
    console.log(error);
    
    toast.error('Failed to load user details.');
    return <p>Error: {error.message}</p>;
  }

  const { firstName, lastName, email } = data!.user;
  const token = localStorage.getItem('accessToken');
    console.log("token",token);

  return (
    <div className="container">
  
    <div className="card-client">
    <h2>Account Details</h2>
      <div className="user-picture">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
          <path d="M224 256c70.7 0 128-57.31 128-128s-57.3-128-128-128C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3C77.61 304 0 381.6 0 477.3c0 19.14 15.52 34.67 34.66 34.67h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304z"></path>
        </svg>
      </div>
      <p className="name-client">{firstName} {lastName}</p>
      <span> {email}</span>
      <br />
    <LogoutButton />
    </div>

  </div>
  );
};

export default AccountScreen;