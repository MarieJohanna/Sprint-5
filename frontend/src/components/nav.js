import React from "react"
import { Link } from "react-router-dom"

export default class Nav extends React.Component {

  render() {
    return (
      <div className="Nav">
        {/* <button> <Link to="/formuser"> Formuser </Link></button> */}
        <button> <Link to="/formadmin"> Formadmin </Link></button>
      </div>
    )
  }
}
