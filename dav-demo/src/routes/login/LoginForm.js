import React from 'react';
import { connect } from 'dva';
import { Form, Input, Icon, Button, Checkbox } from 'antd';
import styles from './LoginForm.css';

const FormItem = Form.Item;

class LoginForm extends React.Component {

  state = {
    checked: true,
    disabled: false,
  };

  handleSubmit = (e) => {
    console.log('handleSubmit');
    alert('login sucess!!!');
    window.location = `${location.origin}/`;
  }

  render() {
    return (
      <div className={styles.loginWrap}>
        <div className={styles.LoginTitle}>My Login</div>
        <Form onSubmit={this.handleSubmit} className={styles.loginForm}>
          <FormItem required="true" validateStatus="validating">
            <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Username" />
          </FormItem>
          <FormItem required="true" validateStatus="validating">
            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} placeholder="Password" />
          </FormItem>
          <FormItem>
            <Checkbox checked={this.state.checked} disabled={this.state.disabled}>
              Remember me
            </Checkbox>
            <a className={styles.loginFormForgot} href="">Forgot password</a>
            <Button type="primary" htmlType="submit" className={styles.loginFormButton}>
              Log in
            </Button>
            Or <a href="">register now!</a>
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default connect()(LoginForm);
