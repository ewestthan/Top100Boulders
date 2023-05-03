import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as ReactLogo } from "../logo.svg";

import {
	auth,
	logInWithEmailAndPassword,
	signInWithGoogle,
	registerWithEmailAndPassword,
} from "../firebase/initFirebase.jsx";
import { useAuthState } from "react-firebase-hooks/auth";
import "../styling/Login.css";

function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [user, loading, error] = useAuthState(auth);
	const navigate = useNavigate();
	const [showError, setShowError] = useState(false);
	const isMounted = useRef(false);

	useEffect(() => {
		if (loading) {
			// maybe trigger a loading screen
			return;
		}
		if (user) {
			navigate("/edit");
		}
	}, [user, loading]);

	// const register = () => {
	// 	registerWithEmailAndPassword(email, password);
	// 	if (user) navigate("/edit", { replace: true });
	// };

	const handleLogin = () => {
		setShowError(true);
		logInWithEmailAndPassword(email, password);
	};

	return (
		<div className="login">
			<div className="login__container">
				<ReactLogo
					style={{
						height: 100,
						margin: 0,
						// marginTop: 16,
						paddingBottom: "30px",
						width: 200,
					}}
				/>
				<input
					type="text"
					className="login__textBox"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					placeholder="E-mail Address"
				/>
				<input
					type="password"
					className="login__textBox"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					placeholder="Password"
				/>
				<button className="login__btn" onClick={handleLogin}>
					Login
				</button>
				{showError && (
					<p className="login-error">
						Username or password incorrect
					</p>
				)}
				{/* <button
					className="login__btn"
					onClick={() => register(email, password)}
					disabled
				>
					Register
				</button> */}
			</div>
		</div>
	);
}

export default Login;
