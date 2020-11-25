import React, { useEffect, useState } from 'react';
import { Pagination } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const TableStyle = styled.table`
    margin: 10px 10px 10px 10px;
    text-align:center;
    border : 1px solid black;
    border-radius : 2px;
`;

const Admin = (props) => {
    const [userList, setUserList] = useState([]);
    const [last, setLast] = useState('');
     const [page, setPage] = useState(0);
    
    const prev = () =>{
        setPage(page-1);
      }
  
      const next = () =>{
        setPage(page+1);
      }

    useEffect(() => {
        fetch("http://10.100.102.27:8000/admin/userList", {
          method: "GET",
          headers: {
            "Authorization": localStorage.getItem("Authorization")
          },
        }).then(res => res.json())
          .then(res => {
            console.log(res);
            setUserList(res.content);
            setLast(res.last);
          });
      }, []);

    const giveAuth = (no) =>{
      console.log(no);
        fetch("http://10.100.102.27:8000/admin/userAuth/" + no, {
          method: "put",
          headers: {
            "Authorization": localStorage.getItem("Authorization")
          },
        })
        .then(res => res.text())
        .then(res => {
          if(res === "ok"){
            alert("승인되었습니다");
            window.location.reload();
          }
        });
    }

    return (
        <div>

            <Link to={`/pthome`}>
                <button>메인화면</button>
            </Link>

            <hr/>

            <table className="tableStyle">
                
                    <th>회원 번호</th>
                    <th>회원 아이디</th>
                    <th>회원 종류</th>
                    <th>회원 정보</th>
                    <th>승인 버튼</th>
           
                {userList.map((user) => (
                    <tr key={user.userNo}>
                        <td>{user.userNo}</td>
                        <td>{user.id}</td>
                        <td>{user.auth_pt}</td>
                        <td>{user.address}</td>
                        <td><button onClick={()=>giveAuth(user.userNo)} disabled={user.auth_pt === 2 ? false : true}>승인</button></td>
                        
                    </tr>
                ))}
                <div className="d-flex justify-content-center">
                  <Pagination>
                    {page === 0 ? 
                      <Pagination.Item onClick={prev} disabled>Prev</Pagination.Item> : 
                      <Pagination.Item onClick={prev}>Prev</Pagination.Item>}
                    {last === true ? 
                      <Pagination.Item onClick={next} disabled>Next</Pagination.Item> : 
                      <Pagination.Item onClick={next}>Next</Pagination.Item>}
                  </Pagination>
                </div>
            </table>
        </div>
    );
};


export default Admin;