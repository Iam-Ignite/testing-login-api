import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";


const LogoutButton: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();


  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    navigate('/');
  };

  return (
    <button className="bg-[#151717] text-[white] text-[15px] font-medium h-[50px] w-full cursor-pointer  mb-2.5 mx-0 rounded-[10px] border-[none]" onClick={handleLogout} >
      {t("Logout")}
    </button>
  );
};

export default LogoutButton;