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
    let skills = this.state.user.skills
    // get all unique skill names
    const unique = [...new Set(skills.map(skill => skill.name))];
    // restructure json object to include vote count & voters
    const finalSkills = unique.map(uniqueSkill => {
      let count = 0;
      let voters = [];
      for(let i =0; i<skills.length; i++) {
        if(skills[i].name == uniqueSkill) {
          count++;
          let voter = {name:skills[i].assignee_name, id:skills[i].assignee_id}
          voters.push(voter)
        }
      }
      let result = {skillName:uniqueSkill, voteCount:count,voters:voters}
      return result
    })
    
    skills2 = finalSkills.map( skill => {
      const allVoters = skill.voters.map( voter => {
        return(
            <li id={voter.id}>Voter: {voter.name}</li>
        )
      })

      return(
        <div>
          <li>Skill Name: {skill.skillName}</li>
          <li>Votes: {skill.voteCount}</li>
          <ul>
            {allVoters}
          </ul>
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
          {skills2}
        </ul>
      </div>
    )
  }
}
