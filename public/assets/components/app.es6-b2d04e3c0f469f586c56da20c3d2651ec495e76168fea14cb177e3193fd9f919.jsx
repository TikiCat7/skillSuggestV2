const RouteHandler = ReactRouter.RouteHandler,
    Link = ReactRouter.Link;

class App extends React.Component {
  constructor(){
    super()
    this.state = {
      currentUserName: '',
      currentUserId: '',
      loggedInStatus: false
    }
    this.updateCurrentUser = this.updateCurrentUser.bind(this)
  }

  updateCurrentUser(user) {
    this.setState({currentUserName:user.name, currentUserId:user.id, loggedInStatus:true})
  }

  render () {
    const loginDisplay = () => {
      if(this.state.loggedInStatus) {
        return(
          <div>Currently Logged In As: {this.state.currentUserName}</div>
        )
      } else {
        return(
          <div>Currently Not Logged In</div>
        )
      }
    }();
    
    return (
    <div>
      {loginDisplay}
      <ul>
        <li><Link to='/' >Home</Link></li>
        <li><Link to='/users' >All Users</Link></li>
        <li><Link to='/signup'>SignUp</Link></li>
        <li><Link to='/login'>Login</Link></li>
      </ul>
      <RouteHandler url='/api/users' authenticity_token={this.props.authenticity_token} handleUserUpdate={this.updateCurrentUser}/>
    </div>
  )
  }
}
