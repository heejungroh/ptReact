import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import AddrModal from '../components/AddrModal';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Slider2 from '../components/Slider2';
import CardForm2 from '../pages/board/CardForm2';
import StarBorderIcon from '@material-ui/icons/StarBorder';


const CardWrap = styled.div`
  text-align:center;
  margin-right:30px;
  margin-left:30px;
  margin-top:10px;
  margin-bottom:300px;
`;

const SpanStyle = styled.span`
  font-size:20px;
  font-weight:bolder;
  padding-left:30px;
  color:grey;
`;

const TitleStyle = styled.span`
  font-size:40px;
  font-weight:bolder;
  padding-left:40px;
`;

const Button = styled.button`
  
    background-color : white;
    font-size: 15px;
    border: 2px solid lightgray;
    font-weight: bold;
    margin : 10px auto;
   
  `;

  const ButtonBox = styled.div`
    margin-right : 25px ;
    float: right;
  `;

const ProfileHome = () => {

    const [user, setUser] = useState({});

  useEffect ( () => {
    fetch("http://10.100.102.27:8000/user/info",{
      headers:{
        "Authorization":localStorage.getItem("Authorization"),
      }
    }).then(res => res.json())
    .then( res=>{
      setUser(res);
      console.log(res);
      console.log(res.auth_pt);
    })


  } ,[])
    return (
      <div>
      <AddrModal/>
        <TitleStyle>PROFILE</TitleStyle>
        <Slider2/>
      {user.auth_pt === 3 ?   <Link to = "/profileregister"> <ButtonBox><Button>등록</Button></ButtonBox> </Link>
      :   ""
    }
        <br/><br/>
        <SpanStyle><StarBorderIcon/>이 달의 인기 스튜디오</SpanStyle>
        <CardWrap>
        <CardForm2 />
        </CardWrap>
      <Footer/>
  </div>
    )
}

export default ProfileHome;