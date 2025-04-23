import styled from "styled-components";

const styleMap = {
  default: {
    backgroundColor: "#673ab7",
    color: "white",
  },
  green: {
    backgroundColor: "#4caf50",
    color: "white",

    "& a": {
      color: "#123886",
    },
  },
  grey: {
    backgroundColor: "rgb(52, 58, 64)",
    color: "white",
  },
  blue: {
    backgroundColor: "#3f51b5",
    color: "white",
  },
  yellow: {
    backgroundColor: "#ffc107",
    color: "black",
  },
};

const Section = styled.section<{ color?: keyof typeof styleMap }>((props) => ({
  position: "relative",
  minHeight: "85vh",
  padding: "2% 5%",
  boxShadow: "0px 10px 50px 20px black",
  ...styleMap[props.color || "default"],

  "& h1": {
    fontSize: "8rem",
    padding: "5% 0",
  },
  "& h2": {
    fontSize: "3em",
    padding: "3% 0",
  },

  "& h3": {
    fontSize: "3.5rem",
    padding: "2% 10px",
    margin: "0 -20px",
    position: "sticky",
    top: "0",
    backgroundColor: "inherit",
    zIndex: 1,
  },

  "& h6": {
    fontSize: "2rem",
    padding: "2% 0",
  },

  "@media (max-width: 750px)": {
    "& h1": {
      fontSize: "8em",
      padding: "5% 0",
    },
    "& h3": {
      fontSize: "3.5em",
      padding: "2% 10px",
    },

    "& h6": {
      fontSize: "2em",
      padding: "2% 0",
    },
  },
}));

export default Section;
