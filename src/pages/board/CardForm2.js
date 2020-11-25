import React, { Component, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import styled from "styled-components";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { Link } from "react-router-dom";
import { render } from "@testing-library/react";



const CardDivStyle = styled.div`
  display:grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap : 30px;
  width : 100%;
  
  height: 100%;
`;

const ButtonStyle = styled.button`
      background: 0 0;
    border: 0;
`;

const useStyles = makeStyles({
  media: {
    height: 140,
    
  }
});


export default function MediaCard(){

  
  

  const classes = useStyles();
  
  const [card , setCard] = useState([]);

  const [wishStNo, setwishStNo] = useState([]);

  useEffect(()=> {

    fetch("http://10.100.102.27:8000/wish/info",{
      headers:{
        "Authorization":localStorage.getItem("Authorization"),
      }
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("wish", res);
      });


    fetch("http://10.100.102.27:8000/stList")
    .then(res => res.json()).then(
      res =>{
            setCard(res.content)
            console.log("stList", res);
            //setwishPtNo(res.content.user);
      }
    )
  },[])

  

  function CartBtn(stNo){
   

    const cardType = document.getElementById("cardForm");
    const form = new FormData(cardType); 

  fetch("http://10.100.102.27:8000/wish/"+stNo, {
   method:"POST",
   body: form,
    headers: {
      "Authorization":localStorage.getItem("Authorization"),
    },
  })
    .then((res) => res.text())
    .then((res) => {
      if (res === "ok") {
        alert("찜하였습니다!");
        window.location.href="/";
      }
    });
  }

  // const removeItem =(wishNo)=>{
      

  //   fetch("http://10.100.102.27:8000/wish/"+wishNo , {
  //   method: "delete",
  //   headers: {
  //     "Authorization":localStorage.getItem("Authorization"),
  //   },
  //   })
  //   .then(function (res) {
  //     console.log(res);
  //     return res.text();
  //   })
  //   .then();
  //   }
  
    
    const empty = (
      <Button size="small" color="primary">
          <FavoriteBorderIcon/>
        </Button>
    )
  
  return (
    
    <CardDivStyle>  
    {card.map( (cards) => (
    <Card>
    <Link shop={cards} to={`/stshop/${cards.stNo}`}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={cards.st_img}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {cards.st_name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          {cards.st_address}
          </Typography>
        </CardContent>
      </CardActionArea>
      </Link>
      <CardActions>
        <form id="cardForm"><input type="hidden" name="type" value="pt" /></form>
        <Button size="small" color="primary" onClick={() => CartBtn(cards.ptNo)}>
        <span class="fr66n"><ButtonStyle class="wpO6b " type="button"><div class="QBdPU "><span class="FY9nT"><svg aria-label="좋아요 취소" class="_8-yf5 " fill="#ed4956" height="24" viewBox="0 0 48 48" width="24"><path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path></svg></span></div></ButtonStyle></span>

    </Button>
      </CardActions>
    </Card>
    ))}
    </CardDivStyle>


  );
      
};