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

import {
  logoFlexBox,
  logoText,
  navbarText,
  userLogin,
  userPictureMenu,
  userImage,
  navbarMovil,
  navbarFlexBox,
} from "../styles/Common.styles";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import PlastechLogo from "../assets/LogoSinFondo.png";

interface NavbarProps {
  userName: string;
}

export default function Navbar(props: NavbarProps) {
  const pages = ["Production", "Inventario", "Fallas"];
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const noOp = () => {};
  const navigate = useNavigate();
  async function logout() {
    await signOut(auth);
    navigate("/", { replace: false });
  }

  const settings: [string, () => void][] = [
    ["Logout", logout],
  ];

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

  const handleNavClick = useCallback(
    (page: string) => () => {
      navigate(`/${page}`);
    },
    []
  );

  return (
    <AppBar
      position="sticky"
      sx={{ backgroundColor: "#007ea7", flex: "0 1 auto" }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            onClick={handleNavClick("")}
            sx={logoText}
          >
            <img src={PlastechLogo} alt="Logo" width="50rem" />
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
                <MenuItem key={page} onClick={handleNavClick(page)}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={navbarMovil}
          >
            <img src={PlastechLogo} alt="Logo" width="50rem" />
          </Typography>
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
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="User Image" src="" sx={userImage} />
                <Typography sx={userLogin}>{props.userName}</Typography>
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
              {settings.map(([name, callback]) => (
                <MenuItem key={name} onClick={handleCloseUserMenu}>
                  <Typography onClick={callback} textAlign="center">
                    {name}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
