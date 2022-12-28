import React, {useState} from "react";
import {
  FaCode,
  FaCodeBranch,
  FaCodepen,
  FaDownload,
  FaFigma,
  FaMouse,
  FaPalette,
  FaTerminal,
  FaTrello
} from "react-icons/fa";
import BodyContentHeader from "../common/BodyContentHeader";
import Pdf from "../TAadland_Resume.pdf";
import "./Resume.scss";

const Resume = () => {
  const [resumeIndex, setResumeIndex] = useState(0);

  return (
    <div className="body_content_container_child">
      <BodyContentHeader
        headerTitle="Resume"
        headerSubtitle="Status: Open to work"
        imgSrc="planet_1.svg"
        imgAlt="planet 1"
      />

      <div id="resume_content_container">
        <div id="resume_content_texts">
          <div className={`resume_content_text_${resumeIndex === 0}`}>
            <div style={{fontFamily: "sans-serif", textAlign: "left"}}>
              <h2>Skills</h2>
              <hr />
              <div id="skill_items">
                <div className="skill_item">
                  <FaCode color="white" />
                  Python
                </div>
                <div className="skill_item">
                  <FaCode color="white" />
                  Django
                </div>
                <div className="skill_item">
                  <FaCode color="white" />
                  JavaScript/ES6
                </div>
                <div className="skill_item">
                  <FaTerminal color="white" />
                  PostgreSQL
                </div>
                <div className="skill_item">
                  <FaCodeBranch color="white" />
                  Git, GitHub
                </div>
                <div className="skill_item">
                  <FaCodepen color="white" />
                  React.js, Three.js
                </div>
                <div className="skill_item">
                  <FaMouse color="white" />
                  HTML/CSS/Sass
                </div>
                <div className="skill_item">
                  <FaMouse color="white" />
                  Npm, Yarn
                </div>
                <div className="skill_item">
                  <FaFigma color="white" />
                  Figma, LucidChart
                </div>
                <div className="skill_item">
                  <FaTrello color="white" />
                  Jira, Trello
                </div>
                <div className="skill_item">
                  <FaPalette color="white" />
                  Adobe Creative Cloud
                </div>
              </div>
            </div>
          </div>

          <div className={`resume_content_text_${resumeIndex === 1}`}>
            <div style={{fontFamily: "sans-serif", textAlign: "left"}}>
              <h2>Experience - Van Robotics</h2>
              <hr />
              <b>
                <i>
                  Van Robotics, Columbia SC - UI Designer/Developer (July 2018 -
                  present)
                </i>
              </b>
              <ul>
                <li>
                  Designed and developed websites with Django, JavaScript, and
                  React.js to accompany the ABii robot, a smart robot tutor for
                  assisting children with math, language arts, and SEL skills.
                </li>
                <li>
                  Designed and developed lesson creation and image creation
                  tools using React.js and Three.js, allowing teachers to create
                  illustrations and diagrams for their custom lessons.
                </li>
                <li>
                  Ensured mobile compatibility with ABii through mobile-first
                  design strategi
                </li>
                <li>
                  Created wireframes and flowcharts with Figma and LucidChart.
                </li>
                <li>
                  Assisted other developers in project testing phases through
                  GitHub peer review, Jira, and Trello.
                </li>
                <li>
                  Assisted other developers in project testing phases through
                  GitHub peer review, Jira, and Trello.
                </li>
                <li>
                  Provided hundreds of raster and vector illustrations using
                  Adobe Illustrato
                </li>
                <li>
                  Animated characters in Adobe Animate and exported them to HTML
                  and JavaScript for a more immersive and interactive learning
                  experience.
                </li>
              </ul>
            </div>
          </div>

          <div className={`resume_content_text_${resumeIndex === 2}`}>
            <div style={{fontFamily: "sans-serif", textAlign: "left"}}>
              <h2>Experience - USC Center for Digital Humanities</h2>
              <hr />
              <b>
                <i>
                  USC Center for Digital Humanities, Columbia SC - Full-Stack
                  Web Developer (May 2018 - August 2018)
                </i>
              </b>
              <ul>
                <li>
                  Developed a grant-funded web archive of historical media using
                  Django, on behalf of the African American Studies department
                  at the University of South Carolina.
                </li>
                <li>
                  Assisted in the design of the WardOne app, an iOS app which
                  contained a digital tour of historic downtown Columbia with
                  the use of the Google Maps API.
                </li>
              </ul>
            </div>
          </div>

          <div className={`resume_content_text_${resumeIndex === 3}`}>
            <div style={{fontFamily: "sans-serif", textAlign: "left"}}>
              <h2>Experience - Freelance Digital Artist</h2>
              <hr />
              <b>
                <i>
                  Independent Contractor, Columbia, SC - Freelance Digital
                  Artist (January 2022 - present)
                </i>
              </b>
              <ul>
                <li>
                  Accepted commissions and contracts for independent
                  illustration and character design work.
                </li>
                <li>
                  Collaborated with clients, handled pricing, wrote invoices,
                  and negotiated copyright terms and conditions.
                </li>
                <li>
                  Designed and edited characters to accompany a broad range of
                  media, from YouTube videos to research proposals.
                </li>
              </ul>
            </div>
          </div>

          <div className={`resume_content_text_${resumeIndex === 4}`}>
            <div style={{fontFamily: "sans-serif", textAlign: "left"}}>
              <h2>Education</h2>
              <hr />
              <h3 style={{margin: 0}}>
                University of South Carolina, Columbia SC
              </h3>
              <b>
                <i>B.S. in Computer Science, Minor in Media Arts (2018)</i></b>
            </div>
          </div>
        </div>

        <div id="resume_btns">
          <button
            className={`resume_btn_${resumeIndex === 0}`}
            onClick={() => setResumeIndex(0)}
          >
            Skills
          </button>
          <button
            className={`resume_btn_false experience_btn`}
          >
            Experience
          </button>
          <button
            className={`resume_btn_${resumeIndex === 1} subgroup`}
            onClick={() => setResumeIndex(1)}
          >
            <div className="subgroup_square"></div>Van Robotics
          </button>
          <button
            className={`resume_btn_${resumeIndex === 2} subgroup`}
            onClick={() => setResumeIndex(2)}
          >
            <div className="subgroup_square"></div>USC Center for Digital
            Humanities
          </button>
          <button
            className={`resume_btn_${resumeIndex === 3} subgroup`}
            onClick={() => setResumeIndex(3)}
          >
            <div className="subgroup_square"></div>Freelance Artist
          </button>
          <button
            className={`resume_btn_${resumeIndex === 4}`}
            onClick={() => setResumeIndex(4)}
          >
            Education
          </button>


          <button
        className={`resume_btn_false`}
        
      >
        
        <a href={Pdf} rel="noopener noreferrer" target="_blank">
          <FaDownload />{` `}Download PDF
        </a>
      </button>


        </div>
      </div>
    </div>
  );
};

export default Resume;
