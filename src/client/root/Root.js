import React, { Component } from 'react';
import { isClient } from '../shared/utils';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import * as CommonActions from '../actions/common';
import { bindActionCreators } from 'redux';
import '../assets/global-styles/common.scss';

class Root extends Component {

  componentWillReceiveProps(nextProps) {
    if (nextProps.redirectTo) {
      this.props.history.push(nextProps.redirectTo);
      this.props.onRedirect();
    }
  }

  render() {
    const { children } = this.props;

    return (
      <div>
        {children}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    redirectTo: state.common.redirectTo
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(CommonActions, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Root));
