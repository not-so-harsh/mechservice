import { Button, Checkbox, Form, Input } from 'antd';
import React, { useState } from 'react';
import Signup from './Signup';
import {Modal} from 'antd';



const App = () => {
  const onFinish = () => {
    console.log('Succes');
  };

  const onFinishFailed = () => {
    console.log('Failed:' );
  };
  const[isModalOpen,setCloseModal]=useState(false);
   
  const handleShow =(e)=> {
    e.preventDefault();
    setCloseModal(true);
  }
  const handleCancel =(e)=>{
    e.preventDefault();
    setCloseModal(false);
  }
  async function Login(data) {
    // onFinish
    // event.preventDefault();
    // let item = {email, password}
    let result = await fetch("https://apimech.herokuapp.com/user/login", {
      method:'POST',
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",  
        "Accept":'application/json' 
      },
    });
    result = await result.json();
    
    console.log(result)

    if (result.hasOwnProperty('token')){
      localStorage.setItem("user-info",JSON.stringify(result))
      
    }
    else{
      alert ( "User not found");
    }
  }

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={Login}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="email"
        name="email"
        rules={[{ required: true, message: 'Please input your email ID!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
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
      <Modal title="Please Register" open={isModalOpen} onCancel={handleCancel}>
        <Signup/>
        </Modal>
    </Form>
  );
};

export default App;