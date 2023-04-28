import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
	const [user, loading] = useAuthState(auth);
	const navigate = useNavigate();

	useEffect(() => {
		if (loading) {
			// maybe trigger a loading screen
			return;
		}
		if (user) navigate("/edit");
	}, [user, loading]);

	const register = () => {
		registerWithEmailAndPassword(email, password);
		if (user) navigate("/edit", { replace: true });
	};

	return (
		<div className="login">
			<div className="login__container">
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
					onClick={() => logInWithEmailAndPassword(email, password)}>
					Login
				</button>
				<button
					className="login__btn"
					onClick={() => register(email, password)}>
					Register
				</button>
				<button
					className="login__btn login__google"
					onClick={signInWithGoogle}>
					Login with Google
				</button>
				{/* <div>
          <Link to="/reset">Forgot Password</Link>
        </div> */}
			</div>
		</div>
	);
}

export default Login;
