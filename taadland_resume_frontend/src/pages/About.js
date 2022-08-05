import React from "react";
import BodyContentHeader from "../common/BodyContentHeader";

const About = () => {
  return (
    <div>
      <BodyContentHeader
        headerTitle="About Thorya"
        headerSubtitle="The cat's name is Stinky."
        imgSrc="self_portrait.png"
        imgAlt="self portrait"
      />
      <div className="body_content_text">
        <p style={{fontFamily: "sans-serif"}}>
          Hello! I'm Thorya, and I'm a 26 year old front-end web developer, UI
          designer, and digital artist based in South Carolina, USA. 
          </p>
          <p>
          I received my bachelors of science in Computer science from
          the University of South Carolina in Columbia, SC. Since then I've been
          working for a startup EdTech robotics company doing all sorts of
          things: web development, UI design, animations ... if you can see it
          on a website, it's my jam. I've always had a fascination with sci-fi
          and monsters. It has allowed me to really connect with my work in
          EdTech to entertain and educate students with child-friendly UI
          designs filled with fun, memorable graphics and other visuals. As for
          my adult audience, I have worked many different jobs in both software
          development and the arts; I've assisted several professors in their
          research, including full-stack web development for the Ward One
          Project in Columbia. I have taken commissions for everything from
          character designs to illustrations for research proposals at the
          university. My hybrid background has given me an inherent edge in
          combining STEM and the arts into everything that I do.
        </p>
      </div>
    </div>
  );
};

export default About;
