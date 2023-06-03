import "../styling/Layout.css";
import { Button } from "antd";
import { logout } from "../firebase/initFirebase";
import { ReactComponent as ReactLogo } from "../logo.svg";
import {
	UserOutlined,
	SaveOutlined,
	PlusCircleOutlined,
	MinusCircleOutlined,
	QuestionCircleOutlined,
	DownCircleOutlined,
} from "@ant-design/icons";
import {
	Layout,
	Menu,
	Form,
	Input,
	Modal,
	Popconfirm,
	Dropdown,
	Space,
} from "antd";
import React, { useState, useEffect } from "react";
import EditMainTable from "./EditMainTable";
import HowTo from "./HowTo";

import { useAuthState } from "react-firebase-hooks/auth";
import { db, auth } from "../firebase/initFirebase";
import { useNavigate } from "react-router-dom";
import { ref, onValue, update, push, child } from "firebase/database";

const { Header, Sider, Content } = Layout;

const EditLay = () => {
	const navigate = useNavigate();
	const [user, loading] = useAuthState(auth);
	const [userData, setUserData] = useState([]);
	const [collapsed] = useState(false);
	const [addTrigger, setAddTrigger] = useState(0);
	const [deleteTrigger, setDeleteTrigger] = useState(false);
	const [writeTrigger, setWriteTrigger] = useState(false);
	const [saveTrigger, setSaveTrigger] = useState(false);
	const [tableName, setTableName] = useState("");
	const [form] = Form.useForm();
	const [open, setOpen] = useState(false);
	const [confirmLoading, setConfirmLoading] = useState(false);
	useEffect(() => {
		setWriteTrigger(false);
		setDeleteTrigger(false);
		setSaveTrigger(false);
	}, [writeTrigger, deleteTrigger, saveTrigger]);

	useEffect(() => {
		if (loading) return;
		if (!user) return navigate("/");

		onValue(ref(db, "/users/" + user.uid), (snapshot) => {
			const data = snapshot.val();
			if (data !== null) {
				setUserData(data);
				data.tables && setTableName(Object.keys(data.tables)[0]);
				// console.log(Object.keys(data.tables)[0]);
			}
			console.log(writeTrigger, addTrigger, deleteTrigger);
		});
	}, [user, loading]);

	const showModal = () => {
		setOpen(true);
		// console.log(tableName);
	};
	// const handleSubmit = (values) => {
	// 	setChangeLog("The modal will be closed after two seconds");
	// };
	const closeModal = () => {
		console.log("Clicked cancel button");
		setOpen(false);
	};

	function renderSwitch() {
		switch (tableName) {
			case "":
				return <HowTo />;
			default:
				return (
					<EditMainTable
						addTrigger={addTrigger}
						writeTrigger={writeTrigger}
						tableName={tableName}
						deleteTrigger={deleteTrigger}
						saveTrigger={saveTrigger}
						uid={user ? user.uid : ""}
					/>
				);
		}
	}
	return (
		<Layout>
			<Modal
				title="Name Your New Table"
				open={open}
				onOk={() => {
					form.validateFields()
						.then((values) => {
							form.resetFields();
							// console.log(values);
							setTableName(values.change);
							closeModal();
						})
						.catch((info) => {
							console.log("Validate Failed:", info);
						});
				}}
				confirmLoading={confirmLoading}
				onCancel={closeModal}
				centered
				style={{
					width: "400px",
					zindex: 9999,
				}}
			>
				<Form form={form} name="form_in_modal">
					<Form.Item name="change">
						<Input style={{ width: "350px" }} />
					</Form.Item>
				</Form>
			</Modal>
			<Sider
				trigger={null}
				collapsible
				collapsed={collapsed}
				style={{
					overflow: "auto",
					// height: "100%",
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
				{tableName && (
					<Menu
						theme="dark"
						mode="inline"
						style={{
							marginTop: 50,
						}}
					>
						<Button
							onClick={() => {
								setWriteTrigger(
									(writeTrigger) => !writeTrigger
								);
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
						<Button
							type="primary"
							style={{
								marginBottom: 16,
								float: "bottom",
								marginLeft: 20,
								backgroundColor: "transparent",
								color: "#FE1C1E",
								border: "none",
								boxShadow: "none",
								fontWeight: 900,
								fontSize: 20,
							}}
						>
							<Popconfirm
								title="Sure to delete?"
								onConfirm={() => {
									setDeleteTrigger(
										(deleteTrigger) => !deleteTrigger
									);
								}}
								icon=""
								style={{
									backgroundColor: "#55575a",
								}}
							>
								<a>
									{" "}
									<MinusCircleOutlined /> Delete Table
								</a>
							</Popconfirm>
						</Button>
					</Menu>
				)}
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
					{userData.tables && (
						<Dropdown
							dropdownRender={() => (
								<div
									style={{
										backgroundColor: "#242526",
										display: "flex",
										marginTop: 10,
										// width: 100,
										// height: 500,
										borderColor: "#FE1C1E",
										flexDirection: "column",
									}}
								>
									{" "}
									{userData.tables &&
										Object.keys(userData.tables).map(
											(key) => {
												return (
													<Button
														onClick={() => {
															setTableName(key);
															setSaveTrigger(
																(saveTrigger) =>
																	!saveTrigger
															);
														}}
														style={{
															margin: 15,
															backgroundColor:
																"transparent",
															color: "#FE1C1E",
															border: "none",
															boxShadow: "none",
															fontWeight: 900,
															fontSize: 20,
														}}
													>
														{key}
													</Button>
												);
											}
										)}
								</div>
							)}
						>
							<Button
								style={{
									float: "left",
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
								<DownCircleOutlined /> My Tables
							</Button>
						</Dropdown>
					)}
					<Button
						onClick={() => {
							showModal();
							setSaveTrigger((saveTrigger) => !saveTrigger);
						}}
						style={{
							float: "left",
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
						<PlusCircleOutlined /> New Table
					</Button>

					<Button
						onClick={() => {
							setSaveTrigger((saveTrigger) => !saveTrigger);
							logout();
						}}
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
					<Button
						onClick={() => {
							setSaveTrigger((saveTrigger) => !saveTrigger);

							setTableName("");
						}}
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
						<QuestionCircleOutlined /> How To
					</Button>
				</Header>

				<Content style={{ marginRight: 30 }}>{renderSwitch()}</Content>
			</Layout>
		</Layout>
	);
};
export default EditLay;
