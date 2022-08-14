import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({ children, isAuthenticated, ...rest }) => {
  return (
    <Route 
      {...rest}
      render={
        ({location}) => (
          isAuthenticated ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: location }
              }}
            />
          ))
      }
    />
  );
};

export default PrivateRoute;
