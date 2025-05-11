import React from "react";

interface TitleProps {
  heading: string;
  paragraph: string;
}

const Title: React.FC<TitleProps> = ({ heading, paragraph }) => {
  return (
    <>
      <h2
        className="text-2xl md:text-3xl lg:text-4xl font-black mb-3 md:mb-4 second-text-color uppercase"
        style={{ fontFamily: "var(--font-inter" }}
      >
        {heading}
      </h2>
      <p className="text-base lg:text-lg mb-4 md:mb-6 lg:mb-8 text-gray-500" style={{ fontFamily: "var(--font-inter" }}>
        {paragraph}
      </p>
    </>
  );
};

export default Title;
