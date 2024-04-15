import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";

const TableComponent = ({
  tableData,
  search = true,
}: {
  tableData: any;
  search?: boolean;
}) => {
  const theme = useTheme();
  const greaterThanMid = useMediaQuery(theme.breakpoints.up("md"));
  const smallToMid = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const lessThanSmall = useMediaQuery(theme.breakpoints.down("sm"));
  console.log(tableData, "tokenList");
  const [originalData, setOriginalData] = useState<any>(tableData);
  const [tableData1, setTableData] = useState<any>([]);
  const [headers, setHeaders] = useState<string[]>([]);

  const getHeaders = (data: any) => {
    if (data?.length > 0) {
      var headerdata = Object.keys(data[0]);
      var filteredData;
      if (greaterThanMid) {
        filteredData = headerdata.slice(0, 5);
      } else if (smallToMid) {
        filteredData = headerdata.slice(0, 3);
      } else {
        filteredData = headerdata.slice(0, 2);
      }
      setHeaders(filteredData);
      setTableData(data);
    }
  };
  useEffect(() => {
    getHeaders(tableData);
  }, [tableData, greaterThanMid, smallToMid]);
  useEffect(() => {}, [tableData1]);

  useEffect(() => {}, [tableData1]);
const [ showMessage, setShowMessage] = useState(false)
  const handleSearch = (text: any) => {
    if(text.length ==0){
      getHeaders(tableData);
      setShowMessage(false)
      return false
    }
    const data = tableData;
    const filteredData = data.filter(
      (list: any) =>
        list.Name.indexOf(text) > -1 || list.Symbol.indexOf(text) > -1
    );
    console.log("filteredData", filteredData);
   if(filteredData.length != 0){
    getHeaders(filteredData);
    setShowMessage(false)
   }else{
    setShowMessage(true)
   }
   
  };
  return (
    <Box sx={{ mt: "20px" }}>
      <Box sx={{float:"right"}}>
      {search && (
        <TextField
          type="text"
          name="Serach"
          placeholder="Search"
          inputProps={{
            style: {
              padding: "10px",
              border: "1px solid",float:"right",
              borderColor:
                theme.palette.mode == "dark"
                  ? "var(--input-border-dark)"
                  : "var(--input-border-light)",
              color:
                theme.palette.mode == "dark"
                  ? "var(--input-border-dark)"
                  : "var(--input-border-light)",
            },
          }}
          sx={{
            width: "200px",
            mb: "20px",
            background: "transparent",
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
              {
                border: "none",
              },
          }}
          onChange={(e) => handleSearch(e.target.value)}
        />
      )}
      </Box>
     

      <TableContainer sx={{ position: "relative", overflowX: "hidden" }}>
        <Table sx={{ minWidth: 650, border: "none" }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {headers?.map((item, index) => (
                <TableCell
                  sx={{
                    background:
                      theme.palette.mode == "dark"
                        ? "var(--table-header-bg-dark)"
                        : "var(--table-header-bg-dark)",
                    color: "white",
                  }}
                >
                  {item}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {showMessage ?  <TableRow sx={{p:"15px"}}> <TableCell colSpan={headers.length} sx={{textAlign:"center"}}>No Record Found</TableCell></TableRow> : tableData1?.map((row: any, rowindex: any) => (
              <TableRow key={row.Title}>
                {headers?.map((item: any, headerindex) => (
                  <>
                    <TableCell
                      sx={{
                        color:
                          theme.palette.mode == "dark"
                            ? "var(--input-border-dark)"
                            : "var(--input-border-light)",
                      }}
                    >
                      {item == "Symbol" ? row[item].toUpperCase() : row[item]}
                    </TableCell>
                  </>
                ))}
              </TableRow>
            ))}
            {}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
export default TableComponent;
