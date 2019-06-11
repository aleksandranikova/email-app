import React, {Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Payments from './Payments';

class Header extends Component {
    renderContent() {
      console.log(this.props);
      switch (this.props.auth.auth) {        
        case null:
          return;
        case false:
          return (
            <li><a href="/auth/google">Login with Google</a></li>
          );
        default:
          return [
          <li key="1"><Payments/></li>,
          <li key="2" style={{ margin: '0 10px'}}>Credits: {this.props.auth.auth.credits}</li>,
          <li key="3"><a href="/api/logout">LogOut</a></li>
        ]
      }
    }
    render () {
        return (
            <nav>
            <div className="nav-wrapper">
              <Link 
              to={this.props.auth.auth ? '/surveys' : '/'} 
              className="brand-logo">AniApp</Link>
              <ul className="right">
                {this.renderContent()}
              </ul>
            </div>
          </nav>
        );
    }
}

function mapStateToProps({auth}) {
  return {
    auth: { auth }
  };
}

export default connect(mapStateToProps)(Header);