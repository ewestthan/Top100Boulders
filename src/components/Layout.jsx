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
		<Layout
			className="site-layout"
			style={{ marginRight: 40, marginLeft: 40 }}
		>
			<Header
				style={{
					padding: 0,
					top: 0,
					zIndex: 4,
					height: 125,
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<Button
					style={{
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
				<img
					style={{
						height: 75,
						marginLeft: "auto",
						marginRight: "auto",
						width: 115,
					}}
					src={LongerLogo}
				/>
				<Button
					style={{
						marginLeft: "auto",
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
			<Content>{renderSwitch(content)}</Content>
		</Layout>
	);
};
export default Lay;
