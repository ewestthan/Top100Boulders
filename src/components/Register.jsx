import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as ReactLogo } from "../logo.svg";
import ReactLoading from "react-loading";

import {
	auth,
	logInWithEmailAndPassword,
	registerWithEmailAndPassword,
} from "../firebase/initFirebase.jsx";
import { useAuthState } from "react-firebase-hooks/auth";
import "../styling/Login.css";

function Register() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [name, setName] = useState("");
	const [user, loading] = useAuthState(auth);
	const navigate = useNavigate();
	const [showError, setShowError] = useState(false);
	const [error, setError] = useState("");
	const [isLoggingIn, setIsLoggingIn] = useState(false);

	useEffect(() => {
		if (loading) {
			return;
		}
		if (user) {
			navigate("/edit");
		}
	}, [user, loading]);

	const handleRegister = () => {
		if (password !== confirmPassword) {
			setError("Passwords are not equal");
			setShowError(true);
		}
		if (!name) {
			setError("Please enter your name");
			setShowError(true);
		}
		if (!email) {
			setError("Please enter your email");
			setShowError(true);
		}
		if (!confirmPassword) {
			setError("Please confirm your password");
			setShowError(true);
		}
		if (!password) {
			setError("Please enter a password");
			setShowError(true);
		} else {
			registerWithEmailAndPassword(email, password, name).then(
				(promise) => {
					if (promise === "auth/invalid-email") {
						setError("Invalid Email");
						setShowError(true);
					}
					console.log(promise);
					if (promise === "auth/email-already-in-use") {
						setError("Email Already in Use");
						setShowError(true);
					}
					if (promise === "auth/weak-password") {
						setError("Use a Stronger Password");
						setShowError(true);
					}
				}
			);

			if (user) navigate("/edit", { replace: true });
		}
	};

	return isLoggingIn ? (
		<ReactLoading
			type="spinningBubbles"
			color="#fe1c1e"
			height={400}
			width={200}
		/>
	) : (
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
				;
				<input
					type="text"
					className="login__textBox"
					value={name}
					onChange={(e) => setName(e.target.value)}
					placeholder="Name"
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
				<input
					type="password"
					className="login__textBox"
					value={confirmPassword}
					onChange={(e) => setConfirmPassword(e.target.value)}
					placeholder="Confirm Password"
				/>
				<button className="login__btn" onClick={handleRegister}>
					Register
				</button>
				{showError && <p className="login-error">{error}</p>}
				<div style={{ color: "white" }}>
					<p>Already have an account? </p>
					<Link to="/login" className="link">
						Login now
					</Link>
				</div>
			</div>
		</div>
	);
}

export default Register;
