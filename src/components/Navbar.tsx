import * as React from "react";
import { useCallback } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AgricultureIcon from "@mui/icons-material/Agriculture";
import { useNavigate } from "react-router-dom";
import {
  logoFlexBox,
  logoImage,
  logoText,
  navbarFlexBox,
  navbarText,
  userIconButton,
  userLogin,
  userPictureMenu,
  userImage,
} from "../styles/Common.styles";

const pages = ["Production", "Inventario", "Fallas"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

export default function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const navigate = useNavigate();

  const handleNavClick = useCallback(
    (page: string) => () => {
      navigate(`/${page}`);
    },
    []
  );

  return (
    <AppBar position="static" sx={{ backgroundColor: "#007ea7" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AgricultureIcon sx={logoImage} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            onClick={handleNavClick("")}
            sx={logoText}
          >
            LOGO
          </Typography>

          <Box sx={logoFlexBox}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center" component="a" href="/">
                    {page}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box sx={navbarFlexBox}>
            {pages.map((page) => (
              <Button key={page} onClick={handleNavClick(page)} sx={navbarText}>
                {page}
              </Button>
            ))}
          </Box>
          {/* { TODO cabmiar este pedazo cuando tengamos la conexion a la base de datos } */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={userIconButton}>
                <Avatar alt="User Image" src="" sx={userImage} />
                <Typography sx={userLogin}>{" El ELiud de Leon "}</Typography>
              </IconButton>
            </Tooltip>
            <Menu
              sx={userPictureMenu}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
