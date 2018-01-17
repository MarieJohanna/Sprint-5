import React from "react"
import { BrowserRouter, Route } from "react-router-dom"
import Formuser from "../components/formuser/formuser"
import Formadmin from "../components/formadmin/formadmin"
import Nav from "../components/nav"
import Faqlist from "../components/formuser/faqlist"
// import QList from "../components/formadmin/qlist"

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      questionAPI: []
    }
  }

  componentDidMount() {
    fetch("http://localhost:8080/questions").then(response => (
      response.json()
    )).then(json => {
      console.log(json)
      this.setState({ questionAPI: json })
    })
  }

  render() {
    return (
      <BrowserRouter>
      <div>
        <Nav />
        <Faqlist />
        <Route path="/formuser" exact component={Formuser} />
        <Route
          exact
          path="/formadmin"
          render={routeProps =>
            <Formadmin
            {...routeProps}
            questions={this.state.questionAPI} />
          } />
      </div>
      </BrowserRouter>
    )
  }

}

export default App
