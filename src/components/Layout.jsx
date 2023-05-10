import "../styling/Layout.css";
import { Button } from "antd";
import { Link } from "react-router-dom";
import { ReactComponent as ReactLogo } from "../logo.svg";
import LongerLogo from "../assets/Top100logowide.png";
import {
	HomeOutlined,
	QuestionCircleOutlined,
	UserOutlined,
	FileSyncOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React, { useEffect, useState } from "react";
import MainTable from "./MainTable";
import About from "./About";
import ChangeLog from "./ChangeLog";

const { Header, Sider, Content } = Layout;
const Lay = () => {
	const [content, setContent] = useState("home");
	useEffect(() => {}, [setContent]);

	function renderSwitch(param) {
		switch (param) {
			case "about":
				return <About />;
			case "changeLog":
				return <ChangeLog />;
			default:
				return <MainTable />;
		}
	}
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
				}}
			>
				{/* <LongerLogo
				style={{
					height: 50,
					marginTop: 16,
					width: 200,
				}}
				/> */}
				<img
					style={{
						height: 50,
						marginTop: 16,
						marginLeft: 50,
						width: 100,
					}}
					src={LongerLogo}
				/>
				<Menu
					theme="dark"
					mode="inline"
					style={{
						marginTop: 30,
					}}
				>
					<Button
						style={{
							marginBottom: 20,
							marginLeft: 15,
							backgroundColor: "transparent",
							color: "#FE1C1E",
							border: "none",
							boxShadow: "none",
							fontWeight: 900,
							fontSize: 20,
						}}
						onClick={() => setContent("home")}
					>
						<HomeOutlined twoToneColor="#eb2f96" /> Home
					</Button>
					<Button
						style={{
							marginBottom: 16,
							marginLeft: 15,
							backgroundColor: "transparent",
							color: "#FE1C1E",
							border: "none",
							boxShadow: "none",
							fontWeight: 900,
							fontSize: 20,
						}}
						onClick={() => setContent("about")}
					>
						<QuestionCircleOutlined /> About
					</Button>
					<Button
						style={{
							marginBottom: 16,
							marginLeft: 15,
							backgroundColor: "transparent",
							color: "#FE1C1E",
							border: "none",
							boxShadow: "none",
							fontWeight: 900,
							fontSize: 20,
						}}
						onClick={() => setContent("changeLog")}
					>
						<FileSyncOutlined /> Change Log
					</Button>
				</Menu>
			</Sider>

			<Layout
				className="site-layout"
				style={{
					marginLeft: 200,
				}}
			>
				<Header
					style={{
						padding: 0,
						top: 0,
						zIndex: 4,
					}}
				>
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
						}}
					>
						<Link to="/login">
							<UserOutlined /> Login
						</Link>
					</Button>
				</Header>
				<Content style={{ marginRight: 30 }}>
					{renderSwitch(content)}
				</Content>
			</Layout>
		</Layout>
	);
};
export default Lay;
