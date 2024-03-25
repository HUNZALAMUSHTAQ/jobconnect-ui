import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Col, Row, Upload, message } from "antd";
import JobConnectLogo from "../../../../assets/images/logo/logo2.jpeg";
import JobLogo from "../../../../assets/images/logo/job.png";
import SaveLogo from "../../../../assets/images/logo/floppy-disk.svg";
import BriefCaseIcon from "../../../../assets/images/logo/briefcase.png";
import { Avatar, Space } from "antd";
import {
  RiUploadCloud2Line,
  RiCheckboxCircleLine,
  RiCloseCircleLine,
} from "react-icons/ri";
import axiosInterceptor from "../../../../services/axiosInterceptor";
import { UserOutlined } from "@ant-design/icons";
import axios from "axios";
import { Bar, Pie } from "@ant-design/charts"; // Import the Bar chart component

function Workspace() {
  const [actionUrl, setActionUrl] = useState([]);
  const user = useSelector((state) => state.auth?.user);
  const userRole = user.role;

  // Sample data for user applications chart
  const userApplicationsData = [
    { job: "Job 1", applications: 4 },
    { job: "Job 2", applications: 2 },
    { job: "Job 3", applications: 1 },
    { job: "Job 4", applications: 3 },
    { job: "Job 5", applications: 5 },
    { job: "Job 6", applications: 2 },
    { job: "Job 7", applications: 3 },
  ];

  // Sample data for company applications chart
  const companyApplicationsData = [
    { job: "Job 1", applicants: 10 },
    { job: "Job 2", applicants: 6 },
    { job: "Job 3", applicants: 7 },
    { job: "Job 4", applicants: 3 },
    { job: "Job 5", applicants: 12 },
    { job: "Job 6", applicants: 9 },
    { job: "Job 7", applicants: 4 },
  ];
  // Config for the charts
  const barConfig = {
    data: userRole === "user" ? userApplicationsData : companyApplicationsData,
    xField: "job",
    yField: userRole === "user" ? "applications" : "applicants",
    xAxis: {
      label: {
        autoRotate: true,
      },
    },
    yAxis: {},
  };

  // Config for the pie charts
  const pieConfig = {
    appendPadding: 10,
    data: userRole === "user" ? userApplicationsData : companyApplicationsData,
    angleField: userRole === "user" ? "applications" : "applicants",
    colorField: "job",
    radius: 0.8,
    interactions: [{ type: "pie-legend-active" }, { type: "element-active" }],
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", rowGap: "1.5rem" }}>
      <Row>
        <Col span={2}>
          <img
            style={{
              width: "4rem",
              borderRadius: "50%",
            }}
            src={JobConnectLogo}
            alt="logo"
          />
        </Col>
        <Col span={22}>
          <Row> {user?.name}</Row>
          <Row>
            <Col span={12}>Location: {user?.location}</Col>
            <Col span={12}>Email: {user?.email}</Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col
          span={24}
          style={{ display: "flex", flexDirection: "column", rowGap: "0.5rem" }}
        >
          <Row
            style={{
              marginTop: 10,
              border: "1px solid #dadfe1",
              alignItems: "center",
              padding: 10,
              borderRadius: "12px",
            }}
          >
            <Col
              span={24}
              style={{
                display: "flex",
                alignItems: "center",
                columnGap: "1.5rem",
                cursor: "pointer",
              }}
            >
              <img style={{ width: "3.5rem" }} src={BriefCaseIcon} alt="logo" />
              <Row>
                2 <br /> Job Applications
              </Row>
            </Col>
          </Row>
          <Row
            style={{
              marginTop: 10,
              border: "1px solid #dadfe1",
              alignItems: "center",
              padding: 10,
              borderRadius: "12px",
            }}
          >
            <Col
              span={24}
              style={{
                display: "flex",
                alignItems: "center",
                columnGap: "1.5rem",
                cursor: "pointer",
              }}
            >
              <img style={{ width: "3.5rem" }} src={SaveLogo} alt="logo" />
              <Row>
                2 <br /> Total Job Applications
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
      {userRole === "user" && (
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Bar {...barConfig} />
          </Col>
          <Col span={12}>
            <Pie {...pieConfig} />
          </Col>
        </Row>
      )}
      {userRole === "company" && (
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Bar {...barConfig} />
          </Col>
          <Col span={12}>
            <Pie {...pieConfig} />
          </Col>
        </Row>
      )}
    </div>
  );
}

export default Workspace;
