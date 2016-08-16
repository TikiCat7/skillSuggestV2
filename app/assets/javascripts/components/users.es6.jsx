const RouteHandler = ReactRouter.RouteHandler,
    Link = ReactRouter.Link;

class Users extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      users: []
    }
  }

  componentDidMount() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: users => {
        this.setState({users:users})
      }
    })
  }

  render(){
    const Users = this.state.users.map(user => {
      const Skills = user.skills.map(skill =>{
        return(
          <li key={skill.id}>Skill name:{skill.name}</li>
        )
      })

      return(
            <ul key={user.id}>
              <h2> User id: {user.id}</h2>
              <h2> User name: {user.name}</h2>
              <li><Link to='userDetail' params={{userId:user.id}}>Go to {user.name} details</Link></li>
        </ul>

      )
    })
    return(
        <div>Users:
          {Users}
        </div>
    )
  }
}
