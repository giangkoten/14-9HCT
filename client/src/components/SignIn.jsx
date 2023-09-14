import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
function SignIn() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/v1/users`)
      .then((res) => setUsers(res.data.data))
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const foundUser = users.find(
      (user) => user.user_name === name && user.user_password === password
    );
    if (foundUser && name === "giang") {
      navigate("/userPage");
    } else if (foundUser && name === "admin") {
      navigate("/homeAdmin");
    } else {
      alert("Tài khoản không tồn tại");
    }
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-3"></div>
        <div className="col-6 mt-5">
          <form onSubmit={handleSubmit}>
            <div className="row mb-3">
              <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
                Name
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
            <div className="row mb-3">
              <label
                htmlFor="inputPassword3"
                className="col-sm-2 col-form-label"
              >
                Password
              </label>
              <div className="col-sm-10">
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <button type="submit" className="btn btn-primary ">
              Sign in
            </button>
          </form>
        </div>
        <div className="col-3"></div>
      </div>
    </div>
  );
}

export default SignIn;
