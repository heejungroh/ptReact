import React, { Component } from 'react';
import { AlignCenter } from 'react-bootstrap-icons';
import DaumPostcode from 'react-daum-postcode';
import styled from 'styled-components';
import AddLocationOutlinedIcon from '@material-ui/icons/AddLocationOutlined';

const ModStyle = styled.div`
    text-align:right;
    margin-right:30px;
    margin-top:80px;
`;

const IconStyle={
    cursor: "pointer",
};


class AddrModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            address: "",
            zoneCode : "",
            fullAddress : "",
            isDaumPost : false,
            isRegister : false,
            register: [],
        }
    }

    handleOpenPost = () => {
        this.setState({
            isDaumPost : true
        })
    }

    // postcode
    handleAddress = (data) => {
        let AllAddress = data.address;
        let extraAddress = ''; 
        let sigungu = data.sigungu;
        let sido = data.sido;
        
        
        if (data.addressType === 'R') {
          if (data.bname !== '') {
            extraAddress += data.bname;
          }
          if (data.buildingName !== '') {
            extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
          }
         AllAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
        }
        this.setState ({
            fullAddress: sido +" "+sigungu,
            sigungu : sigungu
        })
      }

    render() {
        const { isModalShow, isModalClose } = this.props;
        const { address, isDaumPost, fullAddress, zoneCode, isRegister } = this.state;
        
        // DaumPostCode style
        const width = 595;
        const height = 450;
        const modalStyle = {
            position: "absolute",
            top: 200,
            left: "800px",
            zIndex: "100",
            border: "1px solid #000000",
            overflow: "hidden"
        }
    
    return (
        <div className="modalRow">
            <ModStyle>
                  <div className="modalCell">
                      <div className="cellFirst">
                          <div className="zipCode">{zoneCode}</div>
                          
                              <AddLocationOutlinedIcon onClick={this.handleOpenPost} style={IconStyle}/>
                          
                      </div>
                      {
                          isDaumPost ?
                              <DaumPostcode
                                  onComplete={this.handleAddress}
                                  autoClose
                                  width={width}
                                  height={height}
                                  style={modalStyle}
                                  isDaumPost={isDaumPost}
                          		/>
                          : null
                      }
                      <input type="text" class="address" placeholder="내 위치 등록하기" value={fullAddress} />
                      
                      
                      {/* <div className="addressBox">this.handleInput}/>
                      </div> */}
                  </div>
                  </ModStyle>
                  </div>
            );
        }
    }


export default AddrModal;