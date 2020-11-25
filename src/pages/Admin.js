import React, { useEffect, useState } from 'react';
import { Pagination } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const TableStyle = styled.div`
border : 1px solid black;
border-radius : 2px;
`;

const Admin = () => {
    const [userList, setUserList] = useState();
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
      }, [page]);

    const giveAuth = () =>{
        fetch("http://10.100.102.27:8000/", {
          method: "put",
          body: JSON.stringify(),
          headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("Authorization")
          },
        })
        .then(res => res.text())
        .then(res => {
          if(res === "ok"){
            alert("승인되었습니다");    
          }
        });
    }

    return (
        <div>

            <Link to={`/pthome`}>
                <button>메인화면</button>
            </Link>

            <hr/>



            <TableStyle>
                
                    <th>회원 번호</th>
                    <th>회원 아이디</th>
                    <th>회원 종류</th>
                    <th>회원 정보</th>
                    <th>승인 버튼</th>
           
                {userList.map((user) => (
                    <tr>
                        <td>{user.no}</td>
                        <td>{user.id}</td>
                        <td>{user.auth_pt}</td>
                        <td>{user.content}</td>
                        <td><button onClick={giveAuth} disabled={true}>승인</button></td>
                        
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
            </TableStyle>
        </div>
    );
};


export default Admin;