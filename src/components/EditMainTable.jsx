import {
	Form,
	Input,
	Popconfirm,
	Table,
	Checkbox,
	Typography,
	Modal,
} from "antd";
import React, { useEffect, useState } from "react";
import {
	MenuOutlined,
	CheckCircleFilled,
	CloseCircleOutlined,
} from "@ant-design/icons";
import { DndContext } from "@dnd-kit/core";
import {
	arrayMove,
	SortableContext,
	useSortable,
	verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { db, auth } from "../firebase/initFirebase";
import { ref, onValue, update, push, child, remove } from "firebase/database";
import { useNavigate } from "react-router-dom";
import "../styling/Table.css";
import CheckableTag from "antd/es/tag/CheckableTag";
// import { writeJsonFile } from "write-json-file";

const { TextArea } = Input;

const Row = ({ children, ...props }) => {
	const {
		attributes,
		listeners,
		setNodeRef,
		setActivatorNodeRef,
		transform,
		transition,
		isDragging,
	} = useSortable({
		id: props["data-row-key"],
	});
	const style = {
		...props.style,
		transform: CSS.Transform.toString(
			transform && {
				...transform,
				scaleY: 1,
			}
		)?.replace(/translate3d\(([^,]+),/, "translate3d(0,"),
		transition,
		...(isDragging
			? {
					position: "relative",
					zIndex: 9999,
			  }
			: {}),
	};
	return (
		<tr {...props} ref={setNodeRef} style={style} {...attributes}>
			{React.Children.map(children, (child) => {
				if (child.key === "sort") {
					return React.cloneElement(child, {
						children: (
							<MenuOutlined
								ref={setActivatorNodeRef}
								style={{
									touchAction: "none",
									cursor: "move",
								}}
								{...listeners}
							/>
						),
					});
				}
				return child;
			})}
		</tr>
	);
};

const EditableCell = ({
	editing,
	dataIndex,
	title,
	inputType,
	record,
	index,
	children,
	...restProps
}) => {
	const inputNode =
		inputType === "boolean" ? (
			<Checkbox value={record[dataIndex]} />
		) : inputType === "textArea" ? (
			<TextArea rows={4} style={{ width: "350px" }} />
		) : (
			<Input />
		);
	return (
		<td {...restProps}>
			{editing ? (
				inputType === "boolean" ? (
					<Form.Item
						name={dataIndex}
						valuePropName={dataIndex ? "checked" : ""}
						style={{
							margin: 0,
						}}
					>
						{inputNode}
					</Form.Item>
				) : (
					<Form.Item
						name={dataIndex}
						style={{
							margin: 0,
						}}
						placeholder={title}
						rules={[
							{
								required: true,
								message: `Please Input ${title}!`,
							},
						]}
					>
						{inputNode}
					</Form.Item>
				)
			) : (
				children
			)}
		</td>
	);
};

const MainTable = ({
	addTrigger,
	writeTrigger,
	tableName,
	uid,
	deleteTrigger,
}) => {
	const [deleted, setDeleted] = useState(0);
	const [reloadTrigger, setReloadTrigger] = useState(0);
	const [expandedKey, setExpandedKey] = useState(null);
	const onExpand = (_, { key }) => setExpandedKey(key);
	const [dataSource, setDataSource] = useState([]);
	const [formRow] = Form.useForm();
	const [formModal] = Form.useForm();
	const [editingKey, setEditingKey] = useState("");
	const isEditing = (record) => record.key === editingKey;
	const [open, setOpen] = useState(false);
	const [confirmLoading, setConfirmLoading] = useState(false);
	const current = new Date();

	useEffect(() => {
		if (addTrigger) {
			handleAdd();
		}
	}, [addTrigger]);

	useEffect(() => {
		if (writeTrigger) {
			showModal();
			writeTrigger = false;
		}
	}, [writeTrigger]);

	useEffect(() => {
		if (deleteTrigger) {
			try {
				remove(ref(db, "/users/" + uid + "/tables/" + tableName + "/"));
			} catch (e) {
				console.log(e);
			}
		}
	}, [deleteTrigger]);

	useEffect(() => {
		if (tableName !== "") {
			try {
				console.log(tableName);
				onValue(
					ref(db, "/users/" + uid + "/tables/" + tableName + "/"),
					(snapshot) => {
						const data = snapshot.val();
						if (data !== null) {
							setDataSource(data);
						} else {
							setDataSource([]);
						}
					}
				);
			} catch (e) {
				console.log(e);
			}
		} else {
			setDataSource([]);
		}
	}, [, reloadTrigger, tableName]);

	const writeToDatabase = async (values) => {
		try {
			// await writeJsonFile("test.json", JSON.stringify(dataSource));

			const newRef = push(child(ref(db), "changeLog")).key;
			const updates = {};
			updates["/changeLog/" + newRef] = {
				change: values.change,
				date: `${
					current.getMonth() + 1
				}-${current.getDate()}-${current.getFullYear()}`,
			};
			updates["/users/" + uid + "/tables/" + tableName + "/"] =
				dataSource;
			console.log(updates);
			update(ref(db), updates);
			setReloadTrigger((reloadTrigger) => reloadTrigger + 1);
		} catch (e) {
			console.log(e);
		}

		setConfirmLoading(true);
		setTimeout(() => {
			setOpen(false);
			setConfirmLoading(false);
		}, 2000);
	};

	const defaultColumns = [
		{
			key: "sort",
			width: 70,
		},
		{
			title: "Rank",
			dataIndex: "rank",
			key: "rank",
			width: 80,
		},
		{
			title: "Sent",
			dataIndex: "sent",
			key: "sent",
			editable: true,
			inputType: "boolean",
			render: (text) =>
				text ? (
					<CheckCircleFilled className="check" />
				) : (
					<CloseCircleOutlined className="uncheck" />
				),
		},
		{
			title: "Grade",
			dataIndex: "grade",
			key: "grade",
			editable: true,
			width: 80,
		},
		{
			title: "Name",
			dataIndex: "name",
			key: "name",
			editable: true,
			width: 120,
		},
		{
			title: "Location",
			dataIndex: "location",
			key: "location",
			editable: true,
			width: 120,
		},
		{
			title: "Line",
			dataIndex: "uncontrived",
			key: "uncontrived",
			editable: true,
			inputType: "boolean",
			render: (text) =>
				text ? (
					<CheckCircleFilled className="check" />
				) : (
					<CloseCircleOutlined className="uncheck" />
				),
		},
		{
			title: "Start",
			dataIndex: "obviousStart",
			key: "obviousStart",
			editable: true,
			inputType: "boolean",
			render: (text) =>
				text ? (
					<CheckCircleFilled className="check" />
				) : (
					<CloseCircleOutlined className="uncheck" />
				),
		},
		{
			title: "Rock",
			dataIndex: "greatRock",
			key: "greatRock",
			editable: true,
			inputType: "boolean",
			render: (text) =>
				text ? (
					<CheckCircleFilled className="check" />
				) : (
					<CloseCircleOutlined className="uncheck" />
				),
		},
		{
			title: "Landing",
			dataIndex: "flatLanding",
			key: "flatLanding",
			editable: true,
			inputType: "boolean",
			render: (text) =>
				text ? (
					<CheckCircleFilled className="check" />
				) : (
					<CloseCircleOutlined className="uncheck" />
				),
		},
		{
			title: "Tall",
			dataIndex: "tall",
			key: "tall",
			editable: true,
			inputType: "boolean",
			render: (text) =>
				text ? (
					<CheckCircleFilled className="check" />
				) : (
					<CloseCircleOutlined className="uncheck" />
				),
		},
		{
			title: "Setting",
			dataIndex: "beautifulSetting",
			key: "beautifulSetting",
			editable: true,
			inputType: "boolean",
			render: (text) =>
				text ? (
					<CheckCircleFilled className="check" />
				) : (
					<CloseCircleOutlined className="uncheck" />
				),
		},
		{
			dataIndex: "operation",
			width: 80,
			render: (_, record) => {
				const editable = isEditing(record);
				return editable ? (
					<span>
						<Typography.Link
							onClick={() => handleSave(record.key)}
							style={{
								marginRight: 8,
							}}
						>
							Save
						</Typography.Link>
						<Popconfirm
							title="Sure to cancel?"
							onConfirm={handleCancel}
						>
							<a>Cancel</a>
						</Popconfirm>
					</span>
				) : (
					<span>
						<Typography.Link
							disabled={editingKey !== ""}
							onClick={() => handleEdit(record)}
						>
							Edit
						</Typography.Link>
						<Popconfirm
							title="Sure to delete?"
							onConfirm={() => handleDelete(record.key)}
						>
							<a> Delete</a>
						</Popconfirm>
					</span>
				);
			},
		},
	];

	const handleEdit = (record) => {
		formRow.setFieldsValue({
			rank: "",
			grade: "V",
			name: "",
			location: "",
			uncontrived: false,
			obviousStart: false,
			greatRock: false,
			flatLanding: false,
			tall: false,
			beautifulSetting: false,
			sent: "",
			description: "",
			link: "",
			fa: "",
			...record,
		});
		setEditingKey(record.key);
	};

	const handleCancel = () => {
		setEditingKey("");
	};

	const handleSave = async (key) => {
		try {
			const row = await formRow.validateFields();
			const newData = [...dataSource];
			const index = newData.findIndex((item) => key === item.key);
			if (index > -1) {
				const item = newData[index];
				newData.splice(index, 1, {
					...item,
					...row,
				});
				setDataSource(newData);
				setEditingKey("");
			} else {
				newData.push(row);
				setDataSource(newData);
				setEditingKey("");
			}
		} catch (errInfo) {
			console.log("Validate Failed:", errInfo);
		}
	};

	const handleDelete = (key) => {
		var itemToDelete = dataSource.find((obj) => {
			return obj.key === key;
		});
		const newData = dataSource.filter((item) => item.key !== key);

		for (var i = 0; i < newData.length; i++) {
			if (parseInt(itemToDelete.rank) < parseInt(newData[i].rank)) {
				newData[i].rank = String(parseInt(newData[i].rank) - 1);
				// newData[i].key = newData[i].rank;
			}
		}
		setDeleted(deleted - 1);
		setDataSource(newData);
	};

	const handleAdd = () => {
		// let rank = 1;
		// // const newData = dataSource;

		// const newData = dataSource;

		// for (var i = 0; i < newData.length; i++) {
		// 	newData[i].rank = String(rank);
		// 	// newData[i].key = newData[i].rank;
		// 	rank++;
		// }
		// setDataSource(newData);
		// console.log(newData);
		const newData = {
			key: dataSource.length + 1 - deleted,
			rank: String(dataSource.length + 1),
			grade: "X",
			name: "X",
			location: "X",
			uncontrived: false,
			obviousStart: false,
			greatRock: false,
			flatLanding: false,
			tall: false,
			beautifulSetting: false,
			sent: false,
			link: "",
			description: "",
			fa: "",
		};
		setDataSource([...dataSource, newData]);
	};

	const onDragEnd = ({ active, over }) => {
		if (active.id !== over?.id) {
			setDataSource((previous) => {
				const activeIndex = previous.findIndex(
					(i) => i.key === active.id
				);
				const overIndex = previous.findIndex((i) => i.key === over?.id);
				try {
					if (
						parseInt(dataSource[activeIndex].rank) >
						parseInt(dataSource[overIndex].rank)
					) {
						for (var i = overIndex; i < activeIndex; i++) {
							dataSource[i].rank = String(
								parseInt(dataSource[i].rank) + 1
							);
							dataSource[activeIndex].rank = String(
								parseInt(dataSource[overIndex].rank) - 1
							);
						}
					}
					if (
						parseInt(dataSource[activeIndex].rank) <
						parseInt(dataSource[overIndex].rank)
					) {
						for (var i = activeIndex + 1; i <= overIndex; i++) {
							dataSource[i].rank = String(
								parseInt(dataSource[i].rank) - 1
							);
							dataSource[activeIndex].rank = String(
								parseInt(dataSource[overIndex].rank) + 1
							);
						}
					}
				} catch (e) {
					console.log("failed: ", e);
				}

				return arrayMove(previous, activeIndex, overIndex);
			});
			console.log("moved", dataSource);
		}
	};

	const mergedColumns = defaultColumns.map((col) => {
		if (!col.editable) {
			return col;
		}
		return {
			...col,
			onCell: (record) => ({
				record,
				inputType: col.inputType === "boolean" ? "boolean" : "text",
				dataIndex: col.dataIndex,
				title: col.title,
				editing: isEditing(record),
			}),
		};
	});

	const expandedRowRender = (record) => {
		return editingKey == record.key ? (
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					zindex: -1,
				}}
			>
				<div
					style={{
						margin: "30px",
						marginTop: "10px",
					}}
				>
					<p
						style={{
							color: "white",
							textAlign: "left",
							fontWeight: "900",
							marginTop: "10px",
							marginBottom: "5px",
						}}
					>
						First Ascent:
					</p>
					<EditableCell
						editing={true}
						dataIndex={"fa"}
						inputType={"text"}
						record={record}
					/>
					<p
						style={{
							color: "white",
							textAlign: "left",
							fontWeight: "900",
							marginTop: "10px",
							marginBottom: "5px",
						}}
					>
						Youtube Video Id:
					</p>
					<EditableCell
						editing={true}
						dataIndex={"link"}
						inputType={"text"}
						record={record}
					/>
				</div>
				<div
					style={{
						margin: "30px",
						marginTop: "10px",
					}}
				>
					<p
						style={{
							color: "white",
							textAlign: "left",
							fontWeight: "900",
							marginTop: "0",
						}}
					>
						Description:
					</p>
					<EditableCell
						editing={true}
						dataIndex={"description"}
						inputType={"textArea"}
						record={record}
					/>
				</div>
			</div>
		) : (
			<div
				style={{
					display: "flex",
					justifyContent: "center",
				}}
			>
				{record.link ? (
					<iframe
						src={"https://www.youtube.com/embed/" + record.link}
						frameborder="0"
						allow="autoplay; encrypted-media"
						allowFullScreen
						title="video"
						style={{
							alignItems: "center",
							margin: "30px",
						}}
					/>
				) : (
					<p></p>
				)}
				<div>
					{record.fa && (
						<p
							style={{
								color: "white",
								fontWeight: "800",
								alignItems: "center",
								margin: "30px",
								marginBottom: "0",
								textAlign: "left",
								maxWidth: "500px",
							}}
						>
							First Ascent: {record.fa}
						</p>
					)}
					<p
						style={{
							color: "white",
							fontWeight: "800",
							alignItems: "center",
							margin: "30px",
							marginTop: "10px",
							textAlign: "left",
							maxWidth: "500px",
						}}
					>
						{record.description}
					</p>
				</div>
			</div>
		);
	};

	let locale = {
		emptyText: (
			<span>
				<p>Whoopsie</p>
			</span>
		),
	};

	const showModal = () => {
		setOpen(true);
	};
	// const handleSubmit = (values) => {
	// 	setChangeLog("The modal will be closed after two seconds");
	// };
	const closeModal = () => {
		console.log("Clicked cancel button");
		setOpen(false);
	};

	return (
		<div>
			<Modal
				title="Save Table"
				open={open}
				onOk={() => {
					formModal
						.validateFields()
						.then((values) => {
							formModal.resetFields();
							writeToDatabase(values);
						})
						.catch((info) => {
							console.log("Validate Failed:", info);
						});
				}}
				confirmLoading={confirmLoading}
				onCancel={closeModal}
				centered
			>
				<Form form={formModal} name="form_in_modal">
					<Form.Item name="change">
						<TextArea rows={4} style={{ width: "350px" }} />
					</Form.Item>
				</Form>
			</Modal>

			<DndContext onDragEnd={onDragEnd}>
				<SortableContext
					items={dataSource.map((i) => i.key)}
					strategy={verticalListSortingStrategy}
				>
					<Form form={formRow} component={false}>
						<Table
							title={() => (
								<div
									style={{
										color: "white",
									}}
								>
									{tableName}
								</div>
							)}
							locale={locale}
							components={{
								body: {
									row: Row,
									cell: EditableCell,
								},
							}}
							sticky={true}
							rowKey="key"
							dataSource={dataSource}
							columns={mergedColumns}
							rowClassName="editable-row"
							pagination={false}
							expandable={{
								expandedRowRender,
								expandRowByClick: true,
								onExpand: onExpand,
								expandedRowKeys: [expandedKey],
								zindex: 1,
							}}
							// style={{ zindex: 1 }}
							expandIconAsCell={false}
							expandIconColumnIndex={-1}
						/>
						{/* </div> */}
					</Form>
				</SortableContext>
			</DndContext>
		</div>
	);
};
export default MainTable;
