import { Navigate, Route, Routes } from 'react-router-dom';
import { LoginPage, RegisterPage, LoginPersonalMedico } from '../pages';

export const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="login" element={<LoginPage />} />
      <Route path="register" element={<RegisterPage />} />
      <Route path="personalMedico" element={<LoginPersonalMedico />} />

      <Route path="/*" element={<Navigate to="/auth/login" replace />} />
    </Routes>
  );
};

