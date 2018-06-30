import React, {Component} from 'react';
import './styles.scss';

class ErrorMessage extends Component {
  render() {
    const { errors } = this.props;
    if (errors) {
      return (
        <ul styleName="error-messages" className="align-center">
          {
            Object.keys(errors).map(key => {
              return (
                <li styleName="error" key={key}>
                  <i className="fa fa-warning"></i>
                  {this.toCaptailizeErrorKey(key)} {errors[key]}
                </li>
              );
            })
          }
        </ul>
      )
    } else {
      return null;
    }
  }

  toCaptailizeErrorKey(key) {
    if (key && key.length >= 1) {
      return `${key.charAt(0).toUpperCase()}${key.substr(1)}`;
    }
  }
}

export default ErrorMessage;