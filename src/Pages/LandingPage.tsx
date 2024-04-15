import { Box, Typography } from "@mui/material"
import Header from "../components/Header"
import TableComponent from "../components/TableComponents"
import axios from "axios";
import { useEffect, useState } from "react";
import Footer from "../components/Footer";
const LandingPage = () =>{

    const [tokenList, setTokenList]= useState<any>([])
    const fetchTokenList = async () => {
        try {
   
            const tokenData = await axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd");
            console.log("tokenData",tokenData)
            const destructeddata = tokenData?.data?.slice(0,10).map((list:any) =>  {
                return {
                  Name: list?.name,
                  Symbol:list?.symbol,
                  Price: list?.current_price,
                  "24hrs": list?.price_change_24h,
                  Market:list?.market_cap
                };
              })
            setTokenList(destructeddata)
            //   return tokens;
          } catch (error) {
            console.error('Error fetching token list:', error);
            return [];
          }
      };

      useEffect(()=>{
        fetchTokenList()
      },[])
      const [ address, setAddress] = useState<any>("")
      const getSelectedAddress = (address:any) =>{
        setAddress(address)
      }
    return(
        <Box>
            <Header getSelectedAddress={getSelectedAddress} />
            <Box sx={{px:"40px"}}>
            <Typography variant="h5" sx={{textAlign:"left",mt:"20px"}}>Top Token List</Typography>
            <TableComponent  tableData={tokenList}/>
            </Box>
           
           
            <Footer />
        </Box>
    )
}

export default LandingPage