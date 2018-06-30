import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { isClient } from '../../shared/utils';
import { Link, withRouter } from 'react-router-dom';
import ErrorMessage from '../../components/error_message/';
import { bindActionCreators } from 'redux';
import { createBrowserHistory } from 'history';
import * as AuthActions from '../../actions/auth';
import '../login/styles.scss';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.changeEmail = event => {
      this.props.onChangeEmail(event.target.value)
    }
    this.changePassword = event => this.props.onChangePassword(event.target.value)
    this.changeUsername = event => this.props.onChangeUsername(event.target.value)
    this.submitForm = (username, email, password) => event => {
      event.preventDefault();
      this.props.onSignupSubmit(username, email, password);
    }
  }

  componentWillMount() {
    if (isClient()) {
      const token = window.localStorage.getItem('jwt');
      if (token) {
        // Redirect back to dashboard if logged in
        this.props.history.push('/');
      }
    }
  }

  componentWillUnmount() {
    this.props.onSignupUnload();
  }

  render() {
    const {email, password, username} = this.props;

    return (
      <div>
        <Helmet title="Signup" />

        <div className="signup-page auth-bg">
          <div className="main-container">
            <h1 className="page-title align-center">Welcome to Airpods Music</h1>

            <div className="auth-form">

              <ErrorMessage errors={this.props.errors} />

              <form onSubmit={this.submitForm(username, email, password)}>
                <p className="form-title">Sign Up</p>

                <div className="form-group">
                  <input
                    className="form-input"
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={this.changeUsername}/>
                </div>

                <div className="form-group">
                  <input
                    className="form-input"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={this.changeEmail}/>
                </div>

                <div className="form-group">
                  <input
                    className="form-input"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={this.changePassword}/>
                </div>

                <button
                  className="submit-btn"
                  type="submit"
                  disabled={this.props.inProgress}>
                  Sign up
                </button>
              </form>

              <p className="align-center">
                <Link to="login" className="auth-texts">Already have one? Sign In here</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { ...state.auth };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(AuthActions, dispatch);
}

export default {
  component: withRouter(connect(mapStateToProps, mapDispatchToProps)(Signup))
};