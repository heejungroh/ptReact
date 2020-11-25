import React from 'react';
import styled from 'styled-components';

const TableStyle = styled.table`
    margin-left:auto;
    margin-right:auto;
    border:3px solid skyblue;
`;

const TdStyle = styled.td`
    border:1px solid skyblue;
`;




const DeleteForm = () => {
    return (
        <div>
            <TableStyle>
                <tr>
                    <TdStyle>비밀번호</TdStyle>
                    <TdStyle><input type="password" name="password" maxLength="50"></input></TdStyle>
                </tr>
            </TableStyle>
            <br/>
            <button>취소</button>
            <button >탈퇴</button>
        </div>
    );
};

export default DeleteForm;