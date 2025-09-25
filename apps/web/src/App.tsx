import { Route, Routes } from 'react-router';

// Layouts
import { AuthLayout } from './layout/auth-layout';
import { DashboardLayout } from './layout/dashboard-layout';
import { Layout } from './modules/auth/components/layout';

// Pages
import { Dashboard } from './pages/dashboard';
import { Home } from './pages/home';
import { Login } from './pages/login';
import { NotFound } from './pages/not-found';
import { Signup } from './pages/signup';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Route>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
