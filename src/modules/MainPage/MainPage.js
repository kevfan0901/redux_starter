import React from 'react';
import styled from 'styled-components';
import { AppRoutes } from '../../routes/routes';
import Header from './Header';
import Menu from './Menu';

const StyleContent = styled.div`
  background-color: #ececec;
  min-height: calc(100vh - 94px);
`;

class MainPage extends React.PureComponent {
  render() {
    return (
      <div>
        <Header />
        <Menu />
        <StyleContent>
          <AppRoutes />
        </StyleContent>
      </div>
    );
  }
}

export default MainPage;
