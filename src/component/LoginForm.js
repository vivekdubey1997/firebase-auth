import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Button, Form, Input, Space, Table } from "antd";
// import "./api.css";
import TableAntD from "./Table";
import { Link, useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [sendData, setSendData] = useState("");
  console.log(sendData);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:3200/", {
        name,
        phone,
        password,
      });

      if (response.status === 200) {
        setSendData(response.data);
      }
    } catch (error) {
      console.log(error);
    }
    // navigate("./TableAntD.js");
  };

  return (
    <>
      <Form className="main" onFinish={handleSubmit}>
        <Form.Item name="name" label="userName">
          <Input
            type="text"
            id="username"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Item>

        <Form.Item name="password" label="PASSWORD">
          <Input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Item>
        <Form.Item name="phone" label="Phone">
          <Input
            type="phone"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </Form.Item>
        <Form.Item>
          {/* <Link to="/table"> */}
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          {/* </Link> */}
        </Form.Item>
      </Form>
      <div>
        <TableAntD sendData={sendData} />
      </div>
    </>
  );
};

export default LoginForm;
