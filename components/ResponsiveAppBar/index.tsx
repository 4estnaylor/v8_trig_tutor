import Image from 'next/image';

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';
import styled from 'styled-components';
import cl from '../../colors';
import TrigTutorLogo from '../../public/trig_tutor_logo.svg';
import Link from 'next/link';
// import Logo from './trig_tutor_logo.svg';

import { useSession, signIn, signOut } from 'next-auth/react';
import { off } from 'process';

const pages = ['Book', 'About Me', 'FAQ'];

const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const { data: session } = useSession();
  const imageURL = session?.user?.image;
  let myAvatar;

  let logInOrOut;
  if (session?.user) {
    logInOrOut = 'Logout';
  } else {
    logInOrOut = 'Login';
  }
  let settings = ['Profile', 'My Sessions', logInOrOut];
  if (!session?.user) {
    settings = [logInOrOut];
  }

  if (imageURL) {
    myAvatar = <Avatar src={imageURL}> </Avatar>;
  } else if (session?.user?.name) {
    myAvatar = (
      <Avatar sx={{ backgroundColor: cl.getHSL(cl.red) }}>
        {session?.user?.name[0]}
      </Avatar>
    );
  } else {
    myAvatar = <Avatar sx={{ backgroundColor: cl.getHSL(cl.red) }}></Avatar>;
  }

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

  const getURLString = (string: string) => {
    const stringArray = string.split(' ');
    const urlString = stringArray.join('_');

    return urlString.toLowerCase();
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: cl.getHSL(cl.white),
        color: cl.getHSL(cl.black),
        display: 'flex',
        alignItems: 'baseline',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* <SvgIcon  >

<img src="/trig_tutor_logo.svg" alt="trig tutor logo" width = {40} />
         
          </SvgIcon> */}
          <Link href="/" style={{ cursor: 'pointer' }}>
            <Box
              sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
            >
              <Box
                component="img"
                sx={{
                  mr: 2,
                  display: { xs: 'none', md: 'flex' },
                  color: 'inherit',
                  height: 50,
                  cursor: 'pointer',
                }}
                src="/trig_tutor_logo.svg"
              ></Box>

              <Typography
                variant="h6"
                noWrap
                sx={{
                  mr: 2,
                  display: { xs: 'none', md: 'flex' },
                  fontWeight: 400,
                  fontSize: '1.5rem',
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
                  cursor: 'pointer',
                }}
              >
                Trig Tutor
              </Typography>
            </Box>
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
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
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <Link key={page} href={`/${getURLString(page)}`}>
                  <MenuItem>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                </Link>
              ))}
            </Menu>
          </Box>
          <Link href="/">
            <Box
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                alignItems: 'center',
                flexGrow: 1,
                cursor: 'pointer',
              }}
            >
              <img
                src="/trig_tutor_logo.svg"
                alt="logo"
                width={50}
                height={50}
              />
              <Typography
                variant="h5"
                noWrap
                sx={{
                  color: 'inherit',
                  textDecoration: 'none',
                  fontWeight: 400,
                  letterSpacing: '.3rem',
                }}
              >
                Trig Tutor
              </Typography>
            </Box>
          </Link>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Link key={page} href={`/${getURLString(page)}`}>
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: cl.getHSL(cl.black), display: 'block' }}
                >
                  {page}
                </Button>
              </Link>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {myAvatar}
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => {
                let handler = () => {};

                switch (setting) {
                  case 'Logout':
                    handler = signOut;
                    break;
                  case 'Login':
                    handler = signIn;
                    break;
                  default:
                    handler = () => {
                      console.log('no handler');
                    };
                }
                if (setting === 'Logout') {
                  handler = signOut;
                }
                return (
                  <MenuItem key={setting} onClick={handler}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                );
              })}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

const MyImage = styled(Image)`
  flex-shrink: 1;
`;

const CenteredTypography = styled(Typography)`
  display: flex;
  align-items: center;
`;
export default ResponsiveAppBar;
