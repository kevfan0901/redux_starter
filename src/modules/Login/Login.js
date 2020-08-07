import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Row, Col, Icon } from 'antd';
import { withTranslation } from 'react-i18next';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import Axios from '../../utils/Api';
import { encrypt } from '../../utils/AESUilts';
import { validateEmpty } from '../../utils/FormValidate';
// import { message } from '../../utils/index';
import Path from '../../routes/PathConstants';
import FormInput from '../../components/Form/FormInput';
import './Login.css';

const FormItem = Form.Item;

class LoginPage extends React.Component {
  handleLogin = (data) => {
    const {
      history,
    } = this.props;
    const postData = {
      username: data.username,
      password: encrypt(data.password),
    };
    // Axios.post('/api/auth/userLogin', postData)
    //   .then((res) => {
    //     const { results } = res.data;
    //     if (results.status_code === 200) {
    //       sessionStorage.setItem('userData', JSON.stringify({
    //         name: data.username,
    //         ...results,
    //       }));
    //       delete Axios.defaults.headers.common.Authorization;
    //       Axios.defaults.headers.common.Authorization = results.token;
    //       history.push(Path.PRODUCTMANAGEMENT);
    //     } else message.error(results.status_msg);
    //   });
    // 沒有api所以先這樣寫
    delete Axios.defaults.headers.common.Authorization;
    Axios.defaults.headers.common.Authorization = postData.password;
    sessionStorage.setItem('userData', JSON.stringify({
      username: postData.email,
      token: postData.password,
    }));
    history.push(Path.PRODUCTMANAGEMENT);
  };

  render() {
    const {
      t,
      handleSubmit,
    } = this.props;

    return (
      <div className="backgroundImg" style={{ height: '100vh' }}>
        <div className="backgroundPatten">
          <div className="backgroundBottom" style={{ height: '100vh' }}>
            <div className="login-form">
              <div className="login-title"> Wicanvas Wedding</div>
              <form onSubmit={handleSubmit(this.handleLogin)}>
                <Row>
                  <Col span={24} offset={8} style={{ fontSize: '24px', margin: '60px auto 30px auto', textAlign: 'center' }}>User Login</Col>
                </Row>
                <FormItem>
                  <Field name="username" component={FormInput} validate={validateEmpty} />
                  <Icon type="user" style={{ position: 'absolute', top: '10px', right: '12px' }} />
                </FormItem>
                <FormItem>
                  <Field name="password" component={FormInput} type="password" autoComplete="on" validate={validateEmpty} />
                  <Icon type="lock" style={{ position: 'absolute', top: '10px', right: '12px' }} />
                </FormItem>
                <FormItem>
                  <Button size="large" htmlType="submit" className="login-form-button">
                    {t('Loing')}
                  </Button>
                </FormItem>
                <FormItem style={{ textAlign: 'center' }}>
                  Forgot <a id="login_forget_psw">Password</a> ?
                </FormItem>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

LoginPage.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};
LoginPage.defaultProps = {

};

const reduxFrom = reduxForm({
  form: 'loginFrom',
});
const reduxHook = connect(
  () => ({
    initialValues: {
      username: '',
      password: '',
    },
  }),
);
export default compose(
  reduxHook,
  reduxFrom,
  withTranslation(),
)(LoginPage);
