const Route = ReactRouter.Route, DefaultRoute = ReactRouter.DefaultRoute;

this.MyRoutes = (
  <Route handler={App}>
    <DefaultRoute handler={HelloWorld} />
    <Route name='signup ' handler={SignUpForm} path='/signup' />
    <Route name='users' handler={User} path='/user' />
  </Route>
);
