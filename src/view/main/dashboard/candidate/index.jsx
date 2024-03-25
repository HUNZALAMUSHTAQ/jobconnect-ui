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

function Workspace() {
  const [actionUrl, setActionUrl] = useState([]);

  const user = useSelector((state) => state.auth?.user);
  console.log(user);

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
    </div>
  );
}

export default Workspace;
