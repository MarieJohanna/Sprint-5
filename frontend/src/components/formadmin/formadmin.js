import React from "react"
import { Link } from "react-router-dom"
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
      <div className="adminpage">

        <div className="unanswered">
          <p>unanswered questions {this.props.questions.length}</p>
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

        <div className="admincontroller">
          <div className="answer">

            <input type="text" value={selectedQuestion && selectedQuestion.title} />
            <textarea id="admintextarea" type="text" value={selectedQuestion && selectedQuestion.question} />

            <h1>Add your answer</h1>
            <form id="marginminus" onSubmit={this.handleSubmit}>
              <input type="text" value={this.state.firstname} onChange={this.handleFirstname} placeholder="First name" />
              <input type="text" value={this.state.lastname} onChange={this.handleLastname} placeholder="Last name" />
              <textarea id="admintextarea" type="text" value={this.state.answer} onChange={this.handleAnswer} placeholder="Enter you answer" />
              <button>Add</button>
            </form>

          </div>
        </div>
      </div>
    )
  }
}

export default Formadmin
