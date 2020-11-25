import React, { useEffect, useState } from 'react';
import { Pagination } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';


const List = (props) => {
    
    const type = props.type;

    const [shops, setShops] = useState([]);
    const [last, setLast] = useState('');
  	const [page, setPage] = useState(0);

    const Container = styled.div`
      text-align: center;
    `;

    const FlexStyle = styled.div`
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
    `;

      const CardImgStyle = styled.img`
        height: 180px;
        width: 100%;
      `;

      const AddStyle = styled.div`
        margin: 5px 0;
        font-size: 13px;
        color: grey;
      `;
      const TitleStyle = styled.div`
        font-size: 18px;
        font-weight: 600;
        color: rgb(61, 60, 60);
      `;
      const PriceStyle = styled.div`
        font-size: 12px;
        color: rgb(30, 119, 115);
        font-weight: 400;
      `;
      const SummaryStyle = styled.div`
        font-size: 12px;
        color: lightgrey;
        font-weight: 300;
      `;

    const CardStyle = styled.div`
        margin: 10px;
        padding: 5px;
        height: 400px;
        width: 300px;
        border: 1px solid rgb(197, 197, 197);
        border-radius: 10px;
        box-shadow: 1px 1px 0px 0px rgb(54, 53, 53);
    `;

    const prev = () =>{
      setPage(page-1);
    }

    const next = () =>{
      setPage(page+1);
    }


    //받아올 때 gym과 studio를 구분해서 주소 처리 
      useEffect(() => {
        fetch("http://10.100.102.27:8000/ptList", {
          method: "GET"
        }).then(res => res.json())
          .then(res => {
            console.log(res);
            setShops(res.content);
            setLast(res.last);
          });
      }, [page]);
        
    return (
      <Container>
        {type}검색 결과
        <FlexStyle>
           {shops.map((shop) => (
             <CardStyle key={shop.id}>
             <CardImgStyle src={shop.pt_img}/>
            <div>
                <AddStyle>{shop.pt_address}</AddStyle>
                <Link shop={shop} to={`/shop/${shop.ptNo}`}>
                  <TitleStyle>{shop.pt_name}</TitleStyle>
                </Link>

                
                <PriceStyle>{shop.pt_price}</PriceStyle>
                <SummaryStyle>{shop.pt_content}</SummaryStyle>
                
            </div>
             </CardStyle>
           ))}
        </FlexStyle>
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
      </Container>
    );
};

export default List;