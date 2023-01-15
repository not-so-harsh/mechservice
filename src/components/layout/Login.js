import { Button, Checkbox, Form, Input } from "antd";
import React, { useContext, useState } from "react";
import Signup from "./Signup";
import { Modal } from "antd";
import { Redirect } from "react-router-dom";
import { userContext } from "../../context/userProvider";

const Login = ({ onCancel }) => {
  // const [loading, setLoading] = useState(false);
  const [isModalOpen, setCloseModal] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const { setUser } = useContext(userContext);

  const onFinishFailed = () => {
    console.log("Failed:");
  };

  const handleShow = (e) => {
    e.preventDefault();
    setCloseModal(true);
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setCloseModal(false);
  };

  async function login(data) {
    let result = await fetch("http://localhost:3001/user/login", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    result = await result.json();

    console.log(result);

    if (result.hasOwnProperty("token")) {
      setUser(result);
      localStorage.setItem("user-info", JSON.stringify(result));
      setRedirect(true);
      alert("log in successfully");
      onCancel();
    } else {
      alert("User not found");
    }
  }
  if (redirect) {
    return <Redirect to="/"></Redirect>;
  }

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={login}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="email"
        name="email"
        rules={[{ required: true, message: "Please input your email ID!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{ offset: 8, span: 16 }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
        <Button htmlType="submit" onClick={handleShow}>
          Signup
        </Button>
      </Form.Item>
      <Modal
        title="Please Register"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        // [
        //   <Button key="back" onClick={handleCancel}>
        //     Return
        //   </Button>,
        // ]
      >
        <Signup onCancel={() => setCloseModal(false)} />
      </Modal>
    </Form>
  );
};

export default Login;
