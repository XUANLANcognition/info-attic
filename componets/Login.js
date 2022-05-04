import { Form, Input, Button, Checkbox, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";

import axios from "axios";

import parseCookies from "../pages/api/parsecookies";

export default function IALogin(props) {
  const [cookies, setCookie] = useCookies(["user_access_token", "user_refresh_token"]);
  const router = useRouter();

  const onFinish = (values) => {
    axios
      .post("http://1.15.7.160:8080/token/", {
        username: values.username,
        password: values.password,
      })
      .then(function (response) {
        setCookie("user_access_token", response.data.access, { path: "/" });
        setCookie("user_refresh_token", response.data.refresh, { path: "/" });
        console.log(cookies);
        message.success("登录成功");
        router.back()
      })
      .catch(function (error) {
        console.log("error");
        message.error("帐号或密码错误");
      });
  };

  return (
    <div style={{ maxWidth: "300px" }}>
      <Form
        name="normal_login"
        className="login-form"
        onFinish={onFinish}
        initialValues={{ remember: true }}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your Username!" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <a className="login-form-forgot" href="">
            Forgot password
          </a>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
          Or <a href="">register now!</a>
        </Form.Item>
      </Form>
    </div>
  );
}
