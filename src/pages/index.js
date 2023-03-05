import FormComponent from '@/components/Form'
import { Inter } from 'next/font/google'
import styled from 'styled-components'
import React, { useState } from 'react';
import { defaultEmail } from '@/utils/defaultEmail';
import Form from '../components/Form'
import { v4 as uuidv4 } from 'uuid'
import { getFromAI } from '../utils/openai'
import LoadingIcons from 'react-loading-icons'
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image'

const inter = Inter({ subsets: ['latin'] })


export default function Home() {
  const data = [{id: 0, label: "Co-worker"}, {id: 1, label: "Close friend"}, {id: 2, label: "Acquaintance"}, {id: 3, label: "Supierior"}, {id: 4, label: "Professor"}, {id: 5, label: "Relative"}, {id: 6, label: "Significant Other"}];
  const toneData = [{id: 0, label: "Professional"}, {id: 1, label: "Friendly"}, {id: 2, label: "Casual"}, {id: 3, label: "Sympathetic"}, {id: 4, label: "Assertive"}, {id: 5, label: "Formal"}, {id: 6, label: "Curious"}, {id: 7, label: "Cooperative"}];

  const [emailDetails, setEmailDetails] = useState(defaultEmail);
  const [finishedEmail, setFinishedEmail] = useState('');
  const [items, setItem] = useState(data);
  const [selectedItem, setSelectedItem] = useState(null);
  const [toneItems, setToneItems] = useState(toneData);
  const [selectedToneItem, setSelectedToneItem] = useState(null);
  const [loadingResponse, setLoadingResponse] = useState(false);
  const [copied, setCopied] = useState(false);
  
  

  //SENDER/RECIEVER
  const handleChangeRecipient = (e)=>{
    const { name, value } = e.target;
    setEmailDetails((prevState) => ({
      ...prevState,
      recepient: value,
    }));
  }
  const handleChangeSender = (e)=>{
    const { name, value } = e.target;
    setEmailDetails((prevState) => ({
      ...prevState,
      sender: value,
    }));
  }

  //QUESTION
  const handleAddQuestion = ()=>{
    setEmailDetails((prevState) => ({
      ...prevState,
      questions: [
        ...prevState.questions,
        {
          id: uuidv4(),
          value: ''
        },
      ]
    }));
  }
  const handleDeleteQuestion = (id) => {
    const updatedQuestions = emailDetails.questions.filter((question)=> question.id != id);
    setEmailDetails((prevState) => ({
      ...prevState,
      questions: updatedQuestions,
    }));
  }
  const handleChangeQuestion = (e, id) => {
    console.log("question changed");
    const updatedQuestions = emailDetails.questions.map((question) => {
      if (question.id === id) {
        return { ...question, value: e.target.value };
      }
      return question;
    });

    setEmailDetails((prevState) => ({
      ...prevState,
      questions: updatedQuestions,
    }));
  }


  //INFORM
  const handleAddInform = ()=>{
    setEmailDetails((prevState) => ({
      ...prevState,
      informs: [
        ...prevState.informs,
        {
          id: uuidv4(),
          value: ''
        },
      ]
    }))
  }
  const handleDeleteInform = (id) => {
    const updatedInforms = emailDetails.informs.filter((inform)=> inform.id != id);
    setEmailDetails((prevState) => ({
      ...prevState,
      informs: updatedInforms,
    }));
  }
  const handleChangeInform = (e, id) => {
    const updatedInforms = emailDetails.informs.map((inform) => {
      if (inform.id === id) {
        return { ...inform, value: e.target.value };
      }
      return inform;
    });

    setEmailDetails((prevState) => ({
      ...prevState,
      informs: updatedInforms,
    }));
  }

  //DROPDOWN
  const handleItemClick = (id) => {
    selectedItem == id ? setSelectedItem(null) : setSelectedItem(id);
  }
  const handleToneItemClick = (id) => {
    selectedToneItem == id ? setSelectedToneItem(null) : setSelectedToneItem(id);
  }

  //GENERATE
  const handleGenerate = async (emailDetails) => {
    setFinishedEmail('');
    setLoadingResponse(true);
    setCopied(false);
    let prompt = '';
    prompt = prompt.concat('write an email to ', emailDetails.recepient, '. ');
    if(selectedItem!=null){
      prompt = prompt.concat('The email is written to a ', data.find(x => x.id == selectedItem).label)
    }
    if(emailDetails.questions.length != 0){
      prompt = prompt.concat('In the email ask the following questions: ');
      for(const question of emailDetails.questions){
        prompt = question.value != '' ? prompt.concat(question.value, "? ") : prompt;
      }
    }
    if(emailDetails.informs.length != 0){
      prompt = prompt.concat('In the email inform the recipient of the following: ');
      for(const inform of emailDetails.informs){
        prompt = inform.value != '' ?prompt.concat(inform.value, ". ") : prompt;
      }
    }
    if(selectedToneItem!=null){
      prompt = prompt.concat('Please write the email using a ', toneData.find(x => x.id == selectedToneItem).label, ' tone.')
    }
    prompt = prompt.concat('Sign the email from ', emailDetails.sender);
    getFromAI(prompt).then((responce)=>{
      setLoadingResponse(false);
      setFinishedEmail(responce);
    });
  }



  return (
    <>
    <Header>GPT-3Mail</Header>
      <Main>
        <InputContainer>
          <Form 
            emailDetails = {emailDetails}
            changeRecipient = {handleChangeRecipient}
            changeSender = {handleChangeSender}
            addQuestion = {handleAddQuestion}
            deleteQuestion = {handleDeleteQuestion}
            changeQuestion = {handleChangeQuestion}
            addInform = {handleAddInform}
            deleteInform = {handleDeleteInform}
            changeInform = {handleChangeInform}
            handleItemClick = {handleItemClick}
            items={items}
            selectedItem={selectedItem}
            toneItems = {toneItems}
            selectedToneItem = {selectedToneItem}
            handleToneItemClick = {handleToneItemClick}
          ></Form>
          <SubmitButton onClick={()=>handleGenerate(emailDetails)}>Write Email</SubmitButton>
        </InputContainer>

        <ResultContainer>
          <EmailHeader>
            Result 
            {finishedEmail!='' && <CopyToClipboard text={finishedEmail} onCopy={() => setCopied(true)}>
              <CopySpan copied={copied}><FontAwesomeIcon className='copyIcon' icon={faCopy} color="black"/>{copied ? 'copied' : 'copy'}</CopySpan>
            </CopyToClipboard>}
          </EmailHeader>
          <EmailContainer>
          <Instructions>
            {finishedEmail=='' && !loadingResponse && <Instructions>{'Fill out the above form with:\n• Who the email is to and their relationship to the sender\n• Who the email is from\n• Any comments or question to be addressed in the body of the email\n• A tone you would like the email to be written in'}</Instructions>}
            {loadingResponse && <Spinner><LoadingIcons.BallTriangle stroke="black" /></Spinner>}
            {finishedEmail}
            </Instructions>
          </EmailContainer>
        </ResultContainer>
      </Main>
      <Footer>
        <CreditTag>Created by <GitLink href={'https://github.com/Deanstirrat'}><Image
      src="/github-mark.png"
      alt="Github logo"
      width={15}
      height={15}
    /><Name>Dean Stirrat</Name></GitLink></CreditTag>
      </Footer>
    </>
  )
}


const Header = styled.div`
display: flex;
flex-direction: column;
background-color: #eaefbd;
height: 130px;
width: 100%;
align-items: center;
justify-content: end;
gap: 10px;
font-size: 4rem;
`;

const Spinner = styled.div`
justify-self: center;`;

const Main = styled.main`
background-color: #90be6d;
min-height: 100vh;
display: flex;
flex-direction: column;
align-items: center;
margin: 0;
gap: 50px;
padding-left: 20%;
padding-right: 20%;
padding-top: 50px;
padding-bottom: 50px;
@media (max-width:786px) {
  padding: 10px;
}
`;

const InputContainer = styled.div`
background-color: #c9e3ac;
display: flex;
flex-direction: column;
align-items: center;
gap: 20px;
padding-top: 20px;
padding-bottom: 20px;
width: 100%;
`;

const SubmitButton = styled.button`
border-style: none;
background-color: #367542;
border-radius: 5px;
color: white;
padding: 10px;
font-size: 1.5rem;
&:hover{
  filter: brightness(80%);
  cursor: pointer;
}
`;

const ResultContainer = styled.div`
width: 100%;
`;

const EmailHeader = styled.div`
display: flex;
justify-content: space-between;
font-size: 2rem;
`;

const CopySpan = styled.span`
color: ${props => props.copied ? 'green' : "black"};
&:hover{
  cursor: pointer;
}
`;

const EmailContainer = styled.div`
width: 100%;
display: flex;
flex-direction: column;
background-color: #eaefbd;
min-height: 200px;
white-space: pre-wrap; /* or pre-line */
align-items: center;
justify-content: top;
  `;

const Instructions = styled.div`
padding: 25px;
`;

const Footer = styled.div`
background-color: #90be6d;
display: flex;
justify-content: center;
padding: 10px;
color: #37371f;
`;

const CreditTag = styled.div`
z-index: 5;
border-radius: 25px;
padding: 10px;
background-color: rgba(143, 142, 142, 0.36);
`;

const GitLink = styled.a`
color: #37371f;
text-decoration: none;
`;

const Name = styled.span`
&:hover{
color:#ea9010;
}
`;
