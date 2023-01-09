import React from "react";
import {FaExternalLinkAlt} from "react-icons/fa";
import AACaseStudy from "../AuctionArt_Case_study.pdf";
import AACompetitiveAuditPdf from "../AuctionArt_Competitive_Audit.pdf";
import AACompetitiveAuditReportPdf from "../AuctionArt_Competitive_Audit_Report.pdf";
import DrawnWireframes from "../AuctionArt_drawn_wireframe_drafts.png";
import AALowFiUsabilityStudyReport from "../AuctionArt_low_fi_usability_study_report.pdf";
import HighFiMockups from "../AuctionArt_mockups.png";
import AAPersonasPdf from "../AuctionArt_personas.pdf";

import AALowFiUsabilityStudy from "../AuctionArt_usability_study_Dec_13_2022.pdf";

import BodyContentHeader from "../common/BodyContentHeader";
import "./UXPortfolio.scss";

const UXPortfolio = () => {
  return (
    <div className="body_content_container_child">
      <BodyContentHeader
        headerTitle="UX Portfolio"
        headerSubtitle="View some of my past UX projects."
        imgSrc="notebook.svg"
        imgAlt="notebook image"
      />

      <div className="ux_portfolio_project_container">
        <div className="ux_portfolio_project_text">
          <h1 className="ux_portfolio_project_h1">The AuctionArt App</h1>
          <h2 className="ux_portfolio_project_h2">
            The AuctionArt App is an app I designed for my professional Google
            UX Design Certification course.
            <br />
            <br />
            This app allows users to place bids on online art auctions. In
            addition, the AuctionArt app aims to address diversity and
            inclusivity issues with contermporary art auctions, as well as
            provide auction opportunities for smaller artists and art hobbyists
            from around the world.
          </h2>

          <div className="contact_info" style={{width: "fit-content"}}>
            <FaExternalLinkAlt />
            <a
              href={AACaseStudy}
              rel="noopener noreferrer"
              target="_blank"
              className="ux_portfolio_project_thumbnail"
            >
              View Case Study
            </a>
          </div>
        </div>

        <div className="ux_project_thumbnail_container">
          <img
            className="ux_project_thumbnail"
            src="auctionart_screens_thumbnail.png"
            alt="auctionart thumbnail"
          />
        </div>
      </div>

      <div className="ux_portfolio_project_links_container">
        <a
          href={AAPersonasPdf}
          rel="noopener noreferrer"
          target="_blank"
          className="ux_portfolio_project_thumbnail"
        >
          <img src="persona_thumbnail.png" alt="persona portrait thumbnail" />
          <h4>User Personas</h4>
        </a>

        <a
          href={AACompetitiveAuditPdf}
          rel="noopener noreferrer"
          target="_blank"
          className="ux_portfolio_project_thumbnail"
        >
          <img
            src="reports_thumbnail.png"
            alt="charts on paper and pen thumbnail"
          />
          <h4>Competitive Audit Chart</h4>
        </a>

        <a
          href={AACompetitiveAuditReportPdf}
          rel="noopener noreferrer"
          target="_blank"
          className="ux_portfolio_project_thumbnail"
        >
          <img
            src="interviewer_thumbnail.png"
            alt="interviewer man thumbnail"
          />
          <h4>Competitive Audit Report</h4>
        </a>

        <a
          href={DrawnWireframes}
          rel="noopener noreferrer"
          target="_blank"
          className="ux_portfolio_project_thumbnail"
        >
          <img
            src="tablet_wireframes_thumbnail.png"
            alt="wireframes on a tablet thumbnail"
          />
          <h4>Wireframe samples, Drawn</h4>
        </a>

        <a
          href={`https://www.figma.com/proto/wWug7Nqv4RAKbb3SP61Owe/Wireframes?node-id=1%3A2&scaling=scale-down&page-id=0%3A1&starting-point-node-id=1%3A2`}
          rel="noopener noreferrer"
          target="_blank"
          className="ux_portfolio_project_thumbnail"
        >
          <img
            src="responsive_web_design_thumbnail.png"
            alt="computer apps thumbnail"
          />
          <h4>Figma Low Fidelity Prototype</h4>
        </a>

        <a
          href={AALowFiUsabilityStudy}
          rel="noopener noreferrer"
          target="_blank"
          className="ux_portfolio_project_thumbnail"
        >
          <img
            src="man_on_computer_thumbnail.png"
            alt="man on a computer thumbnail"
          />
          <h4>Low Fidelity Usability Study</h4>
        </a>

        <a
          href={AALowFiUsabilityStudyReport}
          rel="noopener noreferrer"
          target="_blank"
          className="ux_portfolio_project_thumbnail"
        >
          <img
            src="report_on_laptop_thumbnail.png"
            alt="interviewer man thumbnail"
          />
          <h4>Low Fidelity Usability Study Insights & Report</h4>
        </a>

        <a
          href={HighFiMockups}
          rel="noopener noreferrer"
          target="_blank"
          className="ux_portfolio_project_thumbnail"
        >
          <img
            src="tablet_wireframes_thumbnail.png"
            alt="wireframes on a tablet thumbnail"
          />
          <h4>High Fidelity Mockup Samples, Digital</h4>
        </a>

        <a
          href={`https://www.figma.com/proto/wWug7Nqv4RAKbb3SP61Owe/Wireframes?node-id=74%3A3&scaling=scale-down&page-id=74%3A2&starting-point-node-id=74%3A3`}
          rel="noopener noreferrer"
          target="_blank"
          className="ux_portfolio_project_thumbnail"
        >
          <img
            src="responsive_web_design_thumbnail.png"
            alt="computer apps thumbnail"
          />
          <h4>Figma High Fidelity Prototype</h4>
        </a>
      </div>
    </div>
  );
};

export default UXPortfolio;
