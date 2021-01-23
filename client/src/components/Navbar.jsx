import React from 'react'
import styled from 'styled-components'
import {Link,  useHistory } from "react-router-dom";


function Navbar() {

     const history = useHistory() // hooks for redirection

 const Logout = ()=>{
    localStorage.removeItem('token')
  history.push('/login'); //redirect to login page
  }


    return (
        <Wrapper>
            <Nav>
                <NavLogo>React-FullStack</NavLogo>
                <Menu>       
     <Link to="/" className="navbar-nav">Register</Link>
      <Link to="/login" className="navbar-nav">Login</Link>
      <Link to="/home" className="navbar-nav">Dashboard</Link>
      <button type='button' onClick={Logout}>Logout</button>
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