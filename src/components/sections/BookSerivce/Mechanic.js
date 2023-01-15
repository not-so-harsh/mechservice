import React, { useEffect, useState } from "react";
import { Space, Table } from "antd";
const columns = [
  {
    title: "Name",
    dataIndex: "Name",
    key: "Name",
  },
  {
    title: "Phone",
    dataIndex: "Phone",
    key: "Phone",
  },
  {
    title: "Address",
    dataIndex: "Address",
    key: "Address",
  },
  {
    title: "Brand",
    dataIndex: "Brand",
    key: "Brand",
  },
  // {
  //   title: "Model",
  //   dataIndex: "Model",
  //   key: "Model",
  // },
  {
    title: "Fuel",
    dataIndex: "Fuel",
    key: "Fuel",
  },
  {
    title: "Service",
    dataIndex: "Service",
    key: "Service",
  },
  // {
  //   title: "Location",
  //   dataIndex: "location",
  //   key: "location",
  // },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <a>Accept{record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
];
const App = () => {
  const [data, setData] = useState([]);

 const fetchData = async () => {
      const res = await fetch("http://localhost:3001/orders");
      const json = await res.json();
      setData(json.orders);
      console.log(json)
    };

  useEffect(() => {
    fetchData();
  },[]);
  return (<Table className="mechdata" columns={columns} dataSource={data} /> )


};

export default App;
