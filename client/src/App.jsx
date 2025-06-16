import { Navigate, Route, Routes } from "react-router";
import "./App.css";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import useAuthCheck from "./hooks/authCheck";
import OnBoardPage from "./pages/onBoard";
import { Toaster } from "react-hot-toast";
function App() {
  const { authUser, isLoading } = useAuthCheck();
  const isAuthenticated = Boolean(authUser);
  const isOnBoarded = Boolean(authUser?.isOnBoard);
  if (isLoading) {
    return (
      <>
        <div className="min-h-screen flex items-center justify-center">
          <div className="font-semibold text-3xl">Loading...</div>
        </div>
      </>
    );
  }
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              isOnBoarded ? (
                <HomePage />
              ) : (
                <Navigate to={"/onboard"} />
              )
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboard"} />
            )
          }
        />
        <Route
          path="/login"
          element={!isAuthenticated ? <LoginPage /> : <Navigate to="/" />}
        />
        <Route
          path="/register"
          element={!isAuthenticated ? <RegisterPage /> : <Navigate to="/" />}
        />
        <Route
          path="/onboard"
          element={
            isAuthenticated && !isOnBoarded ? (
              <OnBoardPage />
            ) : (
              <Navigate to={"/"} />
            )
          }
        />
      </Routes>

      <Toaster />
    </>
  );
}

export default App;
