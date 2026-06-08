import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/auth/authSlice";

function Login() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  
   const auth = useSelector((state) => state.auth);

const loading = auth?.loading;
const error = auth?.error;


  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");
  
    const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const data = await dispatch(
      loginUser({ username, password })
    ).unwrap();

    console.log("LOGIN SUCCESS", data);

    localStorage.setItem("token", data.token);

    navigate("/home");
  } catch (err) {
    console.log("LOGIN FAILED:", err);
  }
};
  

  return (

    <div style={styles.container}>

      <form
        style={styles.loginBox}
        onSubmit={handleLogin}
      >

        <h1 style={styles.heading}>
          Login
        </h1>

        <input
          type="text"
          placeholder="Enter Username"
          value={username}
          onChange={(e) =>
            setUsername(e.target.value)
          }
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          style={styles.input}
        />

        {error && (
          <p style={styles.error}>
            {error}
          </p>
        )}

        <button
          type="submit"
          style={styles.button}
        >

          {loading
            ? "Loading..."
            : "Login"}

        </button>

        <p style={styles.demoText}>
          Username : emilys
        </p>

        <p style={styles.demoText}>
          Password : emilyspass
        </p>

      </form>

    </div>
  );
}

const styles = {

  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background:
      "linear-gradient(135deg, #24081e, #7511af)",
    fontFamily: "Arial",
  },

  loginBox: {
    width: "350px",
    background: "white",
    padding: "30px",
    borderRadius: "12px",
    boxShadow:
      "0 4px 15px rgba(0,0,0,0.2)",
  },

  heading: {
    textAlign: "center",
    marginBottom: "25px",
    color: "#07010a",
  },

  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    border: "1px solid #7b6868",
    borderRadius: "8px",
    fontSize: "15px",
    outline: "none",
    fontWeight: "bold",
    boxSizing: "border-box",
  },

  button: {
    width: "100%",
    padding: "12px",
    background: "#130112",
    border: "none",
    borderRadius: "8px",
    color: "white",
    fontSize: "16px",
    cursor: "pointer",
  },

  error: {
    color: "red",
    textAlign: "center",
    marginBottom: "10px",
  },

  demoText: {
    marginTop: "10px",
    fontSize: "14px",
    color: "#0d0202",
  },
};

export default Login;