import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

//상품 번호를 장바구니 테이블에 넣는다
const StdNavTool = (props) => {
    const {price, stNo} = props;
    
const addCart = (e) =>{
  e.preventDefault();
  let form = document.getElementById("form");
  const formData = new FormData(form);
  console.log(formData);
  fetch("http://10.100.102.27:8000/wish/" + stNo, {
          method: "POST",
          headers: {
            "Authorization": localStorage.getItem("Authorization")
          },
          body: formData
  })
    .then((res) => res.text())
    .then((res) => {
      if (res === "ok") {
        alert("장바구니에 담겼습니다");
      }else{
    alert("장바구니에 담기지 않았습니다");
  }
  });
}

const pay = (e) =>{
  e.preventDefault();
  let form = document.getElementById("form");
  const formData = new FormData(form);
  formData.append("order_no", stNo);
  console.log(formData);
  fetch("http://10.100.102.27:8000/order", {
          method: "POST",
          headers: {
            "Authorization": localStorage.getItem("Authorization")
          },
          body: formData
  })
    .then((res) => res.text())
    .then((res) => {
      if (res === "ok") {
        alert("구매에 성공했습니다");
      }else{
    alert("구매에 실패했습니다");
  }
  });
}

    return (
        <div >
          <h1>{price} 원</h1>
          <h2 className="salePrice">할인가 : {price * 0.8}</h2>
          <br/>
          <Link to={`/sangdam`}>
            <button>카톡 상담</button>
          </Link>
          <br/>
          
          <form id="form">
            <input type="hidden" name="type" value="st" />
          </form>
          <button onClick={addCart}>장바구니 추가</button>
          <button onClick={pay}>바로 결제</button>
        </div>
    );
};

export default StdNavTool;