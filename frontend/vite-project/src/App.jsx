import { Toaster } from 'react-hot-toast';
import './App.css'
import { useAuthContext } from './context/AuthContext';
import Home from './pages/home/home'
import Login from './pages/login/login'
import { Navigate, Route, Routes } from "react-router-dom";


function App() {

  const {authUser} = useAuthContext();
  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <Routes>
        <Route
          path="/"
          element={authUser ? <Home /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/login"
          element={authUser ? <Navigate to="/" /> : <Login />}
        />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App
