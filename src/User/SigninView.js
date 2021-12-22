import { Form, Icon, Input, Button, Checkbox } from 'antd';
import React from 'react';
import {Redirect} from 'react-router-dom';
import { Link } from 'react-router-dom';

const FormItem = Form.Item;
export const fakeAuth = {
    isAuthenticated: false,
    authenticate(cb) {
    this.isAuthenticated = true
    setTimeout(cb, 100)
    },
    signout(cb) {
    this.isAuthenticated = false
    setTimeout(cb, 100)
    }
    }
class SigninForm extends React.Component {
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            redirectToReferrer: false,
            userName:'',
            password:''
        }
    }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }
  signIn = () => {
    fakeAuth.authenticate(() => {
    this.setState({ redirectToReferrer: true })
    })
    }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
        return (
               <Redirect to={from} />
                )
    }
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator('userName', {
            // rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" initialvalue="sdc880123"/>
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            // rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox>Remember me</Checkbox>
          )}
          <a className="login-form-forgot" href="">Forgot password</a>
          <Button type="primary" htmlType="submit" className="login-form-button" onClick={this.signIn}>
            Log in
          </Button>
          Or <Link to='/register'>Register now!</Link>
        </FormItem>
      </Form>
    );
  }
}
const SigninView = Form.create()(SigninForm);
export default SigninView;









