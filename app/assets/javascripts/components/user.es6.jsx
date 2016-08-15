class User extends React.Component {

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
              <h1> User id: {user.id}</h1>
              <h2> Basic User Info </h2>
              <li>age: {user.age}</li>
              <li>name: {user.name}</li>
              <li>job: {user.job}</li>
              <h2> User Skill Info</h2>
              {Skills}
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
