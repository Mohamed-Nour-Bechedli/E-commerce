import AppRoutes from "./routes/AppRoutes";
import ContextProvider from "./context/ContextProvider";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <ContextProvider>
      <AppRoutes />
      <ToastContainer />
    </ContextProvider>
  );
}

export default App;
