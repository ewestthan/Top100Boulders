import "../styling/Layout.css";
import {
	Button,
	Form,
	Input,
	Popconfirm,
	Table,
	Checkbox,
	InputNumber,
	Typography,
} from "antd";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as ReactLogo } from "../logo.svg";

import {
	HomeOutlined,
	MenuFoldOutlined,
	MenuUnfoldOutlined,
	NodeExpandOutlined,
	QuestionCircleOutlined,
	UploadOutlined,
	UserOutlined,
	VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import React, { useState } from "react";
import MainTable from "./MainTable";
const { Header, Sider, Content } = Layout;
const Lay = () => {
	const {
		token: { colorBgContainer },
	} = theme.useToken();

	return (
		<Layout>
			<Sider
				style={{
					overflow: "auto",
					height: "100vh",
					position: "fixed",
					left: 0,
					top: 0,
					bottom: 0,
					justifyContent: "center",
				}}>
				<ReactLogo
					style={{
						height: 50,

						// marginLeft,
						marginTop: 16,
						width: 200,
						// background: 'rgba(255, 255, 255, 0.2)',
					}}
				/>

				<Menu
					theme="dark"
					mode="inline"
					style={{
						marginTop: 30,
					}}>
					<Button
						style={{
							marginBottom: 20,
							marginLeft: 40,
							backgroundColor: "transparent",
							color: "#FE1C1E",
							border: "none",
							boxShadow: "none",
							fontWeight: 900,
							fontSize: 20,
						}}>
						<HomeOutlined twoToneColor="#eb2f96" /> Home
					</Button>
					<Button
						style={{
							marginBottom: 16,
							marginLeft: 40,
							backgroundColor: "transparent",
							color: "#FE1C1E",
							border: "none",
							boxShadow: "none",
							fontWeight: 900,
							fontSize: 20,
						}}>
						<Link to="/about">
							<QuestionCircleOutlined /> About{" "}
						</Link>
					</Button>
				</Menu>
			</Sider>

			<Layout
				className="site-layout"
				style={{
					marginLeft: 200,
				}}>
				<Header
					style={{
						padding: 0,
						top: 0,
						zIndex: 4,
					}}>
					<Button
						style={{
							float: "right",
							marginTop: 10,
							marginRight: 20,
							backgroundColor: "transparent",
							color: "#FE1C1E",
							border: "none",
							boxShadow: "none",
							fontWeight: 900,
							fontSize: 20,
						}}>
						<Link to="/login">
							<UserOutlined /> Login
						</Link>
					</Button>
				</Header>
				<Content style={{ marginRight: 30 }}>
					<MainTable />
				</Content>
			</Layout>
		</Layout>
	);
};
export default Lay;
