import { makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, withStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import styled from 'styled-components';

const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.grey[300],
      color: theme.palette.common.black,
    },
    body: {
      fontSize: 14,
    },
    
    
  
  }))(TableCell);
  
  const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);
  
  
  const useStyles = makeStyles({
    table: {
      minWidth: 700,
    },
  });
  
   function CustomizedTables() {
    
  }
  
  const Container = styled.div`
      margin-top: 60px;
  `;
  

const OrderPage = () => {
    const [order, setOrder] = useState([]);

    useEffect(() => {
        fetch("http://10.100.102.27:8000/user/info",{
            headers:{
                "Authorization":localStorage.getItem("Authorization"),
              }
        }).then(res => res.json())
        .then(res =>{
            setOrder(res.orders);
            console.log(res.orders);
    });
 }, []);

 function details(){
  console.log("dd");
 }
    
    return (
        <div>
           
            <Container>
            <h1>주문 내역 조회</h1>
            </Container>
                <TableContainer component={Paper}>
      <Table  aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>업체 명</StyledTableCell>
            <StyledTableCell align="right">위치</StyledTableCell>
            <StyledTableCell align="right">주문 번호</StyledTableCell>
            <StyledTableCell align="right">금액</StyledTableCell>
            <StyledTableCell align="right">주문 일자</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {order.map((orders) => (
            <StyledTableRow key={orders.pt.pt_name}>
              <StyledTableCell component="th" scope="row" onClick={details}>
                {orders.pt.pt_name}
              </StyledTableCell>
              <StyledTableCell align="right">{orders.pt.pt_address}</StyledTableCell>
              <StyledTableCell align="right">{orders.orderNo}</StyledTableCell>
              <StyledTableCell align="right">{orders.pt.pt_price}</StyledTableCell>
              <StyledTableCell align="right">{orders.orderDate}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

            
          
        </div>
    );
}

export default OrderPage;