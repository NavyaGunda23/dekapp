import { Box, useTheme } from "@mui/material"
import nordek from "../assests/Headers/nordek.svg"


const Footer = () =>{
    const theme = useTheme();
    return(
        <Box sx={{
            // position:"fixed",bottom:0,width:'100%',
            mt:"20px",
            background:
            theme.palette.mode == "dark"
              ? "var(--primary-color-dark)"
              : "var(--primary-color-light)",
            padding:"20px 40px"}}>
              <Box sx={{
                width:"40px",
                height:"40px"
            }}>
            <img src={nordek} style={{height:"inherit"}} />
            </Box>
           
        </Box>
    )
}

export default Footer