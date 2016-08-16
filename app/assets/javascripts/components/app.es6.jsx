const RouteHandler = ReactRouter.RouteHandler,
    Link = ReactRouter.Link;

class App extends React.Component {
  render () {
    return (
    <div>
      <ul>
        <li><Link to='/' >Home</Link></li>
        <li><Link to='/users' >All Users</Link></li>
        <li><Link to='/signup'>SignUp</Link></li>
      </ul>
      <RouteHandler {...this.props}/>
    </div>
  )
  }
}
