import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

export const MiddleText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: rgba(31, 69, 100, 1);
  font-size: 16px;
`;


function LoadingPage() {
  const { t } = useTranslation();
  return (
    <MiddleText>{t('COMMON.LOADING')}...</MiddleText>
  );
}

export default React.memo(LoadingPage);
