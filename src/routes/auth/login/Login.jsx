import { Button, Checkbox, Divider, Form, Input, Typography, notification } from "antd";
const { Title, Text } = Typography;

import TelegramLoginButton from 'telegram-login-button'

import { Link } from "react-router-dom";
import { GoogleLogin } from '@react-oauth/google';
import { useDispatch, useSelector } from "react-redux";

import axios from "../../../api";
import { LOADING, LOGIN, ERROR } from "../../../redux/actions/action-types";


const Login = () => {

  const { loading } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      dispatch({ type: LOADING });
      const { data } = await axios.post("/auth/login", values);
      dispatch({ type: LOGIN, token: data.payload.token, user: data.payload.user });

      notification.success({
        message: "Login Successful",
        description: "You have logged in successfully.",
      });
    } 
    catch (error) {
      dispatch({ type: ERROR });

      notification.error({
        message: "Login Failed",
        description: error.message || "Something went wrong. Please try again.",
      });
    }
    
    form.resetFields();
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      form={form}
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 24 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      layout="vertical"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      disabled={loading}
    >
      <Title className="text-center">Login</Title>
      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: "Please input your username!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{ span: 16 }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item
        wrapperCol={{ span: 24 }}
      >
        <Button disabled={loading} className="w-full" type="primary" htmlType="submit" loading={loading}>Login</Button>
      </Form.Item>
      <Divider><span className="text-gray-500">Or</span></Divider>

      <div className="w-full flex justify-center items-center flex-col gap-[10px]">
        <GoogleLogin
          disabled={loading}
          onSuccess={async (credentialResponse) => { 
              const decode = credentialResponse.credential.split(".")[1];
              const userData = JSON.parse(atob(decode));
              console.log(userData);
              const user = {
                username: userData.email,
                password: userData.sub,
                first_name: userData.name
              }
              const response = await axios.post("/auth/login", user);
              console.log(response.data);
            }
          }
          onError={() => { console.log("Login Failed") }}
        />

        <TelegramLoginButton
          disabled={loading}
          botName={import.meta.env.VITE_TELEGRAM_BOT_USERNAME}
          dataOnauth={user => console.log(user)}
        />
      </div>

      <Text className="text-center mt-[16px] block">Don't have an account? <Link to="/auth/register">Register</Link></Text>
    </Form>
  );
};

export default Login;
