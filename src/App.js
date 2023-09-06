import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'
import { Route, Routes } from 'react-router-dom';
import { AuthProvider } from './auth';
import { Login } from './components/Login';
import { RequireAuth } from './components/RequireAuth';
import Dashboard from './components/Dashboard';
import { RequireAnonymous } from './components/RequireAnonymous';
import ForgetPassword from './components/ForgetPassword';
import Data from './components/Data';
import OpenData from './components/OpenData';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route
          path='/login'
          element={
            <RequireAnonymous>
              <Login />
            </RequireAnonymous>
          } 
        />
        <Route 
          path='/forgetpassword'
          element={
            <RequireAnonymous>
              <ForgetPassword />
            </RequireAnonymous>
          }
        />
        <Route
          path='/dashboard'
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          } 
        />
        <Route 
          path='/data'
          element={
            <RequireAuth>
              <Data />
            </RequireAuth>
          }
        >
          <Route
            path=':dataName'
            element={
              <RequireAuth >
                <OpenData />
              </RequireAuth>
            }
          />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
