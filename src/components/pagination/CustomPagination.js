import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function CustomPagination({ setPage }) {
  const handlePageChange = (page) => {
    setPage(page);
    window.scroll(0, 0);
  };

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "10px 0 10px 0",
      }}
    >
      <Stack spacing={2}>
        <Pagination
          count={10}
          onChange={(e) => handlePageChange(Number(e.target.innerText))}
          hideNextButton
          hidePrevButton
          shape="rounded"
        />
      </Stack>
    </div>
  );
}
