import LoginForm from '../../components/LoginForm';
import React from 'react';
import './styles.scss';

const LoginPage = () => {
  return (
    <div className="authentication__wrapper">
      <LoginForm />
    </div> 
  )
};

export default LoginPage;
