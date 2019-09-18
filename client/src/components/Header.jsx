import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Payments from "./Payments";

class Header extends Component {
  constructor() {
    super()
    this.state = { amount: undefined }
  }
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <li>
            <a href="/auth/google">Log in with Google</a>
          </li>
        );
      default:
        return [
          <li key="1">
            <input 
              style={{textAlign: "center", marginRight: "25px"}}
              placeholder='Enter amount to charge:' 
              value={this.state.amount}
              onChange={e => this.setState({amount: e.target.value})}
            />
          </li>,
          <li key="2">
            <Payments amount={this.state.amount}/>
          </li>,
          <li key="3" style={{ margin: "0 10px" }}>
            Credits: {this.props.auth.credits}
          </li>,
          <li key="4">
            <a href="/api/logout">Logout</a>
          </li>,
        ];
    }
  }
  render() {
    return (
      <nav className="blue">
        <div className="nav-wrapper">
          <Link to={this.props.auth ? "/products" : "/"} className="left brand-logo">
          
            <img src="https://everymatrix.com/wp-content/themes/em/img/everymatrix-logo-white.svg" alt="everymatrix" style={{padding: '5px'}}/>


          </Link>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            {this.renderContent()}
          </ul>
        </div>
      </nav>
    );
  }
}

export default connect(({ auth }) => {
  return { auth };
})(Header);
