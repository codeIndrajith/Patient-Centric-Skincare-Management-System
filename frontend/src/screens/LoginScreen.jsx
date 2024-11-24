import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Authentication from '../images/Authentication.gif'
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-hot-toast";
import Loader from "../components/Loader";
import '../css/Login.css'

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/questionnaire");
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if(email === '' || password === '') {
      return toast.error("Add all fields")
    }
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate("/questionnaire");
    } catch (err) {
      toast.error(`${err?.data?.message || err.error}`);
    }
  };

  return (
    <div className="signin-container">
      <div className="illustration-container">
        <img
          src={Authentication}
          alt="Illustration"
          className="illustration-img"
        />
      </div>

      <div className="form-container">
        <h1 className="form-header">Wellcome</h1>

        <form onSubmit={submitHandler} className="form">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
            />
          </div>

          <button
            disabled={isLoading}
            type="submit"
            className="btn-submit"
          >
            Sign In
          </button>
        </form>

        {isLoading && <div className="loader"><Loader /></div>}

        <div className="register-link">
          <p>
            New Customer? <Link to="/register">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
