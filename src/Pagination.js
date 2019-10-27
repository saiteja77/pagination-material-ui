import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import LastPageIcon from "@material-ui/icons/LastPage";
import { data as Data } from "./data";
import { Typography, Menu, MenuItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ArrowDropDownRoundedIcon from "@material-ui/icons/ArrowDropDownRounded";
// import Axios from 'axios'

const useStyles = makeStyles(theme => ({
  perPage: {
    marginTop: -16
  },
  zeroRadius: {
    borderRadius: "0px !important",
    borderRight: "0px !important",
    minWidth: 40
  }
}));
export default function Pagination() {
  const classes = useStyles();

  const prop = "url";
  const [size, setSize] = React.useState(10);
  const [current, setCurrent] = React.useState(31512);
  const [url, setUrl] = React.useState(prop);
  const [data, setData] = React.useState(Data);
  const [totalElements, setTotalElements] = React.useState(0);
  const [totalPages, setTotalPages] = React.useState(0);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const pageSize = [20, 50, 100];

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = size => event => {
    setSize(size);
    setAnchorEl(null);
  };

  function getTwoPageNumbers(value) {
    switch (value) {
      case "previous":
        if (current - 2 > 0) {
          const p = [current - 2, current - 1];
          return p.map(num => {
            return <Button>{num}</Button>;
          });
        } else if (current - 1 > 0) {
          return <Button>{current - 1}</Button>;
        } else {
          return null;
        }
      case "next":
        if (current + 2 < totalPages) {
          const p = [current + 1, current + 2];
          return p.map(num => {
            return <Button>{num}</Button>;
          });
        } else if (current + 1 <= totalPages) {
          return <Button>{current + 1}</Button>;
        } else {
          return null;
        }
      default:
        break;
    }
  }

  React.useEffect(() => {
    setData(Data);
    setTotalElements(Data.page.totalElements);
    setTotalPages(Data.page.totalPages);
    // Axios.get(url).then( response => {
    //   setData(response.data)
    // }).catch(err => {
    //   console.log(err)
    // })
  }, [url]);

  const submitAction = (...value) => event => {
    Object.entries(value[0]).forEach(element => {
      if (element[1].rel === value[1]) {
        setUrl(element[1].href);
      }
    });
  };
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={12}>
        <Grid container spacing={1} direction="column" alignItems="center">
          <Grid item>
            <div
              style={{
                display: "inline-block",
                verticalAlign: "super",
                padding: "0px 16px 5px 0px"
              }}
            >
              <Typography
                style={{ fontSize: 14, display: "inline" }}
                className={classes.perPage}
              >
                Page size:&nbsp;&nbsp;
              </Typography>
              <Button onClick={handleClick} style={{ minWidth: 40 }}>
                {size}
                <ArrowDropDownRoundedIcon />
              </Button>
            </div>
            <ButtonGroup size="small">
              <Button onClick={submitAction(Data.links, "first")}>
                <FirstPageIcon />
              </Button>
              <Button>
                <ChevronLeftIcon />
              </Button>
              {console.log(size, current, data, totalElements, totalPages)}

              {getTwoPageNumbers("previous")}
              <Button disabled>{current}</Button>
              {getTwoPageNumbers("next")}
              <Button>
                <ChevronRightIcon />
              </Button>
              <Button onClick={submitAction(Data.links, "last")}>
                <LastPageIcon />
              </Button>
            </ButtonGroup>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem style={{ minHeight: 5 }} onClick={handleClose(10)}>
                10
              </MenuItem>
              {pageSize.map(s => {
                if (s < totalElements) {
                  return (
                    <MenuItem
                      key={s}
                      style={{ minHeight: 5 }}
                      onClick={handleClose(s)}
                    >
                      {s}
                    </MenuItem>
                  );
                } else {
                  return null;
                }
              })}
            </Menu>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
