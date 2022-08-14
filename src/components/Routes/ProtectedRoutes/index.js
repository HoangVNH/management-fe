const { Suspense } = require("react");
const { Switch, Route } = require("react-router-dom");

const ProtectedRoutes = () => (
  <Switch>
    <Suspense
      fallback={<div>loading...</div>}
    >
      {routes.map(({ component: Component, path, exact }) => (
        <Route
          path={`/${path}`}
          key={path}
          exact={exact}
        >
          <Component />
        </Route>
      ))}
    </Suspense>
  </Switch>
)