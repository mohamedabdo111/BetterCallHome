import React, { useState, useEffect } from "react";
import "../../App.css";
import { Col, Row } from "react-bootstrap";
import Adminnavbar from "./Adminnavbar";
import img from "../../Components/images/photo_2024-03-21_21-37-11.jpg";
import img2 from "../../Components/images/photo_2024-03-03_14-38-27.jpg";
import { UseGetDateToken } from "../../hocks/useGetData";
import { UsePostDateToken } from "../../hocks/usePostDate";

const Adminpending = () => {
  const [appartments, setAppartments] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");

  const getPending = async () => {
    setLoading(true);
    try {
      const res = await UseGetDateToken("/api/Admin/GetPendingApartments", {
        params: {
          PageNumber: page,
          PageSize: pageSize,
          Search: search,
        },
      });

      setAppartments(res.data);
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  useEffect(() => {
    getPending();
  }, []);

  const handleApprove = async (status, id) => {
    try {
      const res = await UsePostDateToken("/api/Admin/PendingResponse", {
        apartmentID: id,
        accept: status === "approve" ? true : false,
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    } finally {
      getPending();
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className=" mt-4 ms-4 editprofi overviewtog">
      <Adminnavbar />
      <Row>
        <Col xs="12" md="7">
          {appartments.date.length === 0 ? (
            <div
              style={{
                fontWeight: "bold",
                fontSize: "20px",
                marginTop: "20px",
              }}
            >
              No pending appartments
            </div>
          ) : (
            appartments.date.map((appartment) => (
              <>
                <div className="adminpending" style={{ marginBottom: "100px" }}>
                  <div className="pending">
                    <img
                      className="headerpending"
                      src={appartment.ownerImage ? appartment.ownerImage : img2}
                      alt="img"
                    ></img>

                    <div className="infoo">
                      <h3>{appartment.ownerName}</h3>
                      <p>
                        {appartment.publishedAt
                          .split("T")[0]
                          .split("-")
                          .reverse()
                          .join("-")}
                      </p>
                    </div>
                  </div>
                  <div className="sectiontwo">
                    <div className="content">
                      <p style={{ marginTop: "3px" }}>
                        New post uploaded by {appartment.ownerName} under the
                        title of {appartment.apartmentTitle}
                      </p>
                    </div>
                    <div className="ss">
                      <img
                        className="photo"
                        src={
                          appartment.apartmentsPics.length > 0
                            ? appartment.apartmentsPics[0]
                            : img
                        }
                        alt="img"
                      ></img>
                      <div className="approve">
                        <p>Located in {appartment.address}</p>
                        <h4 className="m">
                          {appartment.numberOfUsers} residents{" "}
                        </h4>
                        <h5 className="r">{appartment.salary} EGP</h5>
                      </div>
                      <button
                        className="backbutton"
                        onClick={() =>
                          handleApprove("approve", appartment.apartmentID)
                        }
                      >
                        Accept
                      </button>
                      <button
                        className="backbuttons"
                        onClick={() =>
                          handleApprove("decline", appartment.apartmentID)
                        }
                      >
                        Decline
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ))
          )}
        </Col>
      </Row>
    </div>
  );
};

export default Adminpending;
