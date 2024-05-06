import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import Adminnavbar from "./Adminnavbar";
import defaultPhoto from "../../Components/images/photo_2024-03-03_14-38-27.jpg";
import { Link } from "react-router-dom";

const Adminuser = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);

  useEffect(() => {
    const token = localStorage.getItem("token"); // Retrieve token from local storage
    axios
      .get("http://bettercallhomeapii.somee.com/api/Admin/GetAllUsers", {
        headers: {
          Authorization: `Bearer ${token}`, // Use the retrieved token here
        },
      })
      .then((response) => {
        setUsers(response.data.date);
        setError(null);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setError("Error fetching users. Please try again later.");
      });
  }, []);
  // Get current users
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleDelete = (userId) => {
    const userToDelete = users.find((user) => user.userId === userId);
    if (!userToDelete) {
      console.log("User not found");
      return;
    }

    axios
      .delete(
        `http://bettercallhomeapii.somee.com/api/Admin/DeleteUser?UserId=${userId}`,
        {
          headers: {
            Authorization: `Bearer ${"token"}`, // Use the retrieved token here
          },
        }
      )
      .then((response) => {
        console.log("User deleted successfully");
        console.log(response);
        setUsers(users.filter((user) => user.userId !== userId));
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          console.log("User not found");
        } else {
          console.error("Error deleting user:", error);
        }
      });
    console.log(userToDelete);
  };

  return (
    <div className="asas mt-4 ms-4 overviewtog">
      <Adminnavbar />
      <div className="rs" style={{ marginTop: "30px" }}>
        <div
          className="contt"
          style={{ boxShadow: "0px 0px 10px 1px gray", marginLeft: "80px" }}
        >
          <div
            className="header"
            style={{ marginLeft: "-173px", marginTop: "10px" }}
          >
            <p>Total users</p>
            <div className="head1">
              <h1>5</h1>
            </div>
          </div>
        </div>
        <div
          className="contt contt1"
          style={{ boxShadow: "0px 0px 10px 1px gray", marginLeft: "40px" }}
        >
          <div
            className="header"
            style={{ marginLeft: "-173px", marginTop: "10px" }}
          >
            <p>Students</p>
            <div className="head2">
              <h1>3</h1>
            </div>
          </div>
        </div>
        <div
          className="contt contt2"
          style={{ boxShadow: "0px 0px 10px 1px gray", marginLeft: "40px" }}
        >
          <div
            className="header"
            style={{ marginLeft: "-173px", marginTop: "10px" }}
          >
            <p>Owner</p>
            <div className="head3">
              <h1>2</h1>
            </div>
          </div>
        </div>
      </div>
      <table
        className="col-md-13"
        style={{
          border: "none",
          // width: "900px",
          marginLeft: "40px",
          height: "300px",
          marginTop: "60px",
        }}
      >
        {/* Table header */}
        <thead>
          <tr className="">
            <th
              className="col-md-3"
              scope="col"
              style={{
                color: "#B1B1B1",
                // width: "300px",
                fontFamily: "Roboto",
                fontSize: "14px",
              }}
            >
              Name <FontAwesomeIcon icon={faCaretDown} />
            </th>
            <th
              scope="col"
              style={{
                color: "#B1B1B1",
                fontFamily: "Roboto",
                fontSize: "14px",
                height: "30px",
                // border:"1px solid black"
              }}
            >
              Phone <FontAwesomeIcon icon={faCaretDown} />
            </th>
            <th
              scope="col"
              style={{
                color: "#B1B1B1",
                fontFamily: "Roboto",
                fontSize: "14px",
              }}
            >
              Role <FontAwesomeIcon icon={faCaretDown} />
            </th>
            <th
              scope="col"
              style={{
                color: "#B1B1B1",
                fontFamily: "Roboto",
                fontSize: "14px",
              }}
            >
              Action <FontAwesomeIcon icon={faCaretDown}></FontAwesomeIcon>
            </th>
          </tr>
        </thead>
        {/* Table body */}
        <tbody>
          {currentUsers.map((user, index) => (
            <tr
              key={user.userId}
              style={{
                backgroundColor: index % 2 === 0 ? "white" : "none",
              }}
            >
              <td>
                <img
                  src={user.photo ? user.photo : defaultPhoto}
                  alt="User"
                  style={{
                    display: "inline",
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                  }}
                />
                <Link
                  to={`/admin/view-user-details/${user.userId}`}
                  className=" text-dark"
                >
                  {" "}
                  <span style={{ marginLeft: "-70px" }}>
                    {typeof user.name === "object"
                      ? user.name.someProperty
                      : user.name}
                  </span>
                </Link>
              </td>

              <td>{user.phone}</td>
              <td>{user.role}</td>
              <td>
                <button
                  className="col-md-25"
                  style={{
                    color: "red",
                    background: "white",
                    border: "1px solid red",
                    borderRadius: "4px",
                  }}
                  onClick={() => handleDelete(user.userId)}
                >
                  <FontAwesomeIcon icon={faTrashAlt} /> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination */}
      <div className="pagination" style={{ marginLeft: "370px" }}>
        <button
          style={{
            width: "40px",
            border: "none",
            borderRadius: "5px",
            height: "45px",
            marginBottom: "10px",
            marginTop: "80px",
          }}
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          &lt;
        </button>
        {Array.from({ length: Math.ceil(users.length / usersPerPage) }).map(
          (_, index) => (
            <button
              key={index}
              style={{
                width: "40px",
                borderRadius: "5px",
                marginLeft: "7px",
                height: "45px",
                marginBottom: "200px",
                marginTop: "80px",
                color: currentPage === index + 1 ? "blue" : "black",
                border: currentPage === index + 1 ? "1px solid blue" : "none",
              }}
              onClick={() => paginate(index + 1)}
            >
              {index + 1}
            </button>
          )
        )}
        <button
          style={{
            width: "40px",
            border: "none",
            borderRadius: "5px",
            height: "45px",
            marginLeft: "7px",
            marginBottom: "10px",
            marginTop: "80px",
          }}
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === Math.ceil(users.length / usersPerPage)}
        >
          &gt;
        </button>
      </div>
      {/* //{" "} */}
    </div>
  );
};

export default Adminuser;
