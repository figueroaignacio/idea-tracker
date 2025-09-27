import { Route, Routes } from 'react-router';

// Layouts
import { AuthLayout } from './layout/auth-layout';
import { DashboardLayout } from './layout/dashboard-layout';
import { Layout } from './layout/layout';

// Pages
import { DashboardPage } from './pages/dashboard-page';
import { HomePage } from './pages/home-page';
import { LoginPage } from './pages/login-login';
import { NotFound } from './pages/not-found';
import { SignupPage } from './pages/signup-page';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route element={<AuthLayout />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
        </Route>
      </Route>
      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<DashboardPage />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
