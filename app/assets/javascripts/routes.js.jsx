var Route = ReactRouter.Route;

this.MyRoutes = (
  <Route handler={App}>
    <Route name='signup ' handler={SignUpForm} path='/signup' />
    <Route name='users' handler={User} path='/user' />
  </Route>
);
