import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

const useStyles = makeStyles(theme => ({
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    color: "white",
    textDecoration: "none"
  }
}));

export default function MenuAppBar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [anchorElMenuList, setAnchorElMenuList] = React.useState(null);
  const openMenuList = Boolean(anchorElMenuList);

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuList = event => {
    setAnchorElMenuList(event.currentTarget);
  };

  const handleCloseMenuList = () => {
    setAnchorElMenuList(null);
  };

  const onClickPerfil = () => {
    window.location.href = "/profile";
  };

  const onClickSearch = () => {
    window.location.href = "/offers/search";
  };

  const onClickCandidacies = () => {
    window.location.href = "/candidacies";
  };

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
          onClick={handleMenuList}
        >
          <MenuIcon />
        </IconButton>
        <Menu
          keepMounted
          open={openMenuList}
          onClose={handleCloseMenuList}
          anchorEl={anchorElMenuList}
        >
          <MenuItem onClick={onClickSearch}>Buscar Ofertas</MenuItem>
          <MenuItem onClick={onClickCandidacies}>Candidaturas</MenuItem>
        </Menu>
        <Typography
          variant="h6"
          className={classes.title}
          component={Link}
          to="/home"
        >
          FindMyTeam
        </Typography>

        <div>
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right"
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right"
            }}
            open={open}
            onClose={handleClose}
          >
            <MenuItem onClick={onClickPerfil}>Perfil</MenuItem>
            <MenuItem onClick={logout}>Cerrar Sesión</MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
}
