const Route = ReactRouter.Route, DefaultRoute = ReactRouter.DefaultRoute;

this.MyRoutes = (
  <Route handler={App}>
    <DefaultRoute handler={HelloWorld} />
    <Route name='signup ' handler={SignUpForm} path='/signup' />
    <Route name='users' handler={Users} path='/users' />
    <Route name='userDetail' handler={UserDetail} path='/user/:userId' />
  </Route>
);
