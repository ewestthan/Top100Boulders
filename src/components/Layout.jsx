import "../styling/Layout.css";
import { Button } from "antd";
import { Link } from "react-router-dom";
import { ReactComponent as ReactLogo } from "../logo.svg";

import {
	HomeOutlined,
	QuestionCircleOutlined,
	UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React, { useEffect, useState } from "react";
import MainTable from "./MainTable";
import About from "./About";

const { Header, Sider, Content } = Layout;
const Lay = () => {
	const [content, setContent] = useState("home");
	useEffect(() => {}, [setContent]);
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
				<ReactLogo
					style={{
						height: 50,
						marginTop: 16,
						width: 200,
					}}
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
							marginLeft: 40,
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
							marginLeft: 40,
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
					{content == "home" ? <MainTable /> : <About />}
				</Content>
			</Layout>
		</Layout>
	);
};
export default Lay;
