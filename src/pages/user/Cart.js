import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PaymentIcon from '@material-ui/icons/Payment';

 
 
const useStyles = makeStyles({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 140,
    },
  });

  const CardBox = styled.div`
  
    margin-top : 65px;
    margin-bottom:50px;
  `;

  const CardContainer = styled.div`
    
        margin : 0px 20px;
  `;


const Cart = () => {
    const classes = useStyles();

    const[cartList, setCartList] = useState([]);

    useEffect(()=>{
      fetch("http://10.100.102.27:8000/user/info",{
        headers:{
          "Authorization":localStorage.getItem("Authorization"),
        }
      })
        .then((res) => res.json())
        .then((res) => {
          setCartList(res.wishs);
        });
    },[]);

    const removeItem =(wishNo)=>{
      

      fetch("http://10.100.102.27:8000/wish/"+wishNo , {
      method: "delete",
      headers: {
        "Authorization":localStorage.getItem("Authorization"),
      },
      })
      .then(function (res) {
        console.log(res);
        return res.text();
      })
      .then((res) => {
        if (res === "ok") {
          let newCartList = cartList.filter((cart) => cart.wishNo !== wishNo);
          setCartList(newCartList);
        }
      
      });
      }
      
    
    return (
        <div>
            <CardBox>
            <h1>장바구니</h1>
            </CardBox>
            <form id="ptType"><input type="hidden" name="type" value="pt"/></form>
            {cartList.map( (carts) => (
            <CardContainer> 
            <Card className={classes.root}>
         <CardActionArea>
           <CardMedia
             className={classes.media}
             image={carts.pt.pt_img}
             title="Contemplative Reptile"
           />
           <CardContent>
             <Typography gutterBottom variant="h5" component="h2">
               {carts.pt.pt_name}
             </Typography>
             <Typography variant="body2" color="textSecondary" component="p">
             {carts.pt.pt_address}
             </Typography>
           </CardContent>
         </CardActionArea>

         <CardActions>
           <Button size="small" color="primary" onClick={()=>removeItem(carts.wishNo)}>
             <FavoriteIcon/>
           </Button>
           
         </CardActions>
       </Card>
       </CardContainer>
       ))}
       <Button size="small" color="primary">
          <PaymentIcon/>
        </Button>
        </div>
       
    );
}

export default Cart;