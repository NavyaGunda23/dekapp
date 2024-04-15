import { Box, Typography } from "@mui/material"
import Header from "../components/Header"
import axios from "axios";
import Footer from "../components/Footer";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import TableComponent from "../components/TableComponents";
import { error, timeStamp } from "console";

const ProfilePage = () =>{
    const data = useLocation()
    console.log("data",data)
    const [ seelctedAddress, setSelectedAddress] = useState("")
    const [windowdata,setWindow] = useState<any>(window)
    const [ signer, setSigner] = useState<any>()
    const [ balance, setBalance] = useState<any>()
    const [transactionList, setTransactionList] = useState<any>()
    useEffect(()=>{
        if(data.state.address){
            setSelectedAddress(data.state.address)
        }
    },[])

    useEffect(() =>{
        getUserDetails()
    },[])
    const getUserDetails = async() => {
        const providr = new ethers.BrowserProvider(windowdata.ethereum);
        await providr.send("eth_requestAccounts", []);
        const signer = await providr.getSigner();
        const address = await signer.getAddress();
        const balance = await providr.getBalance(address);
        const convertedBalance = ethers.formatEther(balance)
        setSigner(signer)
        setSelectedAddress(address );
        setBalance(convertedBalance)
        fetchTransactionHistory("0x281055afc982d96fab65b3a49cac8b878184cb16")
    }
    const [ errorMessage, setErrorMessage] = useState<string>("")

    const fetchTransactionHistory = async (address:string) => {
        const apiKey = 'MYXC21APAUQJS5I8NHF7GGMDVMBXT8VEID'; // Get your API key from Etherscan
        const apiUrl = `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=asc&apikey=${apiKey}&page=1`;
      
        try {
          const response = await axios.get(apiUrl);
          console.log("response",response)
          const transactions = response.data.result;
          if(response.data.result.length > 0){
            const destructeddata =  response.data.result.slice(0,10).map((history:any) => {
                return {
                    blockNumber:history.blockNumber,
                    timeStamp:new Date(history.timeStamp * 1000).toLocaleString('en-US'),
                    hash:history.hash.slice(0,8)+"..."+history.hash.slice(-8),
                    contractAddrss:history.contractAddress,
                    transactionIndex:history.transactionIndex,
                    from:history.from.slice(0,8)+"...",
                    to:history.to.slice(0,8)+"..."
                }
              })
              setTransactionList(destructeddata)
          }
         
          console.log(transactions,"transactions");
        } catch (error) {
          setErrorMessage("Error fetching transaction history")
          // console.error('Error fetching transaction history:', error);
        }
      };
      
      useEffect(() =>{
        console.log("error",errorMessage)
      },[errorMessage])
     
    return(
        <Box>
          <Header />
          <Box sx={{p:"40px"}}>

         
          <Box sx={{textAlign:"left"}}>
          <Typography variant="h5" sx={{textAlign:"left",mt:"20px",mb:"10px"}}>Wallet Details</Typography>
          <hr style={{marginBottom:"10px"}}/>
           <Typography> <b>Connected MeaMask Address: </b>{seelctedAddress}</Typography>
           <Typography><b>Provide:</b>{signer?.provider?._network.name}</Typography>
           <Typography><b>Balance:</b>{balance}</Typography>
          </Box>
          <Box>
            <Typography variant="h5" sx={{textAlign:"left",mt:"20px"}}>Transaction histroy</Typography>
           {errorMessage == ""
            ?  <Typography>{errorMessage}</Typography> :
           <TableComponent tableData={transactionList} search={false} /> 
           }
            
          </Box>
          </Box>
            <Footer />
        </Box>
    )
}

export default ProfilePage