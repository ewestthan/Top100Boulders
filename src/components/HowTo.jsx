import React from "react";
import "../styling/About.css";

const HowTo = () => {
	return (
		<div id="about-container">
			<h1 id="about-header">How to Use This Tool</h1>

			<p id="about-content">
				<ol id="about-list">
					<li>
						To get started, click on "New Table" and enter a table
						name.
					</li>
					<li>
						Once the table is created, add some rows by clicking the
						"Add Row" button on the left sidebar.
					</li>
					<li>
						Rows can be edited or deleted via the far right column,
						but will not save unless certain values are input.
					</li>
					<li>
						Rows are draggable using the icon in the far left
						column, simply click and drag to reorder the rows.
					</li>
					<li>
						Once you are done editing the table, make sure to click
						"Save Table".
					</li>
					<li>
						You can create multiple tables. To switch between them,
						hover over the "My Tables" dropdown button and select
						your table.
					</li>
					<li>
						Tables are also deleteable, clicking "Delete Table" will
						delete the table that is currently displayed. But be
						careful! This cannot be undone.
					</li>
				</ol>
			</p>
			<h2 id="about-header">
				<strong>Some things to note:</strong>
			</h2>
			<p id="about-content">
				<ul id="about-list">
					<li>
						If you refresh the page without saving your table, you
						will lose your progress. Make sure to save often.
					</li>
					<li>
						The youtube link input only accepts a video ID. This can
						be found within the link, eg. within this link:
						"https://www.youtube.com/watch?v=
						<strong>Rx6GPpO37C4</strong>&t=927s", the video ID is{" "}
						<strong>"Rx6GPpO37C4"</strong>.
					</li>
				</ul>
			</p>
		</div>
	);
};

export default HowTo;
