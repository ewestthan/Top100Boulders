import { Table, Button } from "antd";
import React, { useEffect, useState } from "react";
import {
	CheckCircleFilled,
	CloseCircleOutlined,
	FilterFilled,
} from "@ant-design/icons";
import { db } from "../firebase/initFirebase";
import { ref, onValue } from "firebase/database";
import "../styling/Table.css";

const MainTable = () => {
	const [expandedKey, setExpandedKey] = useState(null);
	const onExpand = (_, { key }) => setExpandedKey(key);
	const [filter, setFilter] = useState({
		uncontrived: false,
		obviousStart: false,
		greatRock: false,
		flatLanding: false,
		tall: false,
		beautifulSetting: false,
		sent: false,
	});
	console.log(filter);
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
			title: () => (
				<div>
					<span>
						Uncontrived{" "}
						<Button
							icon={<CheckCircleFilled />}
							style={{
								backgroundColor: "#811b09",
								color: filter.uncontrived
									? "#b4d3b2"
									: "#55575a",
								border: "none",
								marginLeft: "5px",
							}}
							size="small"
							onClick={(e) =>
								setFilter({
									uncontrived: !filter.uncontrived,
									obviousStart: filter.obviousStart,
									greatRock: filter.greatRock,
									flatLanding: filter.flatLanding,
									tall: filter.tall,
									beautifulSetting: filter.beautifulSetting,
									sent: filter.sent,
								})
							}
						/>
					</span>
				</div>
			),
			dataIndex: "uncontrived",
			key: "uncontrived",
			width: 160,
			inputType: "boolean",
			render: (text) =>
				text ? (
					<CheckCircleFilled className="check" />
				) : (
					<CloseCircleOutlined className="uncheck" />
				),
			filteredValue: filter.uncontrived ? [true] : [],

			onFilter: (_value, record) => record.uncontrived === true,
			// filteredValue: [false, true],
		},
		{
			title: () => (
				<div>
					<span>
						Obvious Start{" "}
						<Button
							icon={<CheckCircleFilled />}
							style={{
								backgroundColor: "#811b09",
								color: filter.obviousStart
									? "#b4d3b2"
									: "#55575a",
								border: "none",
								marginLeft: "5px",
							}}
							size="small"
							onClick={(e) =>
								setFilter({
									uncontrived: filter.uncontrived,
									obviousStart: !filter.obviousStart,
									greatRock: filter.greatRock,
									flatLanding: filter.flatLanding,
									tall: filter.tall,
									beautifulSetting: filter.beautifulSetting,
									sent: filter.sent,
								})
							}
						/>
					</span>
				</div>
			),
			dataIndex: "obviousStart",
			key: "obviousStart",
			inputType: "boolean",
			render: (text) =>
				text ? (
					<CheckCircleFilled className="check" />
				) : (
					<CloseCircleOutlined className="uncheck" />
				),
			filteredValue: filter.obviousStart ? [true] : [],

			onFilter: (_value, record) => record.obviousStart === true,
		},
		{
			title: () => (
				<div>
					<span>
						Great Rock{" "}
						<Button
							icon={<CheckCircleFilled />}
							style={{
								backgroundColor: "#811b09",
								color: filter.greatRock ? "#b4d3b2" : "#55575a",
								border: "none",
								marginLeft: "5px",
							}}
							size="small"
							onClick={(e) =>
								setFilter({
									uncontrived: filter.uncontrived,
									obviousStart: filter.obviousStart,
									greatRock: !filter.greatRock,
									flatLanding: filter.flatLanding,
									tall: filter.tall,
									beautifulSetting: filter.beautifulSetting,
									sent: filter.sent,
								})
							}
						/>
					</span>
				</div>
			),
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
			filteredValue: filter.greatRock ? [true] : [],

			onFilter: (_value, record) => record.greatRock === true,
		},
		{
			title: () => (
				<div>
					<span>
						Flat Landing{" "}
						<Button
							icon={<CheckCircleFilled />}
							style={{
								backgroundColor: "#811b09",
								color: filter.flatLanding
									? "#b4d3b2"
									: "#55575a",
								border: "none",
								marginLeft: "5px",
							}}
							size="small"
							onClick={(e) =>
								setFilter({
									uncontrived: filter.uncontrived,
									obviousStart: filter.obviousStart,
									greatRock: filter.greatRock,
									flatLanding: !filter.flatLanding,
									tall: filter.tall,
									beautifulSetting: filter.beautifulSetting,
									sent: filter.sent,
								})
							}
						/>
					</span>
				</div>
			),
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
			filteredValue: filter.flatLanding ? [true] : [],

			onFilter: (_value, record) => record.flatLanding === true,
		},
		{
			title: () => (
				<div>
					<span>
						Tall{" "}
						<Button
							icon={<CheckCircleFilled />}
							style={{
								backgroundColor: "#811b09",
								color: filter.tall ? "#b4d3b2" : "#55575a",
								border: "none",
								marginLeft: "5px",
							}}
							size="small"
							onClick={(e) =>
								setFilter({
									uncontrived: filter.uncontrived,
									obviousStart: filter.obviousStart,
									greatRock: filter.greatRock,
									flatLanding: filter.flatLanding,
									tall: !filter.tall,
									beautifulSetting: filter.beautifulSetting,
									sent: filter.sent,
								})
							}
						/>
					</span>
				</div>
			),
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
			filteredValue: filter.tall ? [true] : [],

			onFilter: (_value, record) => record.tall === true,
		},
		{
			title: () => (
				<div>
					<span>
						Beautiful Setting{" "}
						<Button
							icon={<CheckCircleFilled />}
							style={{
								backgroundColor: "#811b09",
								color: filter.beautifulSetting
									? "#b4d3b2"
									: "#55575a",
								border: "none",
								marginLeft: "5px",
							}}
							size="small"
							onClick={(e) =>
								setFilter({
									uncontrived: filter.uncontrived,
									obviousStart: filter.obviousStart,
									greatRock: filter.greatRock,
									flatLanding: filter.flatLanding,
									tall: filter.tall,
									beautifulSetting: !filter.beautifulSetting,
									sent: filter.sent,
								})
							}
						/>
					</span>
				</div>
			),
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
			filteredValue: filter.beautifulSetting ? [true] : [],

			onFilter: (_value, record) => record.beautifulSetting === true,
		},
		{
			title: () => (
				<div>
					<span>
						Sent{" "}
						<Button
							icon={<CheckCircleFilled />}
							style={{
								backgroundColor: "#811b09",
								color: filter.sent ? "#b4d3b2" : "#55575a",
								border: "none",
								marginLeft: "5px",
							}}
							size="small"
							onClick={(e) =>
								setFilter({
									uncontrived: filter.uncontrived,
									obviousStart: filter.obviousStart,
									greatRock: filter.greatRock,
									flatLanding: filter.flatLanding,
									tall: filter.tall,
									beautifulSetting: filter.beautifulSetting,
									sent: !filter.sent,
								})
							}
						/>
					</span>
				</div>
			),
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
			filteredValue: filter.sent ? [true] : [],

			onFilter: (_value, record) => record.sent === true,
		},
	];

	const expandedRowRender = (record) => {
		return (
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
				<p
					style={{
						color: "white",
						fontWeight: "800",
						alignItems: "center",
						margin: "30px",
						textAlign: "left",
						maxWidth: "500px",
					}}
				>
					{record.description}
				</p>
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

	return (
		<div>
			<div className="table__container">
				<Table
					locale={locale}
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
						rowExpandable: (record) =>
							record.description || record.link === "",
					}}
					expandIconAsCell={false}
					expandIconColumnIndex={-1}
				/>
			</div>
		</div>
	);
};
export default MainTable;
