import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/Layout';
import Login from './pages/Login';
import Prompts from './pages/Prompts';
import Config from './pages/Config';
import Conversations from './pages/Conversations';
import Documents from './pages/Documents';
import QuickReplies from './pages/QuickReplies';

function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="p-8">加载中...</div>;
  return user ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Layout />
              </PrivateRoute>
            }
          >
            <Route index element={<Navigate to="/prompts" replace />} />
            <Route path="prompts" element={<Prompts />} />
            <Route path="config" element={<Config />} />
            <Route path="conversations" element={<Conversations />} />
            <Route path="documents" element={<Documents />} />
            <Route path="quick-replies" element={<QuickReplies />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
