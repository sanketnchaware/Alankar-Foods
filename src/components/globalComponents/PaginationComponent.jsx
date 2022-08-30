import React from 'react'
import { makeStyles } from "@material-ui/core/styles";
function PaginationComponent() {
    const useStyles = makeStyles(() => ({
        ul: {
          "& .MuiPaginationItem-root": {
            color: "#FF0000",
          },
          "& .MuiPaginationItem-root.Mui-selected": {
            backgroundColor: "#FFA500",
            color: "#FF0000",
          },
        },
      }));
      const classes = useStyles();
  return (
    <div>


    </div>
  )
}

export default PaginationComponent