import React, { useState, useEffect } from "react";
import "../../App.css";
import Adminnavbar from "../admin/Adminnavbar";
import { Col, Row } from "react-bootstrap";
import img from "../../Components/images/photo_2024-03-21_21-37-11.jpg";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { UseGetDateToken } from "../../hocks/useGetData";
import axios from "axios";

const AdminShowApartments = () => {
  const [apartments, setApartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [search, setSearch] = useState("");
  const [error, setError] = useState(null);

  const getApartments = async () => {
    setLoading(true);
    try {
      const ownerId = JSON.parse(localStorage.getItem("data-user")).userId;
      console.log("OwnerId:", ownerId);

      const res = await UseGetDateToken("/api/Owner/GetOwnerApartments", {
        params: {
          PageNumber: page,
          PageSize: pageSize,
          Search: search,
          OwnerId: ownerId,
        },
      });

      console.log("Response:", res);

      if (res && res.data && res.data.date) {
        setApartments(res.data.date);
        setTotalPages(Math.ceil(res.data.length / pageSize));
        console.log(res.data.date);
      } else {
        setError("No data received from server");
      }
    } catch (error) {
      console.error("Error fetching apartments:", error);
      setError("An error occurred while fetching data");
    }
    setLoading(false);
  };

  useEffect(() => {
    getApartments();
  }, [page, pageSize, search]);
  const token = localStorage.getItem("token");
  const deleteApartment = async (id) => {
    console.log(id);
    setLoading(true);
    try {
      // Send DELETE request to delete the apartment with the specified id
      await axios.delete(
        `http://bettercallhomeapii.somee.com/api/Owner/DeleteApartment?ApartmentId=${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Use the retrieved token here
          },
        }
      );

      // Update the apartments list after deletion
      const ownerId = JSON.parse(localStorage.getItem("data-user")).userId;
      const res = await UseGetDateToken("/api/Owner/GetOwnerApartments", {
        params: {
          PageNumber: page,
          PageSize: pageSize,
          Search: search,
          OwnerId: ownerId,
        },
      });

      console.log("Response:", res);

      if (res && res.data && res.data.date) {
        setApartments(res.data.date);
        setTotalPages(Math.ceil(res.data.length / pageSize));
        console.log(res.data.date);
      } else {
        setError("No data received from server");
      }
    } catch (error) {
      console.error("Error deleting apartment:", error);
      setError("An error occurred while deleting the apartment");
    }
    setLoading(false);
  };

  // Pagination function
  const paginate = (pageNumber) => setPage(pageNumber);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  console.log(apartments);
  return (
    <div className="mt-4 ms-4 overviewtog">
      <Adminnavbar />
      <Row>
        <Col xs="12" md="7">
          <h5 className="notification-header mt-4 mb-4">
            Flat
            <div></div>
          </h5>

          {apartments.length === 0 ? (
            <div
              style={{
                fontWeight: "bold",
                fontSize: "20px",
                marginTop: "20px",
              }}
            >
              No apartments found
            </div>
          ) : (
            apartments.map((apartment) => (
              <div key={apartment.id} className="conntt">
                <div className="left-side">
                  {/* <div className="triangle-up"></div> */}
                  <div>
                    <img
                      className="photoowner"
                      style={{
                        position: "relative",
                        height: "300px",
                        width: "608px",
                        margin: "auto",
                        border: "1px solid white",
                        borderRadius: "15px",
                        marginleft: "1px",
                      }}
                      src={
                        apartment.apartmentsPics &&
                        apartment.apartmentsPics.length > 0
                          ? apartment.apartmentsPics[0]
                          : img
                      }
                      alt="Apartment"
                    />
                    <FontAwesomeIcon
                      style={{
                        position: "absolute",
                        marginLeft: "-35px",
                        marginTop: "7px",
                        color: "#DA100B",
                        fontSize: "26px",
                      }}
                      icon={faTimesCircle}
                      onClick={() => deleteApartment(apartment.apartmentID)}
                    />
                  </div>

                  {/* {apartments.length > 0 && <div className="triangle-up"></div>} */}
                  <div className="info">
                    <div>
                      <Link
                        to={`/owner/edit-apartment/${apartment.apartmentID}`}
                        className="linkedit"
                        style={{ marginLeft: "450px" }}
                      >
                        <button
                          style={{
                            marginleft: "30px",
                            display: "inline",
                            color: "#1672EC",
                            border: "2px solid #1672EC",
                            background: "white",
                            width: "80px",
                            height: "31px",
                            borderRadius: "5px",
                            marginTop: "10px",
                            position: "absolute",
                            zIndex: "2",
                            left: "1140px",
                          }}
                        >
                          <FontAwesomeIcon
                            style={{ marginRight: "5px" }}
                            icon={faPen}
                          />
                          Edit
                        </button>
                      </Link>
                    </div>
                  </div>
                  <div style={{ marginTop: "20px" }}>
                    <h3>{apartment.apartmentTitle}</h3>
                  </div>
                  <div className="span">
                    <p>{apartment.description}</p>
                  </div>
                  <div className="price">
                    <p style={{ fontWeight: "450", fontFamily: "Roboto" }}>
                      {apartment.address}
                    </p>
                  </div>
                  <div className="details">
                    <h5>{apartment.salary} EGP</h5>
                  </div>
                  <div className="butt">
                    <h5>{apartment.numberOfUsers} Users</h5>
                  </div>
                </div>
              </div>
            ))
          )}

          {/* Pagination */}
          <div className="pagination" style={{ marginLeft: "370px" }}>
            <button onClick={() => paginate(page - 1)} disabled={page === 1}>
              &lt;
            </button>
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => paginate(index + 1)}
                className={page === index + 1 ? "active" : ""}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => paginate(page + 1)}
              disabled={page === totalPages}
            >
              &gt;
            </button>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default AdminShowApartments;
