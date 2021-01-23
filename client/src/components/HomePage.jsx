import React, { useState} from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { useHistory} from "react-router-dom";

function HomePage() {
  var [students, setStudents] = useState(null)

   
  const username = localStorage.getItem('username')

  const date = new Date().toLocaleString()
 const history = useHistory() // hooks for redirection

if(!localStorage.getItem('token')){
  history.push('/login'); //redirect to login page
}

  const getData = () => {
    axios
      .get('api/students',{
        Header:{
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then((res) => {
        console.log(res.data)
        setStudents(res.data)
      })
      .catch((err) => console.log(err))
  }


  return (
    <>
    <SubTop>
      <h4 style={{marginBottom: '2px', color: 'blue'}}>You are: <span style={{color: 'black'}}>{username} </span></h4>
      <h4 style={{marginTop: '2px', color: 'blue'}}>Logged in: <span style={{color: 'black'}}>{date} </span> </h4>
    </SubTop>
    
      <Header>Welcome to Your Dashboard</Header>
      
      <SubHeader>Click to Fetch Users from Database</SubHeader>
      <Bwrapper><Button onClick={getData}>Call Backend</Button></Bwrapper>
      {students
        ? students.map((student, index) => {
            return (
              <>
                <List key={index}>
                  <li>{index}</li>
                  <li>{student.name}</li>
                  <li>{student.age}</li>
                  <li>{student.sex}</li>
                </List>
                <hr style={{width : '80%', border: '2px solid black'}}/>
              </>
            )
          })
        : ''}
    </>
  )
}
const SubTop  = styled.div `
width: '80%';
position: absolute;
top: 40px;
right: 150px;

`
const Header = styled.h1`
  text-align: center;
  color: blue;
  margin-top: 90px;
`
const SubHeader = styled.h3`
  text-align: center;
`
const Bwrapper = styled.div`
    width: '100%';
    display: flex;
  justify-content: center;
  align-items: center;
  `

const Button = styled.button`
  background: #000000;
  color: #ffffff;
  border: none;
  border-radius: 15px;
  outline: none;
  padding: 15px;
  font-size: 18px;
  margin:10px 0;

  &:hover {
    transform: scale(1.2, 1.2);
  }
`
const List = styled.ul`
  display: flex;
  justify-content: space-around;

  li {
    list-style: none;
    font-size: 19px;
  }
`

export default HomePage
