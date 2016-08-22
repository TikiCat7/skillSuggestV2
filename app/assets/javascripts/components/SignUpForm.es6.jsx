class SignUpForm extends React.Component {
  constructor(){
    super()
    this.state = {
      errorMessage:[]
    }
  }

  handleSubmit(event){
    event.preventDefault()
    const name = this.refs.user_name.value
    const age = this.refs.user_age.value
    const job = this.refs.user_job.value
    const password = this.refs.user_password.value
    const password_confirmation = this.refs.user_password_confirmation.value

    fetch('/api/users', {
      method: 'post',
      headers: {
        "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
      },
      body: `utf8=%E2%9C%93&authenticity_token=${this.props.authenticity_token}&user%5Bname%5D=${name}&user%5Bage%5D=${age}&user%5Bjob%5D=${job}&user%5Bpassword%5D=${password}&user%5Bpassword_confirmation%5D=${password_confirmation}`
    })
    .then(response => {
      if (response.status === 400) {
        response.json().then(object => {
        console.log('Something went wrong with creating a user: ')
        console.log(object.messages)
        this.setState({errorMessage:object.messages})
      })
      } else if (response.status === 200) {
          this.setState({errorMessage:[]})
          response.json().then(object => {
          console.log('User successfully created!')
          console.log(object)
          location.href = `/#/user/${object.id}`
        })
      }
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
        <form role='form' acceptCharset="UTF-8" action='/api/users' method='post' className="new_user" id="new_user" onSubmit={this.handleSubmit.bind(this)}>
          <input name="utf8" type="hidden" value="&#x2713;" />
          <input type='hidden' name='authenticity_token' value={this.props.authenticity_token} />
          <div>
            Sign Up
          </div>
          <label htmlFor="user_name">Name
            <input ref="user_name" id="user_name" name="user[name]" type="text" />
          </label>
          <label htmlFor="user_age">Age
            <input ref="user_age" id="user_age" name="user[age]" type="integer" />
          </label>
          <label htmlFor="user_job">Job
            <input ref="user_job" id="user_job" name="user[job]" type="text" />
          </label>
          <label htmlFor="user_password">Password
            <input ref="user_password" id="user_password" name="user[password]"
              type="password" />
          </label>
          <label htmlFor="user_password_confirmation">Confirmation
            <input ref="user_password_confirmation" id="user_password_confirmation"
              name="user[password_confirmation]" type="password" />
          </label>
          <button type='submit'>Register Account</button>
        </form>
      </div>
    )
  }
}
