import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const WriteForm = styled.div`
        margin-top :60px;
        text-align:center;
        background-color: #cccc;
        height:60px;
`;

const WriteContainer = styled.div`
    margin-left:auto;
    margin-right:auto;
    background-color: beige;
    display: block;
    width: 50%;
    padding:30px;
    border-collapse: separate;
    border-spacing :1px;
    border-top: 1px solid #ccc;
  


`; 

const Table = styled.table`
                border-collapse: separate;
                border-spacing: 1px;
                text-align: left;
                line-height: 1.5;
                border-top: 1px solid #ccc;
                margin : 20px 10px;

`;

const Tr = styled.tr`
                width: 50px;
                 padding: 10px;
                font-weight: bold;
                vertical-align: top;
                border-bottom: 1px solid #ccc;



`;

const Td = styled.td`
                width: 100px;
                 padding: 10px;
                 vertical-align: top;
                 border-bottom: 1px solid #ccc;
                 font-size: 22px;



`;

 const ButtonBox = styled.button`
    display: inline-block;
    border-style: none;
    margin : 0px auto;

   
`;



const BoardWrite = (props) => {
     const [ board, setBoard] = useState({
            title:"",
            content:"",
     });

    function inputHandle(e){
        setBoard({
            ...board,
            [e.target.name] : e.target.value,
        });
    }
    function submit(e){
        e.preventDefault();
    
        fetch("http://10.100.102.27:8000/board/write", {
            method: "POST",
            body: JSON.stringify(board),
            headers:{
                'Content-Type':"application/json; charset=utf-8",
                "Authorization": localStorage.getItem("Authorization")
            }
        })
        .then(res=> {
            return res.text();
            console.log(res);
        })
        .then( res=>{
            if(res ==="ok"){
                props.history.push("/boardlist");
            }else{
                alert("글 등록 실패");
            }
        });
    }
    return (
        <div>
            <WriteForm>
           <h1> 게시판 글쓰기 </h1>
           </WriteForm>
           <WriteContainer>               
               <Table>
                   <Tr>
            <Td>제목</Td>
           <Td> <input type="text" name="title" placeholder="제목을 입력하세요" onChange={inputHandle}/> </Td>
           </Tr>
         
           <Tr>
               <Td>내용</Td>
           <Td><textarea cols="70" rows="15" name="content" onChange={inputHandle}></textarea></Td>
         </Tr>
           </Table>
           <ButtonBox>
           <Button variant="contained" color="primary" onClick={submit}> 등록</Button>
           <Link to="/boardlist"> <Button variant="contained" color="secondary">목록</Button></Link>
            </ButtonBox>
           </WriteContainer>

         
        </div>
    );
};

export default BoardWrite;