import axios from "axios";
import React, { useEffect, useState } from "react";

function UserPage() {
  const [works, setWorks] = useState([]);
  const loadWorks = () => {
    axios
      .get(`http://localhost:8080/api/v1/works`)
      .then((res) => setWorks(res.data.data))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    loadWorks();
  }, []);
  return (
    <div className="container">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
          </tr>
        </thead>
        <tbody>
          {works.map((e, i) => (
            <tr key={i}>
              <th scope="row">{i + 1}</th>
              <td>{e.name}</td>
              <td>{e.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserPage;
