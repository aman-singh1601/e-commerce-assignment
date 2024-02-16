import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect } from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

//routes
import { PublicRoutes, AuthProtectedRoutes } from './routes';
import AuthMiddleware from './routes/route';
import StoreProvider from './routes/storeprovider';


function App() {
  return (
    <React.Fragment>
      <Router>
      <Routes>
        {PublicRoutes.map((route, idx) => (
          <Route
            key = {idx}
            path = {route.path}
            element = {route.component}
          />
        ))}
        {AuthProtectedRoutes.map((route, idx) => (
          <Route
            key={idx}
            path={route.path}
            element = {
              <AuthMiddleware>
                <StoreProvider>
                {route.component}
                </StoreProvider>
              </AuthMiddleware>
            }
          />
        ))}
      </Routes>
      </Router>
    </React.Fragment>
  )
}

export default App;
