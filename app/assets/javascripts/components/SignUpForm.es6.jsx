class SignUpForm extends React.Component {
  constructor(){
    super()
    this.state = {
      errorMessage:[],
      formName:'',
      formAge:'',
      formJob:'',
      formPassword:'',
      formPassword_confirmation:''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleAgeChange = this.handleAgeChange.bind(this)
    this.handleJobChange = this.handleJobChange.bind(this)
    this.handlePasswordChange = this.handlePasswordChange.bind(this)
    this.handlePasswordConfirmationChange = this.handlePasswordConfirmationChange.bind(this)
  }

  handleNameChange(event) {
    event.preventDefault()
    this.setState({formName:event.target.value})
  }

  handleAgeChange(event) {
    event.preventDefault()
    this.setState({formAge:event.target.value})
  }

  handleJobChange(event) {
    event.preventDefault()
    this.setState({formJob:event.target.value})
  }

  handlePasswordChange(event) {
    event.preventDefault()
    this.setState({formPassword:event.target.value})
  }

  handlePasswordConfirmationChange(event) {
    event.preventDefault()
    this.setState({formPassword_confirmation:event.target.value})
  }

  handleSubmit(event){
    event.preventDefault()

    const body = {
      authenticity_token:this.props.authenticity_token,
      user: {
        name:this.state.formName,
        age:this.state.formAge,
        job:this.state.formJob,
        password:this.state.formPassword,
        password_confirmation:this.state.formPassword_confirmation
      }
    }

    axios.post('/api/users', body)
      .then(response => {
        console.log(response)
        const user = {
          name:response.data.name,
          id:response.data.id
        }
      this.props.handleUserUpdate(user)
      location.href = `/#/user/${response.data.id}`
      })
      .catch(err => {
        console.log(err)
      })
    }

  render() {
    const errorMessage = this.state.errorMessage.map((error,index) => {
          return (
            <li key={index}>{error}</li>
          )
        })

    return(
      <div>
        <div>
          {errorMessage}
        </div>
        <form role='form' acceptCharset="UTF-8" action='/api/users' method='post' className="new_user" id="new_user" onSubmit={this.handleSubmit}>
          <input name="utf8" type="hidden" value="&#x2713;" />
          <input type='hidden' name='authenticity_token' value={this.props.authenticity_token} />
          <div>
            Sign Up
          </div>
          <label htmlFor="user_name">Name
            <input ref="user_name" id="user_name" name="user[name]" type="text" onChange={this.handleNameChange} />
          </label>
          <label htmlFor="user_age">Age
            <input ref="user_age" id="user_age" name="user[age]" type="integer" onChange={this.handleAgeChange}/>
          </label>
          <label htmlFor="user_job">Job
            <input ref="user_job" id="user_job" name="user[job]" type="text" onChange={this.handleJobChange}/>
          </label>
          <label htmlFor="user_password">Password
            <input ref="user_password" id="user_password" name="user[password]"
              type="password" onChange={this.handlePasswordChange}/>
          </label>
          <label htmlFor="user_password_confirmation">Confirmation
            <input ref="user_password_confirmation" id="user_password_confirmation"
              name="user[password_confirmation]" type="password" onChange={this.handlePasswordConfirmationChange}/>
          </label>
          <button type='submit'>Register Account</button>
        </form>
      </div>
    )
  }
}
