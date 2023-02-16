import "antd/dist/antd.css";
import "./App.css";
import { Button, Table, Modal, Input, DatePicker, Form } from "antd";
import { useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import moment from "moment";

function App() {
  const [dataSource, setDataSource] = useState([
    {
      created: "2022-01-01",
      title: "Task 1",
      description: "Description 1",
      dueDate: "2022-01-08",
      key: "1",
    },
    {
      created: "2022-01-02",
      title: "Task 2",
      description: "Description 2",
      dueDate: "2022-01-09",
      key: "2",
    },
    {
      created: "2022-01-03",
      title: "Task 3",
      description: "Description 3",
      dueDate: "2022-01-10",
      key: "3",
    },
    {
      created: "2022-01-04",
      title: "Task 4",
      description: "Description 4",
      dueDate: "2022-01-11",
      key: "4",
    },
  ]);
  const columns = [
    {
      title: "Timestamp created",
      dataIndex: "created",
      render: (text) => {
        return <span>{text}</span>;
      },
    },
    {
      title: "Title",
      dataIndex: "title",
      render: (text, record) => {
        return (
          <Input
            value={text}
            onChange={(e) => {
              let newData = [...dataSource];
              let index = newData.findIndex((item) => record.key === item.key);
              if (index > -1) {
                newData[index].title = e.target.value;
                setDataSource(newData);
              }
            }}
            maxLength={100}
            required
          />
        );
      },
    },
    {
      title: "Description",
      dataIndex: "description",
      render: (text, record) => {
        return (
          <Input.TextArea
            value={text}
            onChange={(e) => {
              let newData = [...dataSource];
              let index = newData.findIndex((item) => record.key === item.key);
              if (index > -1) {
                newData[index].description = e.target.value;
                setDataSource(newData);
              }
            }}
            maxLength={1000}
            required
          />
        );
      },
    },
    {
      title: "Due Date",
      dataIndex: "dueDate",
      render: (text, record) => {
        return (
          <DatePicker
            value={text ? moment(text, "YYYY-MM-DD") : null}
            onChange={(date, dateString) => {
              let newData = [...dataSource];
              let index = newData.findIndex((item) => record.key === item.key);
              if (index > -1) {
                newData[index].dueDate = dateString;
                setDataSource(newData);
              }
            }}
          />
        );
      },
    },
    {
      title: "Actions",
      render: (text, record) => (
        <Button onClick={() => handleDelete(record.key)} danger>
          Delete
        </Button>
      ),
    },
  ];
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();
  const handleOk = () => {
    form.validateFields().then((values) => {
      const newData = {
        created: moment().format("YYYY-MM-DD"),
        title: values.title,
        description: values.description,
        dueDate: moment(values.dueDate).format("YYYY-MM-DD"),
        key: (dataSource.length + 1).toString(),
      };
      setDataSource([...dataSource, newData]);
      setModalVisible(false);
      form.resetFields();
    });
  };

  const handleDelete = (key) => {
    setDataSource(dataSource.filter((item) => item.key !== key));
  };

  const handleSearch = (value) => {
    const filteredData = dataSource.filter(
      (item) =>
        item.title.toLowerCase().includes(value.toLowerCase()) ||
        item.description.toLowerCase().includes(value.toLowerCase()) ||
        item.created.toLowerCase().includes(value.toLowerCase()) ||
        item.dueDate.toLowerCase().includes(value.toLowerCase())
    );
    setDataSource(filteredData);
  };

  const handleReset = () => {
    setDataSource([
      {
        created: "2022-01-01",
        title: "Task 1",
        description: "Description 1",
        dueDate: "2022-01-08",
        key: "1",
      },
      {
        created: "2022-01-02",
        title: "Task 2",
        description: "Description 2",
        dueDate: "2022-01-09",
        key: "2",
      },
      {
        created: "2022-01-03",
        title: "Task 3",
        description: "Description 3",
        dueDate: "2022-01-10",
        key: "3",
      },
      {
        created: "2022-01-04",
        title: "Task 4",
        description: "Description 4",
        dueDate: "2022-01-11",
        key: "4",
      },
    ]);
  };

  return (
    <div className="App">
      <div className="header">
        <Input
          prefix={<SearchOutlined />}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search tasks"
          allowClear
        />
        <Button onClick={() => setModalVisible(true)}>New Task</Button>
        <Button onClick={() => handleReset()}>Reset</Button>
      </div>
      <Table dataSource={dataSource} columns={columns} />
      <Modal
        title="Create a new task"
        visible={modalVisible}
        onCancel={() => {
          setModalVisible(false);
          form.resetFields();
        }}
        onOk={handleOk}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="title"
            label="Title"
            rules={[
              { required: true, message: "Please input the title of the task" },
            ]}
          >
            <Input maxLength={100} />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[
              {
                required: true,
                message: "Please input the description of the task",
              },
            ]}
          >
            <Input.TextArea maxLength={1000} />
          </Form.Item>
          <Form.Item
            name="dueDate"
            label="Due Date"
            rules={[{ required: true, message: "Please select a due date" }]}
          >
            <DatePicker />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default App;

