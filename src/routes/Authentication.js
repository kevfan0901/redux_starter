import { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PATH from './PathConstants';

class Authentication extends Component {
  componentDidMount() {
    this.checkLogin();
  }

  checkLogin = () => {
    const { location, history } = this.props;
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    if (userData) {
      if (location.pathname === '/') history.push(PATH.PRODUCTMANAGEMENT);
    } else if (location.pathname !== PATH.LOGIN)history.push(PATH.LOGIN);
  }

  render() {
    const { children } = this.props;
    return children;
  }
}

export default withRouter(Authentication);
