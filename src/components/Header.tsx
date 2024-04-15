import { Box, Button, ButtonGroup, Typography, useTheme } from "@mui/material";
import nordek from "../assests/Headers/nordek.svg";
import WalletIcon from "@mui/icons-material/Wallet";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
const Header = ({
  getSelectedAddress
}: {
  getSelectedAddress?: (address: string) => void
}) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [selectedAddress, setSelectedAddress] = useState<any>("");
  console.log("selectedAddress",selectedAddress)
  const [windowdata, setWindow] = useState<any>(window);
  const connectWallet = async () => {
    if (windowdata.ethereum) {
      const providr = new ethers.BrowserProvider(windowdata.ethereum);
      await providr.send("eth_requestAccounts", []);
      const signer = await providr.getSigner();
      const address = await signer.getAddress();
      setSelectedAddress(address);
      getSelectedAddress && getSelectedAddress(address);
      localStorage.setItem("walletAddress",address)
    }
  };
  const [showAddress, setShowAddrrss] = useState<Boolean>(false)
 
  useEffect(() => {
    const getAddress = localStorage.getItem("walletAddress")
    if(getAddress){
      setShowAddrrss(true)
      setSelectedAddress(getAddress);
    }
  })

  const handleLogout = () => {
    setSelectedAddress(null);
    setShowAddrrss(false)
    localStorage.removeItem("walletAddress")
    navigate("/")
  };

  const handleProfile = () => {
    navigate(`/profile/`, { state: { address: selectedAddress } });
  };
  const handleLogoClick = () => {
    navigate("/")
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          background:
            theme.palette.mode == "dark"
              ? "var(--primary-color-dark)"
              : "var(--primary-color-light)",
          padding: "20px 50px",
        }}
      >
        <Box
          sx={{
            height: "40px",
            display: "flex",
            justifyContent: "center",
            columnGap: "40px",
          }}
        >
          <img
            src={nordek}
            style={{ height: "inherit" }}
            onClick={() => handleLogoClick()}
          />
          {showAddress && (
            <Typography sx={{ color: "white",margin:"auto" }} onClick={() => handleProfile()}>
              Profile
            </Typography>
          )}
        </Box>
        {showAddress ? (
          <ButtonGroup variant="outlined" aria-label="Basic button group">
            <Button startIcon={<WalletIcon />}  sx={{ borderColor: theme.palette.mode == "dark"
            ? "var(--button-border)"
            : "var(--button-border)",
            "&:hover":{
              borderColor: theme.palette.mode == "dark"
              ? "var(--button-border)"
              : "var(--button-border)",
            },
            color:"var(--text-color-white)"}}>
              {" "}
              <Typography sx={{ color: "white" }}>
                {" "}
                {showAddress &&
                  selectedAddress.slice(0, 6) +
                    "..." +
                    selectedAddress.slice(-6)}
              </Typography>
            </Button>
            <Button startIcon={<LogoutIcon />} onClick={() => handleLogout()} sx={{ borderColor: theme.palette.mode == "dark"
            ? "var(--button-border)" 
            : "var(--button-border)",
            "&:hover":{
              borderColor: theme.palette.mode == "dark"
              ? "var(--button-border)"
              : "var(--button-border)",
            }, 
            color:"var(--text-color-white)"}}>
              Logout
            </Button>
          </ButtonGroup>
        ) : (
          <Button  sx={{
            borderColor: theme.palette.mode == "dark"
            ? "var(--button-border)"
            : "var(--button-border)",
            color:"var(--text-color-white)",
            fontSize:{xs:"10px",md:"14px"},
            "&:hover":{
              borderColor: theme.palette.mode == "dark"
              ? "var(--button-border)"
              : "var(--button-border)",
            }
          }}
            onClick={() => connectWallet()}
            variant="outlined"

            startIcon={<WalletIcon />}
          >
            Connect Wallet
          </Button>
        )}
      </Box>
    </>
  );
};
export default Header;
