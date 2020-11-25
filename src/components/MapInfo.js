import React, { useEffect } from 'react';


const { kakao } = window;


const MapInfo = (props) => {
    const {name, add} = props;

    useEffect(() => {
        const container = document.getElementById("myMap");
        const options = {
          center: new kakao.maps.LatLng(35.157588, 129.058822),
          level: 3,
        };
        const map = new kakao.maps.Map(container, options);

        const geo = new kakao.maps.services.Geocoder();

        // 주소로 좌표를 검색합니다
        geo.addressSearch(add, function(result, status) {
        
            // 정상적으로 검색이 완료됐으면 
             if (status === kakao.maps.services.Status.OK) {
        
                let coords = new kakao.maps.LatLng(result[0].y, result[0].x);
        
                // 결과값으로 받은 위치를 마커로 표시합니다
                let marker = new kakao.maps.Marker({
                    map: map,
                    position: coords
                });
        
                // 인포윈도우로 장소에 대한 설명을 표시합니다
                let infowindow = new kakao.maps.InfoWindow({
                    content: '<div style="width:80px;text-align:center;">'+name+'</div>'
                });
                infowindow.open(map, marker);
        
                // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
                map.setCenter(coords);
            } 
        });    
  
       
      }, []);

    
    
    return (
        <div id='myMap' style={{
            width: '200x', 
            height: '300px'
        }}></div>
    );
};

export default MapInfo;