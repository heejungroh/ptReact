import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import jwt_decode from 'jwt-decode';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Button from '@material-ui/core/Button';

const UpdateBox = styled.div`
    margin-top: 60px;
`;

const BoardUpdate = (props) => {
    const {no} = props.match.params;  



    const [board, setBoard] = useState({

        user:{

        }
    });

    const [userId, setUserId] = useState();

    function changeValue(e){
        setBoard({
            ...board,
            [e.target.name] : e.target.value,
        });
    }

    function changeValue1(e){
        setBoard({
            ...board,
            [e.target.name] :{textAreaValue: e.target.value},
        });
    }
    useEffect( () => {

        let jwtToken = localStorage.getItem("Authorization");
        let jwt = jwtToken.replace("Bearer", "");
            setUserId(jwt_decode(jwt).id);
        console.log(jwtToken)
        fetch("http://10.100.102.27:8000/boardDetail/" + no, {
            headers : {
                "Authorization" :localStorage.getItem("Authorization")
            }
        })
        .then(res=> res.json())
        .then(res=> {
            console.log(res);
            setBoard(res);
        });
    },[])

    function updateBoard(){
        fetch("http://10.100.102.27:8000/board/modify/"+no, {
         method: "PUT",
         headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Authorization": localStorage.getItem("Authorization")
         },
         body: JSON.stringify(board)
      }).then(res => {
            return res.text();
            
      }).then(res => {
         if (res === "ok") {
                window.location="/boardDetail/"+ no
         } else {
            alert('수정 실패');
         }
      });

    }
    
    return (
        <div>
            <UpdateBox>
            <h1>글 수정</h1>
            </UpdateBox>
            <table>
            <tr>
            <td>제목 :</td>
            <td><input type="text" value={board.title} name="title" onChange={changeValue}/></td>
                
            </tr>
            
            <tr>
            <td>작성자 :</td>
            <td><input type="text" value={board.user.id} name="title" readOnly="true" /></td>

            </tr>

            <tr>
            <td>작성일 :</td>
            <td><input type="text" value={board.createDate} name="title" readOnly="true" /></td>

            </tr>
            <tr>
                <td>내용</td>
                <td> <textarea cols="70" row="15" value={board.content} onChange={changeValue1}>
                            
                    </textarea></td>

        </tr>

            </table>
            <Button
        variant="contained"
        color="primary"
        startIcon={<CloudUploadIcon />}
        onClick={()=> updateBoard()}
        >
        수정
      </Button>
        </div>
    );
};

export default BoardUpdate;