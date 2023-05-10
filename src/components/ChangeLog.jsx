import React, { useEffect, useState } from "react";
import "../styling/About.css";
import { db } from "../firebase/initFirebase";
import { ref, onValue } from "firebase/database";

const ChangeLog = () => {
	const [changeLog, setChangeLog] = useState([]);
	useEffect(() => {
		onValue(
			ref(db, "changeLog"),
			(snapshot) => {
				const data = snapshot.val();
				if (data !== null) {
					setChangeLog(data);
				}
			},
			{
				onlyOnce: true,
			}
		);
	}, []);

	return (
		<div id="about-container">
			{Object.values(changeLog).map((data, i) => (
				<div key={i}>
					<h1 id="about-header">{data.date}</h1>
					<p id="about-content">{data.description}</p>
				</div>
			))}
		</div>
	);
};

export default ChangeLog;
