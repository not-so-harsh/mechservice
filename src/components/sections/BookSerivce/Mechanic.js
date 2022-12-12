import React, { useEffect, useState } from "react";
import { Space, Table } from "antd";
const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "phone",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Brand",
    dataIndex: "brand",
    key: "brand",
  },
  {
    title: "Model",
    dataIndex: "model",
    key: "model",
  },
  {
    title: "Fuel Type",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Service Type",
    dataIndex: "service type",
    key: "address",
  },
  {
    title: "Location",
    dataIndex: "location",
    key: "location",
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
];
const Data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
];

const App = () => {
  const [data, setData] = useState([]);

 const fetchData = async () => {
      const res = await fetch("http://localhost:3001/orders");
      const json = await res.json();
      setData(json.hits);
    };

  useEffect(() => {

    fetchData();
  });
  return (<Table className="mechdata" columns={columns} dataSource={data} /> )


};

export default App;
