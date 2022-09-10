import React from "react";
import {FaDownload} from "react-icons/fa";
import BodyContentHeader from "../common/BodyContentHeader";
import Pdf from "../TAadland_Resume.pdf";
const Resume = () => {
  return (
    <div>
      <BodyContentHeader
        headerTitle="Resume"
        headerSubtitle="Status: Open to work"
        imgSrc="planet_dark.svg"
        imgAlt="planet dark mode"
      />

      <div className="body_content_text">
      <div
            className="contact_info"
            style={{width: "fit-content", margin: "auto"}}
          >
            <FaDownload />
            <a href={Pdf} rel="noopener noreferrer" target="_blank">
              Download PDF
            </a>
          </div>

        <div style={{fontFamily: "sans-serif", textAlign: "left"}}>
          <h2>Technical Skills</h2>
          <hr />
          <b>Programming:</b> React, Javascript, Django, Python
          <br />
          <b>Web Development:</b> HTML, CSS, Sass
          <br />
          <b>Tools:</b> Git, GitHub, npm, Yarn, DigitalOcean, PostgreSQL,
          Three.js
          <br />
          <b>DevOps Software:</b> Figma, Lucidchart, Jira, Trello
          <br />
          <b>Art and Design Software:</b> Adobe Photoshop, Adobe Illustrator,
          Adobe Animate, Clip Studio Paint, Procreate
        </div>
      </div>

      <div className="body_content_text">
        <div style={{fontFamily: "sans-serif", textAlign: "left"}}>
          <h2>Experience</h2>
          <hr />
          <b>
            Van Robotics, Columbia SC - UI Designer/Developer (July 2018 -
            present)
          </b>
          <ul>
            <li>
              Designed and developed web interfaces with Django to accompany the
              ABii robot, a smart robot tutor for assisting children with math,
              language arts, and SEL skills.
            </li>
            <li>
              Designed and developed a lesson creation tool using React.js,
              allowing teachers to create custom lessons for ABii and export
              them to the robot for use in classrooms.
            </li>
            <li>
              Designed and developed an image creation web app using React.js
              and Three.js, allowing teachers to create illustrations and
              diagrams for their custom lessons.
            </li>
            <li>
              Ensured mobile compatibility with ABii through mobile-first design
              strategies and rigorous iPad testing.
            </li>
            <li>
              Created wireframes and flowcharts for drafting new development
              projects with Figma and LucidChart.
            </li>
            <li>
              Assisted other developers in project testing phases through GitHub
              peer review, Jira, and Trello.
            </li>
            <li>
              Provided hundreds of raster and vector illustrations for
              tutorials, assessments, and stories using Adobe Illustrator.
            </li>
            <li>
              Animated characters in Adobe Animate and exported them to HTML
              canvas and Javascript for a more immersive and interactive
              learning experience.
            </li>
          </ul>
          <b>
            Independent Contractor, Columbia, SC - Freelance Digital Artist
            (January 2022 - present)
          </b>
          <ul>
            <li>
              Accepted commissions and contracts for independent illustration
              and character design work.
            </li>
            <li>
              Collaborated with clients, handled pricing, and negotiated
              copyright terms and conditions for personal and commercial work.
            </li>
            <li>
              Designed and edited characters to accompany a broad range of
              media, from YouTube videos to research proposals.
            </li>
          </ul>
          <b>
            USC Center for Digital Humanities, Columbia SC - Full-Stack Web
            Developer (May 2018 - August 2018)
          </b>
          <ul>
            <li>
              Developed a grant-funded web archive of historical media for the
              city of Columbia, on behalf of the African American Studies
              department at the University of South Carolina.
            </li>
            <li>
              Assisted in the design of the WardOne app, an iOS app which
              contained a digital tour of historic downtown Columbia with the
              use of the Google Maps API.
            </li>
          </ul>
        </div>
      </div>

      <div className="body_content_text">
        <div style={{fontFamily: "sans-serif", textAlign: "left"}}>
          <h2>Education</h2>
          <hr />
          <b>
            University of South Carolina, Columbia SC - Bachelor of Science in
            Computer Science, Minor in Media Arts (2018)
          </b>
        </div>
      </div>
    </div>
  );
};

export default Resume;
