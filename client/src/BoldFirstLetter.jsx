import React from "react";
import PropTypes from "prop-types";

function BoldFirstLetter(props) {
  const { children } = props;
  const words = children.split(/\s+/);
  const tagRegex = /<[^>]+>|&[a-z]+;/gi;
  const newContent = words.map((word, index) => {
    if (tagRegex.test(word)) {
      return word;
    }
    const firstLetter = word.charAt(0);
    const restOfWord = word.slice(1);
    return (
      <React.Fragment key={index}>
        <b>{firstLetter}</b>
        {restOfWord}{" "}
      </React.Fragment>
    );
  });

  return <p>{newContent}</p>;
}

BoldFirstLetter.propTypes = {
  children: PropTypes.string.isRequired,
};

export default BoldFirstLetter;
