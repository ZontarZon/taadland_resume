import React from "react";
import BodyContentHeader from "../common/BodyContentHeader";

const Resume = () => {
  return (
    <div>
      <BodyContentHeader
        headerTitle="Resume"
        headerSubtitle=""
        imgSrc="self_portrait.png"
        imgAlt="self portrait"
      />
      <div className="body_content_text">
        <p style={{fontFamily: "sans-serif", textAlign: "left"}}>
          <h2>Technical Skills</h2>
          <hr />
          <b>Programming:</b> React, Javascript, Node, Django, Python
          <br />
          <b>Web Development:</b> HTML, CSS, Sass
          <br />
          <b>Tools:</b> Git, GitHub, npm, Yarn, DigitalOcean, PostgreSQL
          <br />
          <b>DevOps Software:</b> Figma, Lucidchart, Jira, Trello
          <br />
          <b>Art and Design Software:</b> Adobe Photoshop, Adobe Illustrator,
          Adobe Animate, Clip Studio Paint, Procreate
          <br />
          <h2>Experience</h2>
          <hr />
          <b>Van Robotics, Columbia SC - UI Designer/Developer (July 2018 -
          present)</b>
          <ul>
            <li>
              Designed and developed web interfaces to accompany the ABii robot,
              a smart robot tutor for assisting children with math, language
              arts, and SEL skills.
            </li>
            <li>
              Designed and developed a lesson creation tool to allow teachers to
              create custom lessons for ABii and export them to the robot for
              use in classrooms.
            </li>
            <li>
              Ensured mobile compatibility with ABii through mobile-first design
              strategies and rigorous iPad testing.
            </li>
            <li>
              Created wireframes and flowcharts for drafting new development
              projects.
            </li>
            <li>
              Assisted other developers in project testing phases through GitHub
              peer review, Jira, and Trello.
            </li>
            <li>
              Provided hundreds of raster and vector illustrations for
              tutorials, assessments, and stories.
            </li>
            <li>
              Animated characters in Adobe Animate and exported them to HTML
              canvas and Javascript for a more immersive and interactive
              learning experience.
            </li>
          </ul>
          <b>Independent Contractor, Columbia, SC - Freelance Digital Artist
          (January 2022 - present)</b>
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
          USC Center for Digital Humanities, Columbia SC - Full-Stack Web
          Developer (May 2018 - August 2018) Developed a grant-funded web
          archive of historical media for the city of Columbia, on behalf of the
          African American Studies department at the University of South
          Carolina. Assisted in the design of the WardOne app, an iOS app which
          contained a digital tour of historic downtown Columbia with the use of
          the Google Maps API.
          <h2>Education</h2>
          <hr />
          <b>University of South Carolina, Columbia SC - Bachelor of Science in
          Computer Science, Minor in Media Arts (2018)</b>
        </p>
      </div>
    </div>
  );
};

export default Resume;
