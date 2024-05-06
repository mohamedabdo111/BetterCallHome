import React, { useState, useEffect } from "react";
import "../../../App.css";
import { Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faDollarSign,
  faLocationArrow,
  faMapMarkerAlt,
  faUsers,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { UseGetDateToken } from "../../../hocks/useGetData";
import img from "../../../Components/images/photo_2024-03-21_21-37-11.jpg";
import Adminnavbar from "../../../Components/admin/Adminnavbar";
import { Link } from "react-router-dom";
import Sidebar from "../user/Filter";

const UserShowApartments = () => {
  const [apartments, setApartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [search, setSearch] = useState("");

  const getAppartments = async () => {
    setLoading(true);
    try {
      const res = await UseGetDateToken("/api/User/GetApartmentsMain", {
        params: {
          PageNumber: page,
          PageSize: pageSize,
          Search: search,
          OwnerId: JSON.parse(localStorage.getItem("data-user")).userId,
        },
      });
      console.log("Response:", res);
      setApartments(res.data.date);
      setTotalPages(Math.ceil(res.data.totalCount / pageSize));
    } catch (error) {
      console.error("Error fetching apartments:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getAppartments();
  }, [page, pageSize, search]);

  const paginate = (pageNumber) => {
    setPage(pageNumber);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!Array.isArray(apartments) || apartments.length === 0) {
    return (
      <div className="line-space text-center my-5">No apartments found.</div>
    );
  }

  // console.log(apartments);
  return (
    <div>
      {/* // <div className="filter"> */}
      <div className="mt-4 ms-4">
        <Row>
          <Col xs="1" md="12">
            <div style={{ display: "flex" }}>
              <div className="col-md-8" style={{ marginLeft: "185px" }}>
                <Adminnavbar />
              </div>
              <div style={{ marginTop: "10px", marginLeft: "50px" }}>
                <Sidebar />
              </div>
              <div
                className="icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-11 icon-header-noti js-show-cart"
                data-notify="2"
              ></div>
            </div>
            {/* ////////////////////////////////// */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                marginLeft: "140px",
                marginTop: "-590px",
              }}
            >
              {apartments.map((apartment, index) => (
                <div
                  key={apartment.id}
                  className="apartment-card"
                  style={{
                    width: "372px",
                    height: "339px",
                    borderRadius: "15px",
                    textAlign: "right",
                    marginLeft: index % 3 === 0 ? "0" : "45px",
                    backgroundColor: "white",
                    marginBottom: "50px",
                  }}
                >
                  {apartment.imageURL ? (
                    <Link
                      to={`/user/apartment-details/${apartment.apartmentID}`}
                    >
                      <img
                        src={apartment.imageURL}
                        alt={apartment.name}
                        style={{
                          width: "100%",
                          height: "174px",
                          borderRadius: "15px",
                          objectFit: "cover",
                        }}
                      />
                    </Link>
                  ) : (
                    <img
                      src={img}
                      style={{
                        width: "100%",
                        height: "174px",
                        borderRadius: "15px",
                        objectFit: "cover",
                      }}
                      alt="Default Apartment Image"
                    />
                  )}

                  <div className="apartment-details">
                    <h2 style={{ fontSize: "20px", marginTop: "5px" }}>
                      <span style={{ marginRight: "10px" }}>
                        {apartment.name}
                      </span>
                      <FontAwesomeIcon icon={faHome} />
                    </h2>
                    <p style={{ color: "#69B99D" }}>
                      <span style={{ marginRight: "10px" }}>
                        {apartment.salary} EGP{" "}
                      </span>
                      <FontAwesomeIcon
                        style={{ fontSize: "20px" }}
                        icon={faDollarSign}
                      />
                    </p>
                    <p style={{ marginTop: "-9px" }}>
                      {" "}
                      {apartment.description}
                    </p>
                    <p style={{ marginTop: "-9px" }}>
                      {" "}
                      <span style={{ marginRight: "10px" }}>
                        {apartment.city ? apartment.city : "دمياط"}
                      </span>
                      <FontAwesomeIcon
                        style={{ fontSize: "20px" }}
                        icon={faLocationArrow}
                      />
                    </p>
                    <p style={{ marginTop: "-9px" }}>
                      <span style={{ marginRight: "10px" }}>
                        {" "}
                        {apartment.address}
                      </span>
                      <FontAwesomeIcon
                        style={{ fontSize: "20px" }}
                        icon={faMapMarkerAlt}
                      />
                    </p>
                    <p style={{ marginTop: "-9px" }}>
                      <span style={{ marginRight: "10px" }}>(4/0) </span>
                      <FontAwesomeIcon
                        style={{ fontSize: "20px" }}
                        icon={faUsers}
                      />
                    </p>
                  </div>
                </div>
              ))}
            </div>
            {totalPages > 1 && (
              <div
                className="pagination"
                style={{ marginLeft: "370px", marginTop: "20px" }}
              >
                <button
                  style={{
                    width: "40px",
                    border: "none",
                    borderRadius: "5px",
                    height: "45px",
                    marginBottom: "10px",
                    marginTop: "10px",
                  }}
                  onClick={() => paginate(page - 1)}
                  disabled={page === 1}
                >
                  &lt;
                </button>
                {Array.from({ length: totalPages }).map((_, index) => (
                  <button
                    key={index}
                    style={{
                      width: "40px",
                      borderRadius: "5px",
                      marginLeft: "7px",
                      height: "45px",
                      marginBottom: "10px",
                      marginTop: "10px",
                      color: page === index + 1 ? "blue" : "black",
                      border: page === index + 1 ? "1px solid blue" : "none",
                    }}
                    onClick={() => paginate(index + 1)}
                  >
                    {index + 1}
                  </button>
                ))}
                <button
                  style={{
                    width: "40px",
                    border: "none",
                    borderRadius: "5px",
                    height: "45px",
                    marginLeft: "7px",
                    marginBottom: "10px",
                    marginTop: "10px",
                  }}
                  onClick={() => paginate(page + 1)}
                  disabled={page === totalPages}
                >
                  &gt;
                </button>
              </div>
            )}
          </Col>
        </Row>
      </div>
      {/* </div> */}
    </div>
  );
};

export default UserShowApartments;
