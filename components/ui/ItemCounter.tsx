import React, { useState } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";

interface Props {
  currentValue: number;
  max: number;
  updateQuantity: (quantity: number) => void;
}

export const ItemCounter: React.FC<Props> = ({
  currentValue = 1,
  max = 10,
  updateQuantity,
}) => {
  const [counter, setCounter] = useState(currentValue);

  const onChangeCounter = (increment: number) => {
    const newCounter = counter + increment;
    if (newCounter === 0 || newCounter > max) return;
    setCounter(newCounter);
    updateQuantity(newCounter);
  };

  return (
    <Box display="flex" alignItems="center">
      <IconButton onClick={() => onChangeCounter(-1)}>
        <RemoveCircleOutline />
      </IconButton>
      <Typography sx={{ width: 40, textAlign: "center" }}>{counter}</Typography>

      <IconButton onClick={() => onChangeCounter(1)}>
        <AddCircleOutline />
      </IconButton>
    </Box>
  );
};
