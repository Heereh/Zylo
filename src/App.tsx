import "./pages/signUp/signUpStyles.css";

import Dashboard from "./component/Dashboard/Dashboard";
import { Route, BrowserRouter as Router, Routes } from "react-router";
import WorkoutDay from "./pages/workoutDay/ExerciseDays";
import LoginPage from "./pages/signUp/signUp";
import ProtectedRoute from "./component/ProtectedRoute/ProtectedRoute";
import { Layout } from "./component/Layout/Layout";
import { AlertProvider } from "./context/useAlertProvider";

function App() {
  return (
    <AlertProvider>
      <div className="app">
        <Router>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route element={<ProtectedRoute />}>
              <Route element={<Layout />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/workoutDay/:id" element={<WorkoutDay />} />
              </Route>
            </Route>
          </Routes>
        </Router>
      </div>
    </AlertProvider>
  );
}

export default App;
