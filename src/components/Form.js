import {React, useState, useEffect} from 'react';
import styled from 'styled-components';
import { BodyInput } from './BodyInput';
import { Dropdown } from './Dropdown';

function FormComponent({toneItems, selectedToneItem, handleToneItemClick, handleItemClick, items, selectedItem, emailDetails, changeRecipient, changeSender, addQuestion, deleteQuestion, changeQuestion, addInform, deleteInform, changeInform}){


  const questionInputs = emailDetails.questions.map((question) => {
    return(
      <BodyInput
        key={question.id}
        id={question.id}
        details={question.value}
        onChange={changeQuestion}
        remove={deleteQuestion}
    ></BodyInput>
    );
});

  const informInputs = emailDetails.informs?.map((inform) => (
    <BodyInput
        key={inform.id}
        id={inform.id}
        details={inform.value}
        onChange={changeInform}
        remove={deleteInform}
    ></BodyInput>
  ));

  return(
  <FormContainer>
    <ToFromSection>
     <InputHeader>
        <div>To:</div>
        <RecipientInput onChange={(e)=>(changeRecipient(e))} value={emailDetails.recipient}></RecipientInput>
        <Dropdown items={items} selectedItem={selectedItem} handleItemClick={handleItemClick} dropdownTitle='Select relation'></Dropdown>
     </InputHeader>
     <InputHeader>
        From:
        <SenderInput onChange={(e)=>(changeSender(e))}></SenderInput>
      </InputHeader>
    </ToFromSection>

<CommentQuestionSection>
  <CommentQuestionHeader>
      Questions:
      <div>{questionInputs}</div>
      <AddButton onClick={addQuestion}>Add question</AddButton>
      </CommentQuestionHeader>

      <CommentQuestionHeader>
      Comments:
      {informInputs}
      <AddButton onClick={addInform}>Add comment</AddButton>
      </CommentQuestionHeader>
  </CommentQuestionSection>
  <Dropdown items={toneItems} selectedItem={selectedToneItem} handleItemClick={handleToneItemClick} dropdownTitle='Select tone'></Dropdown>
  </FormContainer>
  );
}

const FormContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
gap: 15px;
background-color: #c9e3ac;
color: black;
width: 100%;
`;
const ToFromSection = styled.div`
display: flex;
gap: 20px;
@media (max-width:786px) {
  flex-direction: column;
}
`;
const RecipientInput = styled.input`
width: 200px;
padding: 10px;
border-radius: 10px;
border-style: none;
`;
const SenderInput = styled.input`
width: 200px;
padding: 10px;
border-radius: 10px;
border-style: none;
`;
const AddButton = styled.button`
border-style: none;
padding: 8px;
width: 50%;
border-radius: 5px;
background-color: #ea9010;
color: white;
&:hover{
  filter: brightness(80%);
  cursor: pointer;
}
`;
const InputHeader = styled.div`
display: flex;
flex-direction: column;
gap: 5px;
`;
const CommentQuestionSection = styled.div`
display: flex;
gap: 20px;
`;

const CommentQuestionHeader =styled.div`
display: flex;
flex-direction: column;
align-items: center;
gap: 5px;
`;


export default FormComponent;