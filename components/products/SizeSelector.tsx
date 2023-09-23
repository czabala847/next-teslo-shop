import React from "react";
import { Box, Button } from "@mui/material";
import { ISize } from "@/interfaces";

interface Props {
  selectedSize?: ISize;
  sizes: ISize[];
  onSelectedSize?: (size: ISize) => void;
}

export const SizeSelector: React.FC<Props> = ({
  sizes,
  selectedSize,
  onSelectedSize,
}) => {
  return (
    <Box>
      {sizes.map((size) => (
        <Button
          onClick={onSelectedSize ? () => onSelectedSize(size) : undefined}
          key={size}
          size="small"
          color={selectedSize === size ? "primary" : "info"}
        >
          {size}
        </Button>
      ))}
    </Box>
  );
};
