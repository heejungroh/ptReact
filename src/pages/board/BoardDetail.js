import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import jwt_decode from 'jwt-decode';
import { Link } from 'react-router-dom';
import SaveIcon from '@material-ui/icons/Save';


const Container = styled.div`

    margin-top : 60px;
    background-color: #aaaaaa;
    text-align:center;
    height:50px;
    border-bottom: 1px solid #808080;
    margin-bottom: 10px;
    
`;

const BoardDetail = (props) => {


    
    const { no } = props.match.params;
    
    const[ board, setBoard] = useState({
        user : {

        }
    });
    const [userId, setUserId] = useState();


    function inputHandle(e){
        setBoard({
            ...board,
            [e.target.name] : e.target.value,
        });
    }

    useEffect( () => {
        if(localStorage.getItem("Authorization") !== null) {
            let jwtToken = localStorage.getItem("Authorization");
            let jwt = jwtToken.replace("Bearer", "");
            setUserId(jwt_decode(jwt).id);
        }
        fetch("http://10.100.102.27:8000/boardDetail/" + no)
        .then( res=> res.json())
        .then(res => {
            console.log(res);
            setBoard(res);
            console.log("확인");
            
            
        });

    },[]);
    const  deleteBoard= (boardNo)=> {
        console.log(boardNo);        
         fetch("http://10.100.102.27:8000/board/delete/"+boardNo,{
             method:"DELETE",
             headers:{
                 "Authorization" :localStorage.getItem("Authorization")
             }
         })
         .then(res=>res.text())
         .then(res =>{
             if(res ==="ok"){
                 alert("삭제완료");
                 props.history.push("/boardlist")
 
             }else{
                 alert("삭제실패");
             }
         });
 
     }

     const updateBoard = (boardNo) => {
         console.log(boardNo)
         window.location="/boardUpdate/"+ boardNo

     }
   

     
    return (
        <div>
            <Container>
            <h3>상세보기</h3>
            </Container>
            <table>
        <tr>
            <td>제목 : </td>
            <td>{board.title}</td>


        </tr>
        <tr>
            <td>작성자 : </td>
            <td>{board.user.id} </td>
        </tr>
        <tr>
            <td>작성일 : </td>
            <td>{board.createDate} </td>
        </tr>

        <tr>
                <td>내용</td>
                <td> <textarea cols="70" row="15" value={board.content}></textarea></td>

        </tr>
       
            </table>
        {board.user.userNo === userId  ? <>

            <Button
        variant="contained"
        color="secondary"
        startIcon={<DeleteIcon />}
        onClick={()=> deleteBoard(board.boardNo)}
        >
        삭제
      </Button>
     
      <Button
        variant="contained"
        color="primary"
        startIcon={<CloudUploadIcon />}
        onClick={()=> updateBoard(board.boardNo)}
        >
        수정
      </Button>
      

      </>
         :
         ""

        }
        <Link to="/boardlist">
         <Button
        variant="contained"
        color="primary"
        size="small"
        startIcon={<SaveIcon />}
      >
        목록
      </Button>
      </Link>
           
        </div>
    );
};

export default BoardDetail;