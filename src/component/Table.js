import { Button, Form, Input, Space, Table } from "antd";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import qs from "qs";

function TableAntD({ sendData }) {
  const [userData, setUserData] = useState([]);
  const [count, setCount] = useState("");
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
  const getParams = (params) => ({
    result: params.pagination?.pageSize,
    page: params.pagination?.current,
    ...params,
  });
  useEffect(() => {
    console.log(qs.stringify(getParams(tableParams)), "check the sting11");
    axios
      .get(`http://localhost:3200?${qs.stringify(getParams(tableParams))}`)
      .then((data) => {
        console.log(data, "useEfeect call");
        setUserData(data.data.data);
        console.log(data.data.count, "table count");
        setCount(data?.data?.count);
        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            total: 50,
          },
        });
      });
  }, [sendData, JSON.stringify(tableParams)]);

  const handleTableChange = (pagination) => {
    setTableParams({ pagination });
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setUserData([]);
    }
  };

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    axios.get(`http://localhost:3200/?name=${selectedKeys}`).then((data) => {
      console.log(data.data, "search name");
    });
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
      <div>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),

    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      key: "name",
      title: "name",
      dataIndex: "name",
      ...getColumnSearchProps("name"),
    },
    {
      key: "password",
      title: "Password",
      dataIndex: "password",
    },
    {
      key: "phone",
      title: "Phone",
      dataIndex: "phone",
    },
  ];
  return (
    <div>
      <p>Total number of users:{count}</p>
      <Table
        rowKey={(record) => record.name}
        columns={columns}
        dataSource={userData}
        pagination={tableParams.pagination}
        onChange={handleTableChange}
      />
    </div>
  );
}

export default TableAntD;
