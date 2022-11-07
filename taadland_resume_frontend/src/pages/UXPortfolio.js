import React from "react";
import AACompetitiveAuditPdf from "../AuctionArt_Competitive_Audit.pdf";
import AACompetitiveAuditReportPdf from "../AuctionArt_Competitive_Audit_Report.pdf";
import AAPersonasPdf from "../AuctionArt_personas.pdf";

import BodyContentHeader from "../common/BodyContentHeader";
import "./UXPortfolio.scss";

const UXPortfolio = () => {
  return (
    <div>
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
            The AuctionArt App is an app I'm currently designing for my
            professional Google UX Design Certification course.
            <br />
            <br />
            When it comes to art auctions, it's often seen as a high profile,
            posh affair. Art auctions are frequently pricey and limited to very
            few art mediums. You will rarely see art mediums in these auctions
            online that aren't 2D works. That is, most listings are paintings,
            photographs, lithographs, or prints.
            <br />
            <br />
            In addition, there is a major issue with including underrepresented
            groups of artists in listings. The AuctionArt app aims to address
            these diversity and inclusivity issues with art auctions, as well as
            provide auction opportunities for smaller artists and art hobbyists.
          </h2>
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
            <img src="reports_thumbnail.png" alt="persona portrait thumbnail" />
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
        </div>
      </div>
    </div>
  );
};

export default UXPortfolio;