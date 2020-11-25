import { Card, CardActionArea, CardContent, CardMedia, makeStyles, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const CardDivStyle = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width : 100%;
  margin : 70px 30px 190px 30px;
  height: 100%;
`;

const useStyles = makeStyles({
  media: {
    height: 100,
    width: 100
  }
});


const ReviewSlide = () => {
    const classes = useStyles();

    const [reviews , setReview] = useState([]);

  useEffect(()=> {
    fetch("http://10.100.102.27:8000/ptList"
      
    )
    .then(res => res.json()).then(
      res =>{
        console.log(res)
            setReview(res.content)
      }
    )
  },[])

  return (
    
    <CardDivStyle>  
                {reviews.map( (review) => (
                   <Card className="cardStyle">
                        <CardActionArea>
                            <CardMedia
                            className={classes.media}
                            image={review.pt_img}
                            title="Contemplative Reptile"
                            />
                            <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {review.pt_name}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {review.pt_address}
                            </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                ))}
    </CardDivStyle>

  );
};

export default ReviewSlide;