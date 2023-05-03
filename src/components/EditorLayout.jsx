import "../styling/Layout.css";
import { Button } from "antd";
import { logout } from "../firebase/initFirebase";
import { ReactComponent as ReactLogo } from "../logo.svg";
import {
	UserOutlined,
	SaveOutlined,
	PlusCircleOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React, { useState } from "react";
import EditMainTable from "./EditMainTable";
const { Header, Sider, Content } = Layout;

const EditLay = () => {
	const [collapsed] = useState(false);
	const [addTrigger, setAddTrigger] = useState(0);
	const [writeTrigger, setWriteTrigger] = useState(0);

	return (
		<Layout>
			<Sider
				trigger={null}
				collapsible
				collapsed={collapsed}
				style={{
					overflow: "auto",
					height: "100vh",
					position: "fixed",
					left: 0,
					top: 0,
					bottom: 0,
				}}
			>
				<ReactLogo
					style={{
						height: 50,
						marginTop: 16,
						width: 200,
					}}
				/>
				<Menu theme="dark" mode="inline" style={{ marginTop: 50 }}>
					<Button
						onClick={() => {
							setWriteTrigger((writeTrigger) => writeTrigger + 1);
						}}
						type="primary"
						style={{
							marginBottom: 16,
							marginLeft: 20,
							backgroundColor: "transparent",
							color: "#FE1C1E",
							border: "none",
							boxShadow: "none",
							fontWeight: 900,
							fontSize: 20,
						}}
					>
						<SaveOutlined />
						Save Table
					</Button>

					<Button
						onClick={() => {
							setAddTrigger((addTrigger) => addTrigger + 1);
						}}
						type="primary"
						style={{
							marginBottom: 16,
							marginLeft: 20,
							backgroundColor: "transparent",
							color: "#FE1C1E",
							border: "none",
							boxShadow: "none",
							fontWeight: 900,
							fontSize: 20,
						}}
					>
						<PlusCircleOutlined />
						Add Row
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
						onClick={logout}
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
						<UserOutlined /> Logout
					</Button>
				</Header>

				<Content style={{ marginRight: 30 }}>
					<EditMainTable
						addTrigger={addTrigger}
						writeTrigger={writeTrigger}
					/>
				</Content>
			</Layout>
		</Layout>
	);
};
export default EditLay;
