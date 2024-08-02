import { Button, Checkbox, Divider, Form, Input, Typography, notification } from "antd";
const { Title, Text } = Typography;

import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from '@react-oauth/google';
import { useDispatch, useSelector } from "react-redux";

import axios from "../../../api";
import { LOADING, LOGIN, ERROR } from "../../../redux/actions/action-types";

import TelegramLoginButton from 'telegram-login-button'

const Login = () => {
  const navigate = useNavigate(); // to navigate
  const { loading } = useSelector((state) => state); // to get the loading state
  const dispatch = useDispatch(); // to dispatch actions
  const [form] = Form.useForm(); // to clear the form

  const onFinish = async (values) => {
    try {
      dispatch({ type: LOADING }); // to start the loading
      const { data } = await axios.post("/auth/login", values); // to send the login request
      dispatch({ type: LOGIN, token: data.payload.token, user: data.payload.user }); // to dispatch the login action

      // to navigate to the dashboard
      if(data?.payload?.token){
        navigate("/dashboard");
      }

      // to show a success notification
      notification.success({
        message: "Login Successful",
        description: "You have logged in successfully.",
      });
    } 
    catch (error) {
      dispatch({ type: ERROR }); // to stop the loading

      // to show an error notification
      notification.error({
        message: "Login Failed",
        description: error.message || "Something went wrong. Please try again.",
      });
    }
    
    // to clear the form
    form.resetFields();
  };

  // to handle the form submission failure
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
          onSuccess={async (credentialResponse) => {
            const decode = credentialResponse.credential.split(".")[1];
            const userData = JSON.parse(atob(decode));
            const user = {
              username: userData.name,
              password: userData.sub,
              first_name: userData.given_name,
            }

            const response = await axios.post("/auth/login", user);
            console.log(response.data);

            if (credentialResponse.credential) {
              dispatch({ type: LOGIN, token: response.data.payload.token, user: response.data.payload.user });

              if(response.data?.payload?.token){
                navigate('/dashboard')
              }

              notification.success({
                message: 'Login Successful',
                description: 'You have successfully logged in with Google!',
                placement: 'topRight',
              });
            }
          }}
          onError={() => {
            console.log('Login Failed');
            notification.error({
              message: 'Login Failed',
              description: 'There was an error during Google login. Please try again.',
              placement: 'topRight',
            });
          }}
          useOneTap
        />

        <TelegramLoginButton
          disabled={loading}
          botName={import.meta.env.VITE_TELEGRAM_BOT_USERNAME} // to set the bot name
          dataOnauth={user => console.log(user)}
        />
      </div>

      <Text className="text-center mt-[16px] block">Don't have an account? <Link to="/auth/register">Register</Link></Text>
    </Form>
  );
};

export default Login;
