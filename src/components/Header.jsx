import React, { useState } from "react";
import { Container } from "./Container";
import Image from "next/image";
import InstaLogo from "../../public/assets/InstagramLogo.svg";
import {
  HomeIcon,
  ChatBubbleBottomCenterTextIcon,
  ArrowUpCircleIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import { AppBar, Box, IconButton, Menu, MenuItem } from "@mui/material";
import Link from "next/link";
import { useAuthListener } from "@/hooks/useAuthListener";
import { PostUploadModal } from "./PostUploadModal";
import { auth } from "@/Lib/Firebase";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { themeState } from "@/pages/_app";

const icons = [
  {
    id: 1,
    icon: HomeIcon,
    href: "/",
  },
  {
    id: 2,
    icon: ChatBubbleBottomCenterTextIcon,
    href: "/",
  },
  {
    id: 3,
    icon: ArrowUpCircleIcon,
    href: "/",
  },
  {
    id: 4,
    icon: HeartIcon,
    href: "/",
  },
];

export const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [darkMode, setDarkMode] = useRecoilState(themeState);

  const { user } = useAuthListener();
  const router = useRouter();

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenModal = () => setOpenModal(true);

  const handleCloseModal = () => setOpenModal(false);

  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        router.push("/login");
        localStorage.removeItem("user");
      })
      .catch((e) => alert(e));
  };


  return (
    <>
      <header
        style={{
          position: "sticky",
          top: 0,
          height: "fit-content",
          zIndex: 10,
        }}
      >
        <AppBar variant="outlined" color="inherit" position="static">
          <Container>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                paddingY: 1,
              }}
            >
              <Image
              onClick={()=>router.push('/')}
                width={103}
                height={29}
                src={InstaLogo}
                className="object-contain"
                alt="user dp"
                style={{
                  filter: darkMode && "invert(1)",
                  cursor:'pointer'
                }}
              />
              <Box>
                {icons.map((icon) => (
                  <IconButton
                  key={icon.id}
                    onClick={icon.id === 3 ? handleOpenModal : undefined}
                  >
                    <Link href={icon.href}>
                      <icon.icon  width={24} height={24} color={darkMode?"white":"black"} />
                    </Link>
                  </IconButton>
                ))}
                <IconButton
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                >
                  <Image
                    src={user?.photoURL}
                    width={25}
                    height={25}
                    alt="user"
                    style={{
                      margin: 0,
                      padding: 0,
                      objectFit: "cover",
                      borderRadius: "100%",
                      cursor: "pointer",
                    }}
                  />
                </IconButton>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <MenuItem
                    onClick={() => {
                      router.push(`/user/${user?.uid}`);
                      handleClose();
                    }}
                    sx={{ fontSize: 15 }}
                  >
                    Profile
                  </MenuItem>
                  <MenuItem
                    sx={{ fontSize: 15 }}
                    onClick={() => {
                      setDarkMode((prev) => !prev);
                      // handleClose()
                    }}
                  >
                    Dark Mode
                  </MenuItem>
                  <MenuItem
                    sx={{ fontSize: 15 }}
                    onClick={() => {
                      handleClose(), handleLogout();
                    }}
                  >
                    Logout
                  </MenuItem>
                </Menu>
              </Box>
            </Box>
          </Container>
        </AppBar>
      </header>
      <PostUploadModal
        openModal={openModal}
        handleCloseModal={handleCloseModal}
      />
    </>
  );
};
