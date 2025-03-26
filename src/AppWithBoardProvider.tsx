import { useAuth } from "./context/AuthContext";  // Ensure you have user context
import { BoardProvider } from "./context/BoardContext";
import App from "./App";

const AppWithBoardProvider = () => {
  const { user } = useAuth(); // Get user from AuthProvider

  return (
    <BoardProvider user={user}>
      <App />
    </BoardProvider>
  );
};

export default AppWithBoardProvider;