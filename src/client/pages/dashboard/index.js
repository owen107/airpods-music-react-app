import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import { isClient } from '../../shared/utils';
import { connect } from 'react-redux';
import * as CommonActions from '../../actions/common';
import { bindActionCreators } from 'redux';
import MusicPlayer from '../../components/music_player/';
import playlist from '../../components/music_player/playlist';
import profileSrc from './images/profile.png';
import './styles.scss';

class Dashboard extends Component {

  componentWillMount() {
    if (isClient()) {
      const token = window.localStorage.getItem('jwt');
      this.props.onLoad(token ? window.localStorage.getItem('username') : null, token);
    }
  }

  renderPlaylists(playlist) {
    return playlist.map(({title}, index) => {
      return (
        <li key={`music-${index}`}>{`0${index + 1}`} {title}</li>
      );
    });
  }

  render() {
    const {appLoaded, currentUser, onLogout} = this.props;
    let loggedInClass = currentUser ? 'loggedin' : '';

    return (
      <div>
        <Helmet title="Airpods Muisc Dashboard" />

        <div className="dashboard-music-app">

          { currentUser ? (
            <div styleName="playlist-section">
              <p styleName="logout" onClick={onLogout}>
                <a styleName="logout-link">Logout</a>
              </p>
              <div styleName="playlist-container" className="align-right">
                <p>PlayList</p>
                <ul>
                  { this.renderPlaylists(playlist) }
                </ul>
              </div>
            </div>
            ) : null }

          <div styleName="dashboard-bg">
            <div styleName={`vinyl ${loggedInClass}`}></div>
            <div styleName={`main-contents ${loggedInClass}`}>

            { currentUser ?
              <div styleName="profile-container">
                <img src={profileSrc} alt="Profile Image" />
                <p styleName="username" className="align-center">{currentUser}</p>
              </div> : null }

              <div styleName="welcome-message">
                <p>Hello, {currentUser ? currentUser : null}</p>
                <p>Welcome to Airpods’ music!</p>
              </div>

            { currentUser ? null :
              <div className="signin-signup-section">
                <Link className="align-center" styleName="signin-btn" to="login">Sign In</Link>
                <p styleName="new-here">New here? <Link styleName="signup-link" to="signup">Sign Up</Link></p>
              </div> }

            { currentUser ?
              <MusicPlayer playlist={playlist} autoplay={true} /> : null }
            </div>

            <div styleName="airpods-bg"></div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { ...state.common };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(CommonActions, dispatch);
}

export default {
  component: connect(mapStateToProps, mapDispatchToProps)(Dashboard)
};