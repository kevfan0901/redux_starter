import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Input } from 'antd';
import { useTranslation } from 'react-i18next';

const StyleWarpper = styled.div`
  width: ${(props) => props.width || '100%'};
  position: relative;
  > input {
    width: 100%;
  }
  > span {
    position: absolute;
    left: 0;
    top: 100%;
    font-size: 10px;
    color: red;
    line-height: 10px;
    letter-spacing: -0.5px;
  }
`;

const FormInput = (props) => {
  const {
    input,
    disabled,
    type,
    width,
    meta: { touched, error },
  } = props;
  const { t } = useTranslation();
  return (
    <StyleWarpper width={width} hasHint={touched && error}>
      <Input
        name={input.name}
        onFocus={input.onFocus}
        onBlur={input.onBlur}
        value={input.value}
        onChange={input.onChange}
        disabled={disabled}
        type={type || 'text'}
      />
      {touched && error && <span>{t(error)}</span>}
    </StyleWarpper>
  );
};


FormInput.propTypes = {
  input: PropTypes.shape(),
  disabled: PropTypes.bool,
  width: PropTypes.string,
  type: PropTypes.string,
  meta: PropTypes.shape(),
};
FormInput.defaultProps = {
  input: {},
  disabled: false,
  width: '',
  type: '',
  meta: {},
};

export default React.memo(FormInput);
