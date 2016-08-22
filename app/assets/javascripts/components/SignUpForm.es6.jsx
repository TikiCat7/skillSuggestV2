class SignUpForm extends React.Component {
  constructor(){
    super()
  }

  render() {
    return(
      <div>
        <form role='form' acceptCharset="UTF-8" action='/api/users' method='post' className="new_user" id="new_user">
          <input name="utf8" type="hidden" value="&#x2713;" />
          <input type='hidden' name='authenticity_token' value={this.props.authenticity_token} />
          <div>
            Sign Up
          </div>
          <label htmlFor="user_name">Name</label>
          <input id="user_name" name="user[name]" type="text" />

          <label htmlFor="user_age">Age</label>
          <input id="user_age" name="user[age]" type="integer" />

          <label htmlFor="user_job">Job</label>
          <input id="user_job" name="user[job]" type="text" />

          <label htmlFor="user_password">Password</label>
          <input id="user_password" name="user[password]"
            type="password" />

          <label htmlFor="user_password_confirmation">Confirmation</label>
          <input id="user_password_confirmation"
            name="user[password_confirmation]" type="password" />

          <button type='submit'>Register Account</button>
        </form>
      </div>
    )
  }
}
