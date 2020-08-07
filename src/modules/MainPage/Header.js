import React, { Component } from 'react';
import styled from 'styled-components';
import { Icon, Menu, Dropdown } from 'antd';
import { Link } from 'react-router-dom';
import PATH from '../../routes/PathConstants';

const StyleContent = styled.div`
  background-color: #ececec;
`;

const StyleHeader = styled.div`
  text-align: center;
  font-size: 24px;
  line-height: 1.8;
`;

const StyleSetting = styled.div`
  position: absolute;
  right: 2%;
  top: 1%;
  font-size: 20px;
`;

class Header extends Component {
  render() {
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    const menu = (
      <Menu>
        <Menu.Item key="0" className="settingHover">
          <Link to={PATH.LOGIN}> Log out </Link>
        </Menu.Item>
      </Menu>
    );

    return (
      <div>
        <StyleContent>
          <StyleHeader>WiCanvas Wedding</StyleHeader>
          <StyleSetting>
            <Dropdown overlay={menu} trigger={['click']}>
              <div>Hi, {userData && userData.name}<Icon type="caret-down" /></div>
            </Dropdown>
          </StyleSetting>
        </StyleContent>
      </div>
    );
  }
}

export default Header;
