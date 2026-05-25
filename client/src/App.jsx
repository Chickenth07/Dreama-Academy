import { AppProvider } from './context/AppContext';
import AppRouter from './router/AppRouter';
import './index.css';

const App = () => {
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  );
};

export default App;
