import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Upload,
  message,
  Space,
  Table,
  Tag,
  Button,
  Modal,
  Form,
  Input,
  Select,
  Row,
  Col,
} from "antd";
import {
  RiUploadCloud2Line,
  RiCheckboxCircleLine,
  RiCloseCircleLine,
  RiCloseFill,
} from "react-icons/ri";
import axiosInterceptor from "../../../../services/axiosInterceptor";

import axios from "axios";
import TextArea from "antd/lib/input/TextArea";

function JobPosts() {
  const [actionUrl, setActionUrl] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setdescription] = useState("");
  const [location, setlocation] = useState("");
  const [skills, setskills] = useState("");
  const [salary, setsalary] = useState(0);
  const [employmentType, setemploymentType] = useState("Full-time");
  const [requirements, setRequirements] = useState("");
  const [token, setToken] = useState(localStorage?.getItem("token"));
  const [Data, setData] = useState([]);

  const columns = [
    {
      title: "Job Title",
      dataIndex: "title",
      key: "title",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Applications",
      dataIndex: "appplications",
      key: "applications",
      render: (_, record) => {
        return (
          <Tag color={record?.appplications?.length > 0 ? "green" : "red"}>
            {record?.appplications?.length}
          </Tag>
        );
      },
    },
    {
      title: "Company",
      dataIndex: "company",
      key: "company",
    },
    {
      title: "Salary",
      dataIndex: "salary",
      key: "salary",
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => {
        console.log(record.id);
        return (
          <Space size="middle">
            <a>Edit</a>
            <a>Delete</a>
            {user?.role === "user" && (
              <a onClick={() => applyForJob(record.id)}>Apply</a>
            )}
          </Space>
        );
      },
    },
  ];

  const applyForJob = async (jobId) => {
    try {
      console.log(jobId, "asddddddd");
      const authToken = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      };

      const response = await axios.post(
        `http://localhost:3001/v1/jobpost/${jobId}/apply`, // Update with your actual API endpoint
        {},
        config
      );

      if (response.status === 201) {
        message.success("Job application successful");
        // Optionally, you can trigger a refetch of job posts or update the UI accordingly.
        // refetchJobPosts();
      } else {
        message.error("Cannot Reapply for a Job");
      }
      fetchData()
    } catch (error) {
      console.error("Error applying for job:", error?.message);
      message.error("Something went wrong. Please try again.");
    }
  };
  const fetchData = async () => {
    try {
      const authToken = await localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${authToken}` },
      };

      const response = await axios.get(
        `http://localhost:3001/v1/jobpost`,
        config
      );
      console.log(response);
      setData(response?.data);
    } catch (error) {
      console.error("Error fetching projects:", error?.message);
    }
  };

  const addJob = async () => {
    try {
      const authToken = await localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${authToken}` },
      };
      const jobdata = {
        title,
        salary,
        contactEmail: user?.email,
        company: user?.name,
        location,
        description,
        skills: skills?.split(" "),
        employmentType,
        requirements: requirements?.split(" "),
      };
      const response = await axios.post(
        `http://localhost:3001/v1/jobpost`,
        jobdata,
        config
      );
      console.log(response);
      fetchData();

      handleCancel();
    } catch (error) {
      console.error("Error fetching projects:", error?.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [token]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const user = useSelector((state) => state.auth?.user);
  console.log(user);

  return (
    <div>
      {user?.role == "company" && (
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: "1rem",
          }}
        >
          <Button type="primary" onClick={showModal}>
            Post Job
          </Button>
        </div>
      )}

      <Modal
        title="Add Job"
        width={800}
        centered
        visible={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        closeIcon={
          <RiCloseFill className="remix-icon text-color-black-100" size={24} />
        }
      >
        <Form layout="vertical" name="basic">
          <Row gutter={8}>
            <Col span={12}>
              <Form.Item label="Job Title" name="title">
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              {" "}
              <Form.Item label="Location" name="Location">
                <Input
                  value={location}
                  onChange={(e) => setlocation(e.target.value)}
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item label="Description" name="description">
            <TextArea
              rows={2}
              value={description}
              onChange={(e) => setdescription(e.target.value)}
            />
          </Form.Item>

          <Row gutter={8}>
            <Col span={12}>
              {" "}
              <Form.Item label="Skills" name="Skills">
                <Input
                  value={skills}
                  onChange={(e) => setskills(e.target.value)}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              {" "}
              <Form.Item label="Requirements" name="Requirements">
                <Input
                  value={requirements}
                  onChange={(e) => setRequirements(e.target.value)}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={8}>
            <Col span={12}>
              <Form.Item label="Salary" name="">
                <Input
                  value={salary}
                  onChange={(e) => setsalary(e.target.value)}
                  type="number"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              {" "}
              <Form.Item label="Employment Type" name="employmentType">
                <Select
                  defaultValue="Full-time"
                  options={[
                    { value: "Full-time", label: "Full-time" },
                    { value: "Part-time", label: "Part-time" },
                    { value: "Contract", label: "Contract" },
                    { value: "Internship", label: "Internship" },
                  ]}
                  value={employmentType}
                  onChange={(e) => setemploymentType(e)}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col md={12} span={24} className="hp-pr-sm-0 hp-pr-12">
              <Button block type="primary" htmlType="submit" onClick={addJob}>
                Add
              </Button>
            </Col>

            <Col md={12} span={24} className="hp-mt-sm-12 hp-pl-sm-0 hp-pl-12">
              <Button block onClick={handleCancel}>
                Cancel
              </Button>
            </Col>
          </Row>
        </Form>
      </Modal>
      <Table columns={columns} dataSource={Data} />
    </div>
  );
}

export default JobPosts;
