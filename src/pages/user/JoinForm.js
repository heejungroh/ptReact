import React, { useState } from 'react';
import { matchPath } from 'react-router-dom';
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

const JoinForm = () => {
  const [user, setUser] = useState({
    id:"",
    password:"",
    nmae:"",
    email:"",
    address:"",
    auth_pt:"",
});

function inputHandle(e){
  setUser({
    ...user,
          [e.target.name]: e.target.value,
          checked:e.target.checked,
  });
  console.log(user);
}

function submit(e){
  e.preventDefault();
  console.log(user);

  fetch("http://10.100.102.27:8000/user/join", {
   method:"POST",
    body:JSON.stringify(user),
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  })
    .then((res) => res.text())
    .then((res) => {
      if (res === "ok") {
        alert("회원가입 성공");
        window.location.href="/";
      }
    });
}

  return (
      <div>
          <FormStyle>
          <PStyle>
               회원가입
          </PStyle>
              <DivStyle>
              <input 
               type="text"
               name="id"
               onChange={inputHandle}
               placeholder="아이디를 입력하세요"
               /><br/><br/>
               <input 
               type="password"
               name="password"
               onChange={inputHandle}
               placeholder="패스워드를 입력하세요"
               /><br/><br/>
               <input 
               type="text"
               name="name"
               onChange={inputHandle}
               placeholder="이름을 입력하세요"
               /><br/><br/>
               <input 
               type="text"
               name="email"
               onChange={inputHandle}
               placeholder="이메일을 입력하세요"
               /><br/><br/>
               <input 
               type="text"
               name="address"
               onChange={inputHandle}
               placeholder="주소를 입력하세요"
               /><br/><br/>
               <input type="radio" name="auth_pt" value="1" checked={useState.checked} onChange={inputHandle}/>일반회원
               <input type="radio" name="auth_pt" value="2" checked={useState.checked} onChange={inputHandle}/>강사회원
               <br/><br/>
               <button onClick={submit}>회원가입</button>
               <button type="reset">초기화</button>
          
          </DivStyle>
      </FormStyle>
      </div>
  );
};

export default JoinForm;