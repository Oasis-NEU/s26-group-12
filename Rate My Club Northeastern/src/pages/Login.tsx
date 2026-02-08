import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div>
      <h2>Login</h2>
      <form>
        <input type="email" placeholder="Email" />
        <br />
        <input type="password" placeholder="Password" />
        <br />
        <button type="submit">Login</button>
      </form>

      <p>
        Don’t have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
};

export default Login;
