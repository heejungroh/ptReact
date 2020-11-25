import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table'
import { useSelector } from 'react-redux';


const Board = styled.div`
    margin-top:60px;
`
  const ButtonClick = styled.div`

        margin-top:5px;
        margin-right:5px;
        font-weight: bold;
        float : right;
    
  `;

  
const Pfont = styled.p`

   font-style: normal;
`;
 
  
const BoardList = () => {

  const isLogin = useSelector((store)=> store.isLogin);
    const [list , setList] = useState([]);
    useEffect( () => {
        fetch("http://10.100.102.27:8000/boardList")
        .then( res => res.json())
        .then(res=> {
          
          setList(res.content);
            console.log(res);
        });
    }, []);
    
    return (
        <div>
            <Board>
            <h1>자유 게시판</h1>
            </Board>
            <Table striped bordered hover variant="gray">
  <thead>
    <tr>
      <th>번호</th>
      <th>제목</th>
      <th>작성자</th>
      <th>작성일</th>
    </tr>
  </thead>
  <tbody>
    {list.map((lists) => (

    
    <tr>
     <td>{lists.boardNo}</td>
     <Pfont><Link to={`/boardDetail/${lists.boardNo}`}><td>{lists.title}</td></Link></Pfont>
      <td>{lists.user.id}</td>
      <td>{lists.createDate}</td>
    </tr>
    ))}
    
  </tbody>
</Table>
      {isLogin ? <> 
    <ButtonClick>
    <Link to="/boardWrite"><Button variant="contained" >글쓰기</Button></Link>
    </ButtonClick>
  </>   :

  "" }
        </div>
    );
};

export default BoardList;