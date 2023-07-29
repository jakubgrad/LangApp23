import React, { useState } from "react";

const Word = (props) => {
  const base =
    props.base === undefined
      ? "mennä" //a word for when base is absent
      : props.base;

  const word = props.word;
  const fetchWordDescription = props.fetchWordDescription;

  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    // Call your fetchWordDescription function here
    fetchWordDescription(
      word
        .replaceAll(".", "")
        .replaceAll(",", "")
        .replaceAll("(", "")
        .replaceAll(")", "")
        .replaceAll("-", "")
    );

    // Update state to enable the clicked style
    setClicked(true);

    // Reset the clicked style after 1 second
    setTimeout(() => {
      setClicked(false);
    }, 1000);
  };

  // Define the style based on whether it was clicked or not
  const style = {
    backgroundColor: clicked ? "lightblue" : "transparent",
    borderRadius: "5px",
    transition: "background-color 1s",
    cursor: "pointer",
  };

  // Define the box-shadow style to create the highlighted effect
  const boxShadowStyle = {
    boxShadow: clicked ? "0 0 5px lightblue" : "none",
  };

  return (
    <span onClick={handleClick} style={{ ...style, ...boxShadowStyle }}>
      {word}{" "}
    </span>
  );
};

export default Word;