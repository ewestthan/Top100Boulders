import { Table } from "antd";
import React, { useEffect, useState } from "react";
import { CheckCircleFilled, CloseCircleOutlined } from "@ant-design/icons";
import { db } from "../firebase/initFirebase";
import { ref, onValue } from "firebase/database";
import "../styling/Table.css";

const MainTable = () => {
	const [expandedKey, setExpandedKey] = useState(null);
	const onExpand = (_, { key }) => setExpandedKey(key);

	useEffect(() => {
		onValue(ref(db, "dataSource"), (snapshot) => {
			const data = snapshot.val();
			if (data !== null) {
				setDataSource(data);
			}
		});
	}, []);

	const [dataSource, setDataSource] = useState([]);

	const defaultColumns = [
		{
			title: "Rank",
			dataIndex: "rank",
			key: "rank",
			width: 80,
		},
		{
			title: "Grade",
			dataIndex: "grade",
			key: "grade",
			width: 80,
			// editable: true,
		},
		{
			title: "Name",
			dataIndex: "name",
			key: "name",
			width: 150,
			// editable: true
		},
		{
			title: "Location",
			dataIndex: "location",
			key: "location",
			width: 150,
			// editable: true,
		},
		{
			title: "Uncontrived",
			dataIndex: "uncontrived",
			key: "uncontrived",
			width: 150,
			// editable: true,
			inputType: "boolean",
			render: (text) =>
				text ? (
					<CheckCircleFilled className="check" />
				) : (
					<CloseCircleOutlined className="uncheck" />
				),
		},
		{
			title: "Obvious Start",
			dataIndex: "obviousStart",
			key: "obviousStart",
			// editable: true,
			inputType: "boolean",
			render: (text) =>
				text ? (
					<CheckCircleFilled className="check" />
				) : (
					<CloseCircleOutlined className="uncheck" />
				),
		},
		{
			title: "Great Rock",
			dataIndex: "greatRock",
			key: "greatRock",
			// editable: true,
			inputType: "boolean",
			render: (text) =>
				text ? (
					<CheckCircleFilled className="check" />
				) : (
					<CloseCircleOutlined className="uncheck" />
				),
		},
		{
			title: "Flat Landing",
			dataIndex: "flatLanding",
			key: "flatLanding",
			// editable: true,
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
			// editable: true,
			inputType: "boolean",
			render: (text) =>
				text ? (
					<CheckCircleFilled className="check" />
				) : (
					<CloseCircleOutlined className="uncheck" />
				),
		},
		{
			title: "Beautiful Setting",
			dataIndex: "beautifulSetting",
			key: "beautifulSetting",
			// editable: true,
			inputType: "boolean",
			render: (text) =>
				text ? (
					<CheckCircleFilled className="check" />
				) : (
					<CloseCircleOutlined className="uncheck" />
				),
		},
		{
			title: "Sent",
			dataIndex: "sent",
			key: "sent",
			// editable: true,
			inputType: "boolean",
			render: (text) =>
				text ? (
					<CheckCircleFilled className="check" />
				) : (
					<CloseCircleOutlined className="uncheck" />
				),
		},
	];

	const expandedRowRender = (record) => {
		return (
			<div
				style={{
					display: "flex",
					justifyContent: "center",
				}}>
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
				<p
					style={{
						color: "white",
						fontWeight: "800",
						alignItems: "center",
						margin: "30px",
						textAlign: "left",
						maxWidth: "500px",
					}}>
					{record.description}
				</p>
			</div>
		);
	};

	return (
		<div>
			<div className="table__container">
				<Table
					className="table"
					rowKey="key"
					dataSource={dataSource}
					columns={defaultColumns}
					rowClassName="editable-row"
					pagination={false}
					sticky={true}
					expandable={{
						expandedRowRender,
						expandRowByClick: true,
						onExpand: onExpand,
						expandedRowKeys: [expandedKey],
					}}
					expandIconAsCell={false}
					expandIconColumnIndex={-1}
				/>
			</div>
		</div>
	);
};
export default MainTable;
