class SignUpForm extends React.Component {
  constructor(){
    super()
  }

  render() {
    return(
      <div>
        <div>Sign Up</div>
        Name: <input type='text' placeholder='enter Name'></input>
        Age: <input type='text' placeholder='enter Age'></input>
        Job: <input type='text' placeholder='enter Job'></input>
        <button type='submit'>Submit</button>
      </div>
    )
  }
}
