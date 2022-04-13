import { Box, Stack } from "@mui/material";
import React from "react";

const Palette = () => {
  return (
    <Stack spacing={5}>
      <Stack direction="row" spacing={3}>
        <Box
          sx={{ height: "300px", width: "300px", bgcolor: "primary.main" }}
        ></Box>
        <Box
          sx={{ height: "300px", width: "300px", bgcolor: "primary.light" }}
        ></Box>
        <Box
          sx={{ height: "300px", width: "300px", bgcolor: "primary.dark" }}
        ></Box>
      </Stack>
      <Stack direction="row" spacing={3}>
        <Box
          sx={{ height: "300px", width: "300px", bgcolor: "secondary.main" }}
        ></Box>
        <Box
          sx={{ height: "300px", width: "300px", bgcolor: "secondary.light" }}
        ></Box>
        <Box
          sx={{ height: "300px", width: "300px", bgcolor: "secondary.dark" }}
        ></Box>
      </Stack>

      <Stack direction="row" spacing={3}>
        <Box
          sx={{ height: "300px", width: "300px", bgcolor: "tertiary.main" }}
        ></Box>
        <Box
          sx={{ height: "300px", width: "300px", bgcolor: "tertiary.light" }}
        ></Box>
        <Box
          sx={{ height: "300px", width: "300px", bgcolor: "tertiary.dark" }}
        ></Box>
      </Stack>

      <Stack direction="row" spacing={3}>
        <Box
          sx={{ height: "300px", width: "300px", bgcolor: "blacks.main" }}
        ></Box>
        <Box
          sx={{ height: "300px", width: "300px", bgcolor: "blacks.light" }}
        ></Box>
      </Stack>
    </Stack>
  );
};

export default Palette;
