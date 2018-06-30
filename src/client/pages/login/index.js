import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { isClient } from '../../shared/utils';
import ErrorMessage from '../../components/error_message/';
import { bindActionCreators } from 'redux';
import { createBrowserHistory } from 'history';
import * as AuthActions from '../../actions/auth';
import './styles.scss';

class Login extends Component {
  constructor(props) {
    super(props);
    this.changeEmail = event => this.props.onChangeEmail(event.target.value)
    this.changePassword = event => this.props.onChangePassword(event.target.value)
    this.submitForm = (email, password) => event => {
      event.preventDefault();
      this.props.onLoginSubmit(email, password);
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
    this.props.onLoginUnload();
  }

  render() {
    const { email, password } = this.props;

    return (
      <div>
        <Helmet title="Login" />

        <div className="login-page auth-bg">
          <div className="main-container">
            <h1 className="page-title align-center">Welcome to Airpods Music</h1>

            <div className="auth-form">

              <ErrorMessage errors={this.props.errors} />

              <form onSubmit={this.submitForm(email, password)}>
                <p className="form-title">Sign In</p>

                <div className="form-group">
                  <input
                    className="form-input"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={this.changeEmail} />
                </div>

                <div className="form-group">
                  <input
                    className="form-input"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={this.changePassword} />
                </div>

                <button
                  className="submit-btn"
                  type="submit"
                  disabled={this.props.inProgress}>
                  Sign In
                </button>
              </form>

              <p className="align-center">
                <Link to="signup" className="auth-texts">Don't have an account? Create one now.</Link>
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
  component: withRouter(connect(mapStateToProps, mapDispatchToProps)(Login))
};