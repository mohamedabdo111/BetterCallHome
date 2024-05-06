import React from "react";
import "../../App.css"; 
import img from "../../Components/images/5df63bd5005f9c7615753f39306b2760.jpeg";
import img1 from "../../Components/images/1996f6471638ae7cc917110f05470551.png";
import img2 from "../../Components/images/80cbe4fdb55341eafcc8f6768afe17f5.jpeg";
import img3 from "../../Components/images/87464cd1ca92726082bffab4236cc106.jpeg";
import img4 from "../../Components/images/photo_2024-04-20_04-17-42.jpg";
import img5 from "../../Components/images/photo_2024-04-20_04-28-14.jpg";
import img6 from "../../Components/images/photo_2024-04-20_04-32-08.jpg";
import img0 from "../../Components/images/pic.jpeg"
const AboutPage = () => {
    return (
      <div >
    <div style={{backgroundColor: "white"  }}>
      <section>
        <div className="firstsections">
          <div className="firstsectionwordd2">
            <div className="mainHeaddd">Better Call</div>
            <div className="mainHeadContainnn">Home</div>
          </div>
          <div className="camp">
            <div className="containerr">
              <img className="mainImgg2" src={img0} alt="img1" />
              <div className="text-overlay">
                <h1 className="ll">About Us</h1>
                <p className="opp">
                  Better Call home is a real estate agency that helps you find
                  homes easily with your specific characteristics nd
                  requirements, Better Call Home helps you find estates either
                  for buying, selling and renting
                </p>
                <button className="soo">See More</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="combined">
        <div className="logo">
          <img src={img1} alt="Logo" />
        </div>
        <div className="content3">
          <h1>Better Call Home</h1>
          <p style={{ marginTop: "25px", color: "#848383" }}>
            It started out as a graduation project in our senior year <br />{" "}
            studying in New Damietta Faculty of Computers and <br />
            Artificial Intelligence. Everything starts with a dream <br /> and
            this is ours at the moment.
          </p>
        </div>
      </div>

      <div className="cuis">
        <h1 style={{ marginBottom: "30px", fontFamily: "Source Serif Pro" }}>
          Founders
        </h1>
      </div>

      <div className="image-gallery">
        <div className="top">
          <div style={{ marginLeft: "" }}>
            <img
              style={{
                width: "246px",
                height: "299px",
                boxShadow: "0px 4px 4px 0px #00000040",
              }}
              src={img}
              alt="Image 1"
            />
            <div
              style={{
                width: "250px",
                height: "65px",
                backgroundColor: "#F6F6F6",
                textAlign: "center",
                marginTop: "50px",
              }}
            >
              <h5>Ahmed Samy</h5>
              <p>Backend Developer</p>
            </div>
          </div>
          <div style={{ marginLeft: "200px" }}>
            <img
              style={{
                width: "240px",
                height: "299px",
                boxShadow: "0px 4px 4px 0px #00000040",
              }}
              src={img2}
              alt="Image 1"
            />
            <div
              style={{
                width: "250px",
                height: "65px",
                backgroundColor: "#F6F6F6",
                textAlign: "center",
                marginTop: "50px",
              }}
            >
              <h5>Ramez Mousa</h5>
              <p>UI/UX developer</p>
            </div>
          </div>
          <div style={{ marginLeft: "200px" }}>
            <img
              style={{
                width: "246px",
                height: "299px",
                boxShadow: "0px 4px 4px 0px #00000040",
              }}
              src={img3}
              alt="Image 1"
            />
            <div
              style={{
                width: "250px",
                height: "65px",
                backgroundColor: "#F6F6F6",
                textAlign: "center",
                marginTop: "50px",
              }}
            >
              <h5>Mohamed Zidan</h5>
              <p>Frontend Developer</p>
            </div>
          </div>
        </div>
      </div>
      <div style={{ marginTop: "70px" }} className="image-gallery">
        <div className="top">
          <div>
            <img
              style={{
                width: "246px",
                height: "299px",
                boxShadow: "0px 4px 4px 0px #00000040",
              }}
              src={img4}
              alt="Image 1"
            />
            <div
              style={{
                width: "250px",
                height: "65px",
                backgroundColor: "#F6F6F6",
                textAlign: "center",
                marginTop: "50px",
              }}
            >
              <h5>Raneem Magdy</h5>
              <p>Frontend Developer</p>
            </div>
          </div>
          <div style={{ marginLeft: "200px" }}>
            <img
              style={{
                width: "246px",
                height: "299px",
                boxShadow: "0px 4px 4px 0px #00000040",
              }}
              src={img5}
              alt="Image 1"
            />
            <div
              style={{
                width: "250px",
                height: "65px",
                backgroundColor: "#F6F6F6",
                textAlign: "center",
                marginTop: "50px",
              }}
            >
              <h5>Sama Osama</h5>
              <p>Frontend Developer</p>
            </div>
          </div>
          <div style={{ marginLeft: "200px" }}>
            <img
              style={{
                width: "246px",
                height: "299px",
                boxShadow: "0px 4px 4px 0px #00000040",
              }}
              src={img6}
              alt="Image 1"
            />
            <div
              style={{
                width: "250px",
                height: "65px",
                backgroundColor: "#F6F6F6",
                textAlign: "center",
                marginTop: "50px",
              }}
            >
              <h5>Mai Amer</h5>
              <p>System Analysis</p>
            </div>
          </div>
        </div>
      </div>
            </div>
        </div>
  );
};

export default AboutPage;
