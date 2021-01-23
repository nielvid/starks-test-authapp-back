import React from 'react'
import styled from 'styled-components'
import {Link,  useHistory } from "react-router-dom";


function Navbar() {

     const history = useHistory() // hooks for redirection

 const Logout = ()=>{
    localStorage.removeItem('token')
    localStorage.removeItem('username')
  history.push('/login'); //redirect to login page
  }


    return (
        <Wrapper>
            <Nav>
                <NavLogo>MERN- FullStack APP</NavLogo>
                <Menu>       
     <Link to="/" className="navbar-nav">Register</Link>
      <Link to="/login" className="navbar-nav">Login</Link>
      <Link to="/home" className="navbar-nav">Dashboard</Link>
      <Close type='button' onClick={Logout}>Logout</Close>
    </Menu>
            </Nav>
            </Wrapper>
        
    )
}

export default Navbar

const Nav = styled.nav `
color: #ffffff;
display: flex;
justify-content: space-between; 
font-size:18px;


`

const NavLogo = styled.div `
`
const Menu = styled.div `
display: flex;
margin: 0 10px;
font-size:18px;
`
const Wrapper = styled.div `
padding: 15px 10%;
background:  #252b72;
width: 100%;
`

const Close = styled.button `
padding: 2px 10px;
background:  #ffffff;
color: #000000;
border-radius: 7px;
`