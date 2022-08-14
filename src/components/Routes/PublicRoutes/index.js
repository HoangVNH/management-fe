import { Redirect, Route } from "react-router-dom";

const PublicRoute = ({ children, isAuthenticated, ...rest }) => {
  return (
    <Route 
      {...rest}
      render={
        ({location}) => (
          !isAuthenticated ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: '/',
                state: { from: location }
              }}
            />
          ))
      }
    />
  );
};

export default PublicRoute;
