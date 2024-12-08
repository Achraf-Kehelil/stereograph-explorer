import { useAuth } from '@/lib/auth';
import { LoginForm } from '@/components/auth/LoginForm';
import { Dashboard } from '@/components/Dashboard';

function App() {
  const { user } = useAuth();

  if (!user) {
    return <LoginForm />;
  }

  return <Dashboard />;
}

export default App;