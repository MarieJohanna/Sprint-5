import React from "react"
import "./style.css"
import QListItem from "./qlistitem"

class Formadmin extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      firstname: "",
      lastname: "",
      answer: "",
      selectedId: ""
    }
  }

  handleFirstname = event => {
    this.setState({
      firstname: event.target.value
    })
  }

  handleLastname = event => {
    this.setState({
      lastname: event.target.value
    })
  }

  handleAnswer = event => {
    this.setState({
      answer: event.target.value
    })
  }

//update this function with the id from the question Api
  handleQuestion = event => {
    this.setState({
      question: event.target.value
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    fetch("http://localhost:8080/answers", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state)
    }).then(response => (
      response.json()
    ))
  }

  handleChosen = id => {
    console.log(id)
    this.setState({
      selectedId: id
    })
  }

  render() {
    // shorthand version of const questions = this.props.questions
    const { questions } = this.props
    const notAnsweredQuestions = questions.filter((item => item.answered === false))
    const selectedQuestion = questions.find(question => (question._id === this.state.selectedId))
    console.log("selected question", selectedQuestion)
    return (
      <div className="answer">
        <form className="form-admin-question">
          <p>{this.props.questions.length}</p>

          <input type="text" value={selectedQuestion && selectedQuestion.title} />
          <input type="text" value={selectedQuestion && selectedQuestion.question} />
        </form>

        <h1>Add your answer</h1>
        <form className="form-admin-answer" onSubmit={this.handleSubmit}>
          <input type="text" value={this.state.firstname} onChange={this.handleFirstname} placeholder="First name" />
          <input type="text" value={this.state.lastname} onChange={this.handleLastame} placeholder="Last name" />
          <input type="text" value={this.state.answer} onChange={this.handleAnswer} placeholder="Enter you answer" />
          <button>Add</button>
        </form>
        <div>
          {notAnsweredQuestions.map(item => (
            <QListItem
              handleChosen={this.handleChosen}
              id={item._id}
              question={item.question}
              title={item.title}
              category={item.category}
              firstname={item.firstname}
              email={item.email} />
          ))}
        </div>
      </div>
    )
  }
}

export default Formadmin
