import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_MUTATION } from '../graphql/mutations';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useTranslation } from "react-i18next";


const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();
  const { t } = useTranslation();


  const [login, { loading }] = useMutation(LOGIN_MUTATION);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error('Please fill out both fields');
      return;
    }

    try {
      const { data } = await login({
        variables: { identifier: email, password },
      });       

      localStorage.setItem('accessToken', data.login.jwt);
      toast.success('Login successful!');
      navigate('/account');
    } catch (error) {
      toast.error('Login failed. Please check your credentials.');
    }
  };

  return (
    <form className=" flex flex-col gap-2.5 bg-white w-[450px] p-[30px] rounded-[20px]" onSubmit={handleLogin}>
      <div className="flex-column">
        <label>{t("Email")}</label>
      </div>
      <div className="h-[50px] flex items-center  transition-[0.2s] duration-[ease-in-out] rounded-[10px] border-[1.5px] border-solid border-[#ecedec] focus-within:border-[1.5px] focus-within:border-solid focus-within:border-[#2d79f3]">
    
        <input
          placeholder="Enter your Email"
          className="w-full h-full outline-none  px-4 rounded-[10px] border-[none]"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="flex-column">
        <label>{t("Password")}</label>
      </div>
      <div className="h-[50px] flex items-center transition-[0.2s] duration-[ease-in-out] rounded-[10px] border-[1.5px] border-solid border-[#ecedec] focus-within:border-[1.5px] focus-within:border-solid focus-within:border-[#2d79f3]">
     
        <input
          placeholder="Enter your Password"
          className="w-full h-full  rounded-[10px] px-4 outline-none  border-[none]"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button className="bg-[#151717] text-[white] text-[15px] font-medium h-[50px] w-full cursor-pointer mt-5 mb-2.5 mx-0 rounded-[10px] border-[none]" type="submit" disabled={loading}>
        {t(`${loading ? 'Logging in...' : 'Log In'}`)}
      </button>
  
    </form>
  );
};

export default LoginScreen;