import { Table, Button, Input, Space } from "antd";
import Highlighter from "react-highlight-words";
import React, { useEffect, useState, useRef } from "react";
import {
	CheckCircleFilled,
	CloseCircleOutlined,
	SearchOutlined,
} from "@ant-design/icons";
import { db } from "../firebase/initFirebase";
import { ref, onValue } from "firebase/database";
import "../styling/Table.css";
import bullet from "../assets/bullet.png";
import landing from "../assets/landing.png";
import scene from "../assets/scene.png";
import size from "../assets/size.png";
import start from "../assets/start.png";
import line from "../assets/line.png";

const MainTable = ({ uid, tableName }) => {
	const [expandedKey, setExpandedKey] = useState(null);
	const [searchText, setSearchText] = useState("");
	const [searchedColumn, setSearchedColumn] = useState("");
	const searchInput = useRef(null);
	const [dataSource, setDataSource] = useState([]);
	const [filteredInfo, setFilteredInfo] = useState({});

	const [filter, setFilter] = useState({
		uncontrived: false,
		obviousStart: false,
		greatRock: false,
		flatLanding: false,
		tall: false,
		beautifulSetting: false,
		sent: false,
	});

	useEffect(() => {
		console.log(uid, tableName);
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
	}, [tableName]);

	const handleChange = (pagination, filters, sorter) => {
		console.log("Various parameters", pagination, filters, sorter);
		setFilteredInfo(filters);
		// setSortedInfo(sorter);
	};

	const handleSearch = (selectedKeys, confirm, dataIndex) => {
		confirm();
		setSearchText(selectedKeys[0]);
		setSearchedColumn(dataIndex);
	};
	const handleReset = (clearFilters) => {
		clearFilters();
		setSearchText("");
	};
	const getColumnSearchProps = (dataIndex) => ({
		filterDropdown: ({
			setSelectedKeys,
			selectedKeys,
			confirm,
			clearFilters,
			close,
		}) => (
			<div
				style={{
					padding: 8,
				}}
				onKeyDown={(e) => e.stopPropagation()}
			>
				<Input
					ref={searchInput}
					placeholder={`Search ${dataIndex}`}
					value={selectedKeys[0]}
					onChange={(e) =>
						setSelectedKeys(e.target.value ? [e.target.value] : [])
					}
					onPressEnter={() =>
						handleSearch(selectedKeys, confirm, dataIndex)
					}
					style={{
						marginBottom: 8,
						display: "block",
					}}
				/>
				<Space>
					<Button
						type="primary"
						onClick={() =>
							handleSearch(selectedKeys, confirm, dataIndex)
						}
						icon={<SearchOutlined />}
						size="small"
						style={{
							width: 90,
						}}
					>
						Search
					</Button>
					<Button
						onClick={() =>
							clearFilters && handleReset(clearFilters)
						}
						size="small"
						style={{
							width: 90,
						}}
					>
						Reset
					</Button>
					<Button
						type="link"
						size="small"
						onClick={() => {
							confirm({
								closeDropdown: false,
							});
							setSearchText(selectedKeys[0]);
							setSearchedColumn(dataIndex);
						}}
					>
						Filter
					</Button>
					<Button
						type="link"
						size="small"
						onClick={() => {
							close();
						}}
					>
						close
					</Button>
				</Space>
			</div>
		),
		filterIcon: (filtered) => (
			<SearchOutlined
				style={{
					color: filtered ? "#1890ff" : undefined,
				}}
			/>
		),
		onFilter: (value, record) => {
			// console.log(record);
			record[dataIndex]
				.toString()
				.toLowerCase()
				.includes(value.toLowerCase());
		},
		filteredValue: !filteredInfo.location || null,
		onFilterDropdownOpenChange: (visible) => {
			if (visible) {
				setTimeout(() => searchInput.current?.select(), 100);
			}
		},
		render: (text) =>
			searchedColumn === dataIndex ? (
				<Highlighter
					highlightStyle={{
						backgroundColor: "#ffc069",
						padding: 0,
					}}
					searchWords={[searchText]}
					autoEscape
					textToHighlight={text ? text.toString() : ""}
				/>
			) : (
				text
			),
	});

	const defaultColumns = [
		{
			title: "Rank",
			dataIndex: "rank",
			key: "rank",
			// width: 80,
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
			// width: 100,
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
		{
			title: "Grade",
			dataIndex: "grade",
			key: "grade",
			// width: 80,
			// editable: true,
		},
		{
			title: "Name",
			dataIndex: "name",
			key: "name",
			// width: 150,
			// editable: true
		},
		{
			title: "Location",
			dataIndex: "location",
			key: "location",
			// width: 150,
			// editable: true,
			...getColumnSearchProps("location"),
			// filteredValue: searchText.includes()
		},
		{
			title: () => (
				<div>
					<img className="header-icon" src={line} />
					Line
					<Button
						icon={<CheckCircleFilled />}
						style={{
							backgroundColor: "#811b09",
							color: filter.uncontrived ? "#b4d3b2" : "#55575a",
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
				</div>
			),
			dataIndex: "uncontrived",
			key: "uncontrived",
			inputType: "boolean",
			width: 110,
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
					<img className="header-icon" src={start} />
					Start
					<Button
						icon={<CheckCircleFilled />}
						style={{
							backgroundColor: "#811b09",
							color: filter.obviousStart ? "#b4d3b2" : "#55575a",
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
				</div>
			),
			dataIndex: "obviousStart",
			key: "obviousStart",
			inputType: "boolean",
			width: 110,
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
					<img className="header-icon" src={bullet} />
					Rock
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
				</div>
			),
			dataIndex: "greatRock",
			key: "greatRock",
			width: 110,
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
					<img className="header-icon" src={landing} />
					Landing
					<Button
						icon={<CheckCircleFilled />}
						style={{
							backgroundColor: "#811b09",
							color: filter.flatLanding ? "#b4d3b2" : "#55575a",
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
				</div>
			),
			dataIndex: "flatLanding",
			key: "flatLanding",
			width: 120,
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
					<img className="header-icon" src={size} />
					Tall
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
				</div>
			),
			dataIndex: "tall",
			key: "tall",
			width: 100,
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
					<img className="header-icon" src={scene} />
					Setting
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
				</div>
			),
			dataIndex: "beautifulSetting",
			key: "beautifulSetting",
			width: 120,
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
	];

	const onExpand = (_, { key }) => {
		expandedKey == key ? setExpandedKey(null) : setExpandedKey(key);
	};
	const expandedRowRender = (record) => {
		return (
			<div
				style={{
					display: "flex",
					justifyContent: "center",
				}}
			>
				{record.link !== "undefined" ? (
					record.media == 1 ? (
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
						<iframe
							src={
								"https://player.vimeo.com/video/" +
								record.link +
								"?"
							}
							frameborder="0"
							allow="autoplay; encrypted-media"
							allowFullScreen
							title="video"
							style={{
								alignItems: "center",
								margin: "30px",
							}}
						/>
					)
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

	return (
		<div>
			<div className="table__container">
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
					className="table"
					rowKey="key"
					dataSource={dataSource.slice(0, 100)}
					columns={defaultColumns}
					rowClassName="editable-row"
					pagination={false}
					sticky={true}
					onChange={handleChange}
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
				{dataSource.length > 100 && (
					<div>
						<div
							style={{
								borderTop: "thick solid #b4d3b2",
								borderBottom: "thin solid white",
								width: "100%",
								backgroundColor: "#811b09",
								color: "white",
								fontWeight: 600,
								display: "flex",
								justifyContent: "center",
							}}
						>
							<p>Contenders</p>
						</div>
						<Table
							locale={locale}
							rowKey="key"
							dataSource={dataSource.slice(100, 199)}
							columns={defaultColumns}
							rowClassName="editable-row"
							pagination={false}
							sticky={true}
							onChange={handleChange}
							expandable={{
								expandedRowRender,
								expandRowByClick: true,
								onExpand: onExpand,
								expandedRowKeys: [expandedKey],
								rowExpandable: (record) =>
									record.description ||
									record.link ||
									record.fa,
							}}
							expandIconAsCell={false}
							expandIconColumnIndex={-1}
							showHeader={false}
						/>
					</div>
				)}
			</div>
		</div>
	);
};
export default MainTable;
