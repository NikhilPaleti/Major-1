import React, {useState, useEffect} from 'react'
import './register.css'
import { useNavigate, Link } from "react-router-dom"
import axios from 'axios'
import { registerRoute } from "../utils/APIRoutes";


function Register() {

  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  const nav = useNavigate();

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };
  
  const handleSubmission = async (event) => {
    event.preventDefault()
    console.log(event.target)
    const { username, password } = values;

      const { data } = await axios.post(registerRoute, {
        username,
        password,
      });
      console.log(data)

      if (data.status === false) {
        // toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        localStorage.setItem(
          process.env.REACT_APP_LOCALHOST_KEY,
          JSON.stringify(data.user)
        );
        nav("/");
      }
  };
  
  return (
    <div className='StyledContainer'> 
      <form action="" onSubmit={(event) => handleSubmission(event)}>
        <div className="Title">
          <h1>SECURE CHAT</h1>
        </div>
        <input
          name="username"
          placeholder="Username"
          type="text"
          onChange={(event) => handleChange(event)}
        />
        <input
          name="password"
          placeholder="Password"
          type="password"
          onChange={(event) => handleChange(event)}
        />
        <button type="submit">Create Account</button>
        <span>
          <Link to="/login">Login</Link>
        </span>
      </form>
    </div> 
  );
}

export default Register