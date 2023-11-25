import * as React from "react";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { Avatar, Button } from "@mui/material";
import betaLogo from "../images/logo-dark.png";
import { useDispatch } from "react-redux";
import {
  fetchDataRequest,
  fetchDataRequestWithParams,
} from "src/store/api/sagas";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderTopLeftRadius: 20,
  borderBottomLeftRadius: 20,
  backgroundColor: "white",
  border: `2px solid ${theme.palette.grey[400]}`,
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
  height: 40,
  borderRight: "none",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export const Navbar: React.FC = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = React.useState("");

  React.useEffect(() => {
    if (search) {
      dispatch(fetchDataRequestWithParams(search));
    } else {
      dispatch(fetchDataRequest());
    }
  }, [dispatch, search]);

  return (
    <Box sx={{ flexGrow: 1, marginBottom: 10 }}>
      <AppBar position="fixed">
        <Toolbar
          style={{
            backgroundColor: "white",
            justifyContent: "left",
          }}
        >
          <Avatar
            alt="beta.Limited_logo"
            src={betaLogo}
            sx={{ width: "150px" }}
            variant="square"
            style={{ marginRight: "15%" }}
          />
          <Search
            style={{
              width: "40%",
              display: "flex",
              margin: 0,
            }}
          >
            <SearchIconWrapper>
              <SearchIcon style={{ fill: "gray" }} />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Searching for…"
              inputProps={{ "aria-label": "search" }}
              onChange={(e) => setSearch(e.target.value)}
              style={{ color: "black" }}
            />
          </Search>
          <Button
            type="submit"
            variant="contained"
            color="error"
            style={{
              height: 44,
              borderTopRightRadius: 25,
              borderBottomRightRadius: 25,
              width: "12%",
              bottom: 0.5,
            }}
          >
            Search
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
