import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginScreen from './components/LoginScreen';
import AccountScreen from './components/AccountScreen';
import { ApolloProvider } from '@apollo/client';
import client from './apolloClient';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<LoginScreen />} />
          <Route path="/account" element={<AccountScreen />} />
        </Routes>
      </Router>
    </ApolloProvider>
  );
};

export default App;