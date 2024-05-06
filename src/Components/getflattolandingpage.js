import React, { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { UseGetDateToken } from "../hocks/useGetData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLongArrowAltRight } from "@fortawesome/free-solid-svg-icons";
const UserShowFlat = () => {
  const [apartments, setApartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await UseGetDateToken(
          "/api/Apartment/GetApartmentLandingPage",
          {
            params: {
              OwnerId: JSON.parse(localStorage.getItem("data-user")).userId,
              Search: search,
            },
          }
        );
        console.log("Response:", res);
        setApartments(res.data.data);
      } catch (error) {
        console.error("Error fetching apartments:", error);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="line-space text-center my-5">Loading...</div>;
  }

  if (!Array.isArray(apartments) || apartments.length === 0) {
    return (
      <div className="line-space text-center my-5">No apartments found.</div>
    );
  }

  return (
    <div style={{ backgroundColor: "#D8D1D142" }}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          marginLeft: "150px",
        }}
      >
        <div style={{ paddingTop: "20px", paddingBottom: "20px" }}>
          <h2
            style={{
              fontFamily: "Roboto",
              fontWeight: "300",
              color: "#9DC3D6",
              fontSize: "55px",
            }}
          >
            Top Property
          </h2>
          <p
            style={{
              fontFamily: "Roboto",
              fontWeight: "400",
              fontSize: "18px",
              color: "#73788C",
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
            }}
          >
            Discover our exclusive selection of the finest one-of-a-kind luxury
            <br />
            properties architectural masterpieces.
          </p>
        </div>
        <div className=" col-md-2 offset-md-8" style={{}}>
          <div
            style={{
              textAlign: "center",

              color: "black",
              backgroundColor: "white",
              width: "200px",
              height: "50px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "-90px",
            }}
          >
            <div>
              <a href="/user/AllApartment" id="makeblack">
                <div>
                  {""}
                  View more{""}
                  <FontAwesomeIcon
                    style={{ marginLeft: "10px" }}
                    icon={faLongArrowAltRight}
                  />
                  {""}
                </div>
              </a>
            </div>
          </div>
        </div>

        {apartments.map((apartment) => (
          <div
            key={apartment.id}
            className="apartment-card"
            style={{
              width: "376px",
              height: "472px",
              margin: "0 15px 30px 0",
              backgroundColor: "white",
              boxShadow: "1px 1px 1px 2px  #DEDCDA",
            }}
          >
            <div style={{ textAlign: "center" }}>
              {apartment.image ? (
                <img
                  src={apartment.image}
                  alt={apartment.name}
                  style={{
                    width: "320px",
                    height: "250px",
                    marginTop: "10px",
                    boxShadow: "0px 4px 4px 0px #00000040",
                  }}
                />
              ) : (
                <p>No image available</p>
              )}

              <h2 style={{ fontSize: "20px", paddingTop: "12px" }}>
                <span style={{ marginRight: "10px" }}>{apartment.name}</span>
              </h2>
              <p style={{ marginTop: "-9px" }}>
                {" "}
                <span style={{ marginRight: "10px" }}>
                  {apartment.city ? apartment.city : "دمياط"}
                </span>
              </p>
              <p style={{ color: "#69B99D" }}>
                <span style={{ marginRight: "10px" }}>
                  {apartment.price} EGP{" "}
                </span>
              </p>

              <button
                style={{
                  width: "330px",
                  height: "50px",
                  backgroundColor: "white",
                  border: "1px solid #69B99D",
                  color: "#69B99D",
                  marginTop: "20px",
                }}
              >
                Detail
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserShowFlat;
