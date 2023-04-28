import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login.jsx";
import Lay from "./components/Layout.jsx";
import EditLay from "./components/EditorLayout.jsx";

function App() {
	return (
		<div className="app">
			<div className="app">
				<Router>
					<Routes>
						<Route exact path="/" element={<Lay />} />
						<Route exact path="/login" element={<Login />} />
						<Route exact path="/edit" element={<EditLay />} />
					</Routes>
				</Router>
			</div>
		</div>
	);
}

export default App;
