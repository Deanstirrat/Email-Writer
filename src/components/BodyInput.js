import React from 'react';
import styled from 'styled-components'

export const BodyInput = ({id, details, onChange, remove}) => {

  return(
    <ComponentContainer>
      <InputContainer onChange={(e) => onChange(e, id)} value={details}></InputContainer>
      <RemoveButton onClick={(e) => remove(id)}>Remove</RemoveButton>
    </ComponentContainer>
  );
}

const ComponentContainer = styled.div`
display: flex;
align-items: center;
gap: 5px;
`;
const InputContainer = styled.textarea`
font-family: arial;
`;
const RemoveButton = styled.button`
border-style: none;
border-radius: 5px;
padding: 2px;
color: white;
background-color: #37371f;
&:hover{
  background-color: #ff4040;
  cursor: pointer;
}
`;