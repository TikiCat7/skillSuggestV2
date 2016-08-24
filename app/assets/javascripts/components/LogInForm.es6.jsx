class LogInForm extends React.Component {
  constructor() {
    super()
    this.state = {
      formName:'',
      formPass:''
    }
    this.handleLogin = this.handleLogin.bind(this)
    this.handleNameChange = this.handleNameChange.bind(this)
    this.handlePassChange = this.handlePassChange.bind(this)
  }

  handleNameChange(event) {
    event.preventDefault()
  }

  handlePassChange(event) {
    event.preventDefault()
  }

  handleLogin(event) {
    event.preventDefault()
    const name = this.refs.session_name.value
    const password = this.refs.session_password.value
    const body = {
      //authenticity_token:this.props.authenticity_token,
      name:name,  //axiosで送る時はjsonだから session[name] じゃなくて name
      password:password
    }
    axios.post('/login',body)
      .then( response => {
        console.log(response)
        const user = {
          name:response.data.name,
          id:response.data.id
        }
      this.props.handleUserUpdate(user)
      location.href = `/#/user/${response.data.id}`
    })
    .catch(error => {
      console.log(error)
    })
  }

  render(){
    return(
      <form acceptCharset="UTF-8" onSubmit={this.handleLogin}>
        <input name="utf8" type="hidden" value="&#x2713;" />
        <input name="authenticity_token" type="hidden" value={this.props.authenticity_token} />
        <label htmlFor="session_name">Name</label>
        <input ref="session_name" className="form-control" id="session_name" name="session[name]" type="text" />
        <label htmlFor="session_password">Password</label>
        <input ref="session_password" id="session_password" name="session[password]" type="password" />
        <input className="btn btn-primary" name="commit" type="submit" value="Log in" />
      </form>
    )
  }
}
