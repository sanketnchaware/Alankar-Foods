import React from 'react'
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { makeStyles } from "@material-ui/core/styles";


const TablePagination = (props) => {
  console.log(props.data,"pagination data");
    
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
      <Stack spacing={2}>
          <Pagination
            size="small"
            classes={{ ul: classes.ul }}
            defaultPage={1}
            color="primary"
            variant="outlined"
            shape="rounded"
            count={props.data.npages}
            page={props.data.page}
            onChange={props.data.handleChange}
          />
        </Stack>
    </div>
  )
}

export default TablePagination
