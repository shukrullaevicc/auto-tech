import { Button, Checkbox, Form, Input, Typography, Divider, notification } from "antd";
const { Title, Text } = Typography;

import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

import axios from "../../../api";

const Register = () => {

  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const { data } = await axios.post("/auth", values);
      console.log(data);
      dispatch({ type: "REGISTER_USER", data });
      notification.success({
        message: "Registration Successful",
        description: "You have registered successfully.",
      });
    } 
    catch (error) {
      console.log(error);
      notification.error({
        message: "Registration Failed",
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
      <Title className="text-center">Register</Title>
      <Form.Item
        label="Firstname"
        name="first_name"
        rules={[
          {
            required: true,
            message: "Please input your firstname!",
          },
        ]}
      >
        <Input />
      </Form.Item>

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
        <Button className="w-full" type="primary" htmlType="submit" loading={loading}>Register</Button>
      </Form.Item>

      <Divider><span className="text-gray-500">Or</span></Divider>

      <GoogleLogin
        onSuccess={(credentialResponse) => { console.log(credentialResponse) }}
        onError={() => { console.log("Login Failed") }}
      />

      <Text className="text-center mt-[16px] block">Already have an account? <Link to="/auth">Login</Link></Text>
    </Form>
  );
};

export default Register;
