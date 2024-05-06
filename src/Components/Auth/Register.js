import React, { useState } from "react";
import {
  Button,
  Col,
  Dropdown,
  DropdownButton,
  Form,
  Row,
  Spinner,
} from "react-bootstrap";
import img from "../images/login img.png";
import logo from "../images/Group11.png";
import "../../style.css";
import { Link } from "react-router-dom";
import google from "../images/google.png";
import facebook from "../images/facebook1.png";
import Regester_hock from "../../hocksJs/auth_hocks/regester_hock";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import male from "../images/male.png";
import female from "../images/female.png";
const SignUp = () => {
  const [
    username,
    email,
    password,
    confpassword,
    phone,
    onSubmit,
    onChangeUsername,
    onChangeEmail,
    onChangePassword,
    onChangeConfirmPassword,
    onChangePhone,
    gender,
    onClickLablemale,
    onClickLablefemale,
    loading,
    isPress,
    ChangeUserType,
  ] = Regester_hock();
  return (
    <div className=" bor">
      <Row className="m-0">
        <Col xs="9" md="6" className=" bg-white formLogin">
          <div className=" text-center px-5">
            <div className=" text-center login-header p-2 pt-5 line-space">
              Create Account
            </div>
            <div className="my-5">
              <img src={logo} alt="logo"></img>
            </div>

            <div>
              <Form>
                <Form.Group className="mb-4">
                  <Form.Control
                    type="text"
                    className="p-2 inputs"
                    placeholder="Username"
                    value={username}
                    onChange={onChangeUsername}
                  />
                </Form.Group>
                <Form.Group className="mb-4">
                  <Form.Control
                    type="text"
                    className="p-2 inputs"
                    placeholder="Email"
                    value={email}
                    onChange={onChangeEmail}
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Control
                    type="phone"
                    className="p-2 inputs"
                    placeholder="phone number"
                    value={phone}
                    onChange={onChangePhone}
                  />
                </Form.Group>

                <Form.Group className="mb-4" controlId="formBasicPassword">
                  <Form.Control
                    type="password"
                    className="p-2 inputs"
                    placeholder="Password"
                    value={password}
                    onChange={onChangePassword}
                  />
                </Form.Group>
                <Form.Group className="mb-5" controlId="formBasicPasswordtwo">
                  <Form.Control
                    type="password"
                    className="p-2 inputs"
                    placeholder="Confirm Password"
                    value={confpassword}
                    onChange={onChangeConfirmPassword}
                  />
                </Form.Group>

                <div className=" d-flex justify-content-around mb-2">
                  <div className=" d-flex align-items-center gap-2">
                    <img src={male}></img>
                    <input
                      className="form-check-input ml-2 pointer"
                      type="radio"
                      name="option"
                      value="gender"
                      id="male"
                      onClick={onClickLablemale}
                    />
                  </div>
                  <div className=" d-flex align-items-center gap-2">
                    <img src={female}></img>
                    <input
                      type="radio"
                      name="option"
                      value="gender"
                      id="female"
                      onClick={onClickLablefemale}
                      className="form-check-input ml-2 pointer"
                    />
                  </div>
                </div>
                <Form.Select
                  aria-label="Default select example"
                  className="mb-4 mt-3"
                  onChange={ChangeUserType}
                >
                  <option value="0">User Type</option>
                  <option value="owner">Owner</option>
                  <option value="user">User</option>
                </Form.Select>

                <Button
                  variant="primary"
                  className="loginbtn colorbtns border-0 w-100 fw-bold "
                  onClick={onSubmit}
                >
                  SignUp
                </Button>

                <div className="afterbtn d-flex justify-content-center p-3 flex-wrap">
                  <p className="coloring my-2 missed">
                    Already have an account?
                    <Link to="/login" className=" text-center">
                      <span className="colortext"> LOGIN</span>
                    </Link>
                  </p>
                </div>

                {/* <div className="signwith d-flex justify-content-between flex-wrap my-3">
                  <div className="col-sm-12 col-md-5 col-12 p-1 gap-2">
                    <img
                      src={google}
                      alt="google"
                      style={{ width: "50px" }}
                    ></img>
                    <p className="m-0">sign with Google</p>
                  </div>

                  <div className=" col-sm-12 col-md-5  col-12 gap-2 p-1">
                    <img
                      src={facebook}
                      alt="facebook"
                      style={{ width: "50px" }}
                    ></img>
                    <p className="m-0">sign with facebook</p>
                  </div>
                </div> */}
              </Form>
            </div>
          </div>
        </Col>
        <Col xs="3" md="6" className="m-0 p-0 imageLogin">
          <img
            src={img}
            className="background-Image"
            alt="logo"
            style={{ height: "100%" }}
          ></img>
        </Col>
      </Row>
      {isPress ? (
        loading ? (
          <div className="loadingtrue">
            <Spinner animation="border" />
          </div>
        ) : null
      ) : null}
      <ToastContainer />
    </div>
  );
};

export default SignUp;
