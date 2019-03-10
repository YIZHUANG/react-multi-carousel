import * as React from "react";
import Button from "@material-ui/core/Button";

const CustomLeftArrow = ({ onClick }) => (
    <Button
      onClick={() => onClick()}
      className='custom-left-arrow'
      variant="contained"
      size="medium"
      color="primary"
    >
      Prev
    </Button>
  );
  const CustomRightArrow = ({ onClick }) => {
    return (
      <Button
        className='custom-right-arrow'
        onClick={() => onClick()}
        variant="contained"
        size="medium"
        color="primary"
      >
        Next
      </Button>
    );
  };

export { CustomLeftArrow, CustomRightArrow }