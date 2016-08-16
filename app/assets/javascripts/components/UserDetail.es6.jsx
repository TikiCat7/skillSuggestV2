class UserDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {name:'',age:'',job:'', skills:[]},
    }
  }

  componentDidMount() {
    $.ajax({
      url: this.props.url+'/'+this.props.params.userId,
      dataType: 'json',
      cache: false,
      success: user => {
        this.setState({user:user})
      }
    })
  }

  render() {
    let unique = [...new Set(this.state.user.skills.map(skill => skill.name))];
    const skills = this.state.user.skills.map( skill => {
      const count = this.state.user.skills.filter( s => {
        if(s.name == skill.name) return s
      })
      return(
        <div key={skill.id}>
          <li> Skill Name: {skill.name} </li>
          <li> Skill Votes: {count.length} </li>
        </div>
          )
    })
    return(
      <div>
        User Detail for {this.state.user.name}
        <ul>
          <h2> Basics </h2>
          <li> Name: {this.state.user.name} </li>
          <li> Age: {this.state.user.age} </li>
          <li> Job: {this.state.user.job} </li>
          <h2> Skills </h2>
          {skills}
        </ul>
      </div>
    )
  }
}
