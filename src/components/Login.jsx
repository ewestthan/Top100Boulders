import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword } from "../firebase/initFirebase";
import { useAuthState } from "react-firebase-hooks/auth";
import ReactLoading from "react-loading";
import { ReactComponent as ReactLogo } from "../logo.svg";

function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [user, loading] = useAuthState(auth);
	const navigate = useNavigate();
	const [isLoggingIn, setIsLoggingIn] = useState(false);
	const [showError, setShowError] = useState(false);

	const handleRegister = () => {
		logInWithEmailAndPassword(email, password).then((promise) =>
			promise ? setIsLoggingIn(true) : setShowError(true)
		);
		if (user) navigate("/edit", { replace: true });
	};

	useEffect(() => {
		if (loading) return;
		if (user) navigate("/edit", { replace: true });
	}, [user, loading]);

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
				<button
					className="login__btn"
					onClick={handleRegister}
					// disabled
				>
					Login
				</button>
				{showError && (
					<p className="login-error">
						Username or password incorrect
					</p>
				)}
				<div style={{ color: "white" }}>
					<p>Don't have an account?</p>
					<Link to="/register" className="link">
						Signup
					</Link>
				</div>
			</div>
		</div>
	);
}

export default Login;
