// ProtectedRoute.jsx

import { Route, Redirect } from 'react-router-dom';

// Simulate an authentication function
const isAuthenticated = () => {
  // Replace this with your authentication logic
  return localStorage.getItem('authToken') !== null;
};

const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

export default ProtectedRoute;
