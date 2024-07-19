import { Button, Checkbox, Divider, Form, Input, Typography, notification } from "antd";
const { Title, Text } = Typography;

import { useState } from "react";
import { Link } from "react-router-dom";
import { GoogleLogin } from '@react-oauth/google';
import { useDispatch } from "react-redux";

import axios from "../../../api";


const Login = () => {

  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const { data } = await axios.post("/auth/login", values);
      console.log(data);
      dispatch({ type: "LOGIN_USER", data });
      notification.success({
        message: "Login Successful",
        description: "You have logged in successfully.",
      });
    } 
    catch (error) {
      console.log(error);
      notification.error({
        message: "Login Failed",
        description: error.message || "Something went wrong. Please try again.",
      });
    } 
    finally {
      setLoading(false);
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
        <Button className="w-full" type="primary" htmlType="submit" loading={loading}>Login</Button>
      </Form.Item>
      <Divider><span className="text-gray-500">Or</span></Divider>
      <GoogleLogin
        onSuccess={credentialResponse => { console.log(credentialResponse) }}
        onError={() => { console.log('Login Failed') }}
      />
      <Text className="text-center mt-[16px] block">Don't have an account? <Link to="/auth/register">Register</Link></Text>
    </Form>
  );
};

export default Login;
