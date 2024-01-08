import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Col, Row, Upload, message } from "antd";
import JobConnectLogo from "../../../../assets/images/logo/logo2.jpeg";
import JobLogo from "../../../../assets/images/logo/job.png";
import SaveLogo from "../../../../assets/images/logo/save.png";

import { Avatar, Space } from "antd";
import {
  RiUploadCloud2Line,
  RiCheckboxCircleLine,
  RiCloseCircleLine,
} from "react-icons/ri";
import axiosInterceptor from "../../../../services/axiosInterceptor";
import { UserOutlined } from "@ant-design/icons";
import axios from "axios";

function Workspace() {
  const [actionUrl, setActionUrl] = useState([]);

  const user = useSelector((state) => state.auth?.user);
  console.log(user);

  return (
    <div>
      <Row>
        <Col span={4}>
          <img
            className="hp-logo"
            height={100}
            width={100}
            src={JobConnectLogo}
            alt="logo"
          />
        </Col>
        <Col span={20}>
          <Row> {user?.name}</Row>

          <Row>
            <Col span={12}>Location: {user?.location}</Col>
            <Col span={12}>Email: {user?.email}</Col>
          </Row>
        </Col>
      </Row>

      <Row
        style={{
          marginTop: 10,
          border: "1px black solid",
          alignItems: "center",
          padding: 10,
        }}
      >
        <Col span={4}>
          <img
            className="hp-logo"
            height={100}
            width={100}
            src={JobLogo}
            alt="logo"
          />
        </Col>
        <Col span={8}>
          <Row>2</Row>
          Applied Jobs
        </Col>
      </Row>

      <Row
        style={{
          marginTop: 10,
          border: "1px black solid",

          alignItems: "center",
          padding: 10,
        }}
      >
        <Col span={4}>
          <img
            className="hp-logo"
            height={200}
            width={100}
            src={SaveLogo}
            alt="logo"
          />
        </Col>
        <Col span={8}>
          <Row>2</Row>
          Saved Jobs
        </Col>
      </Row>
    </div>
  );
}

export default Workspace;
