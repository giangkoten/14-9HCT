import axios from "axios";
import React, { useEffect, useState } from "react";

function HomePage() {
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
  //Delete
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8080/api/v1/works/${id}`)
      .then((res) => loadWorks())
      .catch((err) => console.log(err));
  };
  //Create
  const [workNew, setWorkNew] = useState("");
  const [descriptionNew, setDescriptionNew] = useState("");
  const handleSubmitCreate = (e) => {
    e.preventDefault();
    const newWork = {
      name: workNew,
      description: descriptionNew,
    };
    axios
      .post(`http://localhost:8080/api/v1/works/`, newWork)
      .then((res) => (loadWorks(), setDescriptionNew(), setWorkNew()))
      .catch((err) => console.log(err));
  };
  //Edit
  const [editName, setEditName] = useState("");
  const [editDes, setEditDes] = useState("");
  const [editId, setEditId] = useState("");
  const handleEdit = (id) => {
    axios
      .get(`http://localhost:8080/api/v1/works/${id}`)
      .then((res) => {
        const workData = res.data.data[0];
        setEditId(id);
        setEditName(workData.name);
        setEditDes(workData.description);
      })
      .catch((err) => console.log(err));
  };
  const handleSubmitEdit = (e) => {
    e.preventDefault();
    const editWork = { name: editName, description: editDes };
    axios
      .patch(`http://localhost:8080/api/v1/works/${editId}`, editWork)
      .then((res) => loadWorks())
      .catch((err) => console.log(err));
  };
  return (
    <div className="container ">
      <div className="mb-5 mt-5">
        <form onSubmit={handleSubmitCreate}>
          {" "}
          <div className="row">
            <h4>Create works</h4>
            <div className="col-4">
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                value={workNew}
                onChange={(e) => setWorkNew(e.target.value)}
              />
            </div>
            <div className="col-4">
              <input
                type="text"
                className="form-control"
                placeholder="Description"
                value={descriptionNew}
                onChange={(e) => setDescriptionNew(e.target.value)}
              />
            </div>
            <div className="col-4">
              <button type="submit" className="btn btn-success">
                Success
              </button>
            </div>
          </div>
        </form>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Tên công việc</th>
            <th scope="col">Miêu tả công việc</th>
            <th scope="col" colSpan={2}>
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {works.map((e, i) => (
            <tr key={i}>
              <th scope="row">{i + 1}</th>
              <td>{e.name}</td>
              <td>{e.description}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  onClick={() => handleEdit(e.work_id)}
                >
                  Update
                </button>
                <button
                  type="button"
                  class="btn btn-danger"
                  onClick={() => handleDelete(e.work_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <>
        {/* Modal */}
        <form onSubmit={handleSubmitEdit}>
          <div
            className="modal fade"
            id="exampleModal"
            tabIndex={-1}
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">
                    Update work
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  />
                </div>
                <div className="modal-body">
                  <div className="row">
                    <div className="col-6">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Name"
                        name="editName"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                      />
                    </div>
                    <div className="col-6">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Description"
                        name="editDes"
                        value={editDes}
                        onChange={(e) => setEditDes(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </>
    </div>
  );
}

export default HomePage;
