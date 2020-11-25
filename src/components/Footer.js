import React from 'react'
import FitnessCenterOutlinedIcon from '@material-ui/icons/FitnessCenterOutlined';
import styled from 'styled-components';

const UlStyle = styled.ul`
    display:flex;
    list-style:none;
    color:white;
    justify-content:center;
    margin-right:10%;
    font-size:5px;
    margin-top:50px;
`;

const LiStyle = styled.li`
    padding-left:80px;
`;

const PStyle = styled.p`
    color:white;
    font-size:7px;
    font-weight:bolder;
`;

const DivStyle = styled.div`
    text-align:center;
`;

const Footer = () => {
    return (
        <footer className="py-4 bg-dark">
            
                <UlStyle>
                    <LiStyle><FitnessCenterOutlinedIcon/></LiStyle>
                    <LiStyle>Joowan</LiStyle>
                    <LiStyle>Jaehyun</LiStyle>
                    <LiStyle>Gunhee</LiStyle>
                    <LiStyle>Heejung</LiStyle>
                </UlStyle>
                <DivStyle>
                    <PStyle>부산 IT 교육센터</PStyle>
                </DivStyle>
            
        </footer>
    )
}

export default Footer