import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import { Link, withRouter } from 'react-router-dom';
import PATH from '../../routes/PathConstants';

const StyleMenu = styled.div`
  text-align: center;
  border-bottom: 2px solid #b2b2b2;
`;

const StyleSpan = styled.span`
  margin: 15px 30px;
  display: inline-block;
  a {
    color: #525252;
    transition: 0.2s all ease;
    padding-bottom: 5px;
    border-bottom: 2px solid transparent;
  }
  a:hover {
    color: #525252;
  }
  ${(props) => props.border && css`
    a {
      border-color: #fb387a;
    }
  `}
`;

const MenuList = [{
  path: PATH.PRODUCTMANAGEMENT,
  name: 'Product management',
}, {
  path: PATH.ALBUMMANAGEMENT,
  name: 'Album management',
}, {
  path: PATH.ACCOUNTMANAGEMENT,
  name: 'Account management',
}];

class Menu extends Component {
  render() {
    const { location } = this.props;
    return (
      <StyleMenu>
        {MenuList.map((item) => (
          <StyleSpan
            key={item.path}
            border={location.pathname.indexOf(item.path) >= 0}
          >
            <Link to={item.path}>{item.name}</Link>
          </StyleSpan>
        ))}
      </StyleMenu>
    );
  }
}

export default withRouter(Menu);
