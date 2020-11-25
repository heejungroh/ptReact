import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const FormStyle = styled.form`
    margin-top:100px;
    
`;

const DivStyle = styled.div`
    border:1px black solid;
    text-align:center;
    padding:10px;
`;

const PStyle = styled.p`
    text-align:center;
    font-size:2em;
`;



const Account = () => {
  const [user, setUser] = useState({
    id:"",
    password:"",
    name:"",
    email:"",
    address:"",
    auth_pt:"",
});


function userFetch() {
fetch("http://10.100.102.27:8000/user/info",{
  headers:{
    "Authorization":localStorage.getItem("Authorization"),
  }
})
  .then((res) => res.json())
  .then((res) => {
    setUser(res);
    console.log(res);
  });
}

useEffect(() => {
userFetch();
}, []);

const inputChange = (e) => {
setUser({ ...user, [e.target.name]: e.target.value });
console.log(user);
};

const updateBtn = (e) => {
e.preventDefault();

fetch("http://10.100.102.27:8000/user/modify", {
  method: "PUT",
  body: JSON.stringify(user),
  headers: {
    "Content-Type": "application/json",
    "Authorization":localStorage.getItem("Authorization"),
  },
})
  .then((res) => res.text())
  .then((res) => {
    if (res === "ok") {
      alert("수정 성공");
    }else{
  alert("수정 실패");
}
});
};

const deleteBtn =(e)=>{
e.preventDefault();
fetch("http://10.100.102.27:8000/user/remove" , {
method: "delete",
headers: {

  "Authorization":localStorage.getItem("Authorization"),
},
})
.then(function (res) {
  console.log(res);
  return res.text();
})
.then((res) => {
  if (res === "ok") {
    alert("탈퇴 되셨습니다.");
  }else{
alert("탈퇴 실패");
}
});
}

return (
    <div>
    <FormStyle>
        <PStyle>
             회원정보
        </PStyle>
            <DivStyle>
            <input 
             type="text"
             name="id"
             value={user.id}
             onChange={inputChange}
             placeholder="아이디를 입력하세요"
             readOnly
             /><br/><br/>
             <input 
             type="password"
             name="password"
             value={user.password}
             onChange={inputChange}
             placeholder="패스워드를 입력하세요"
             readOnly
             /><br/><br/>
             <input 
             type="text"
             name="name"
             value={user.name}
             onChange={inputChange}
             placeholder="이름을 입력하세요"
             /><br/><br/>
             <input 
             type="text"
             name="email"
             value={user.email}
             onChange={inputChange}
             placeholder="이메일을 입력하세요"
             /><br/><br/>
             <input 
             type="text"
             name="address"
             value={user.address}
             onChange={inputChange}
             placeholder="주소를 입력하세요"
             /><br/><br/>
             <input type="radio"
              name="auth_pt"
              checked={user.auth_pt}
              value="1"
               onChange={inputChange}
               disabled
              />일반회원
             <input type="radio"
              name="auth_pt" 
              checked={user.auth_pt}
              value="2"
               onChange={inputChange}
               disabled
              />강사회원
             <br/><br/>
             <button onClick={updateBtn}>수정</button>
             <button onClick={deleteBtn}>탈퇴</button>
        </DivStyle>
    </FormStyle>
    </div>
);
};

export default Account;