import AppRoutes from "./routes/AppRoutes";
import ContextProvider from "./context/ContextProvider";

function App() {
  return (
    <ContextProvider>
      <AppRoutes />
    </ContextProvider>
  );
}

export default App;


