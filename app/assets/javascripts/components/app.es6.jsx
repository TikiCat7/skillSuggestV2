var RouteHandler = ReactRouter.RouteHandler,
    Link = ReactRouter.Link;

class App extends React.Component {
  render () {
    return (
    <div>
      <ul>
        <li><Link to='/user' url={{url:'/api/users'}}>User</Link></li>
        <li><Link to='/signup'>SignUp</Link></li>
      </ul>
      <RouteHandler {...this.props}/>
    </div>
  )
  }
}
