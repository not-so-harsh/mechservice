import { Button, Form, Input, Select, } from 'antd';
import React, { useState } from 'react';

//handle submit updates
const { Option } = Select;
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};
/* eslint-enable no-template-curly-in-string */
const App = ({onCancel}) => {
  async function signUp(data) {
    // let item = {  phone, email, password, userType }
    // console.warn(item)
    console.log(data)
    let result = await fetch("https://apimech.herokuapp.com/user/signup", {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        "Accept": 'application/json',

      }
    })
    result = await result.json();
    localStorage.setItem("user-info", JSON.stringify(result))

    if(localStorage.setItem){
      alert('Successfully registerd')
      onCancel()
    }
  }

  const [inputValues, setInputValue] = useState({
    name : '',
    phone: '',
    email: '',
    password: '',
    userType: '',
  });


  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      +91
    </Form.Item>
  );


  return (
    <Form {...layout} name="nest-messages" validateMessages={validateMessages} onFinish={signUp}>
      <Form.Item name='name' label="name" rules={[{ rtype: 'name' }]} >
        <Input />
      </Form.Item>
      <Form.Item name="email" label="email" rules={[{ type: 'email' }]}>
        <Input />
      </Form.Item>
      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }

              return Promise.reject(new Error('The two passwords that you entered do not match!'));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        name="userType"
        label="User-Type"
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please select User-Type!',
          },
        ]}
      >
        <Select placeholder="Please select User-Type">
          <Option value="user">User</Option>
          <Option value="mechanic">Mechanic</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="phone"
        label="Phone Number"
        rules={[
          {
            required: true,
            message: 'Please input your phone number!',
          },
        ]}
      >
        <Input
          addonBefore={prefixSelector}
          style={{
            width: '100%',
          }}
        />
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary" htmlType="submit" >
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default App;