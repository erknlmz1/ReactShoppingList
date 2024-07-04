import React from "react";
import { FaTrash } from "react-icons/fa";
import styled from "styled-components";

const Btn = styled.button`
  background-color: transparent;
  border: none;
  width: 100%;
`;

const IconButton = ({ handleClick }) => {
  return (
    <Btn
      onClick={(e) => {
        e.stopPropagation();
        handleClick();
      }}
    >
      <FaTrash />
    </Btn>
  );
};

export default IconButton;
