import { AuthProvider } from './context/AuthContext';
import AppRoutes from './routes';

const App = () => (
  <AuthProvider>
    <AppRoutes />
  </AuthProvider>
);

export default App;