import React, {useContext , useState} from 'react'
import '../App.css';
import styled from 'styled-components'
import {Link,  useHistory } from 'react-router-dom'; 
import {MyContext}from '../App'
import axios from 'axios'


function Register() {
   const history = useHistory() // hooks for redirection

    const user = useContext(MyContext)

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [tel, setTel] = useState("")
    const [error, setError] = useState(null)

const RegisterUser = async (e)=>{
    e.preventDefault()
    const user = {
        
        username: username,
        email: email,
       password:password,
        tel: tel
    }
    try{
         
         await axios.post('api/newuser', user);
        
    
          history.push('/login'); //redirect to login page

    }catch(err){
         console.log(err)
          setError(err.response.data.error );
}
}
    return (
        <>
        <p>{user.name}</p>
              <Container>
        <LogoWrapper>
            <LogoBox className="logo">
                <Logo c='#252b72'/>
            </LogoBox>
        </LogoWrapper>
    <h2 style={{ textAlign: 'center'}}>Create Account</h2>
    <Form>
        <Box>
                <InputWrap>
            <i className="fa fa-user"></i>
    <input type="text" className="fullname" name="fullname" value={username} onChange={(e)=>{setUsername(e.target.value)}} /> 
</InputWrap>
<InputWrap>
    <i className="fa fa-envelope"></i>
    <input type="email" className="email" name="email"  value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
    </InputWrap>

    <InputWrap>
    
        <i className="fa fa-lock"></i>
    <input type="password" className="password" name="password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
        </InputWrap>  

      <InputWrap>
            <i className="fa fa-phone"></i>
    <input type="text" className="phone" name="phone" value={tel} onChange={(e)=>{setTel(e.target.value)}}/>
</InputWrap> 
        </Box>
    
</Form>
{error ? <p style={{textAlign:'center', fontSize:'22px'}}>{error}</p> : null}
<Btn type="submit" onClick={RegisterUser}>Sign up</Btn>
<Paragraph>Already have account? <Link to="/login" className="link" style={{textDecoration: 'none',
    color: '#ffffff'}} >Login Instead</Link> </Paragraph>

</Container>
        </>
    )
}

export default Register


const Container = styled.div `
max-width: 400px;
margin: 30px auto;
background-color: #252b72;
border-radius: 30px;
color: white;
padding-bottom: 10px;
`
const LogoWrapper = styled.div `
    height: 150px;
    justify-content: center;
    align-items: center;
    position: relative;
    `
    const LogoBox = styled.div `
    width: 100px;
    height: 100px;
    background-color: white;
    border-radius: 20px 0 20px 20px;
    position: absolute;
    left: 150px;
    top: 30px;
    `

    const Logo = styled.div `
      width: 50px;
    height: 50px;
    background-color: ${(props)=>props.c};
    border-radius: 50% 50% 50% 0;
    margin-top: 20px;
    margin-left: 25px;
    `

    const Form = styled.form `
      max-width: 400px;
    padding: 15px;
    
   
    border-top-left-radius: 50px;
    border-bottom-right-radius: 50px;
   /* border-radius: 50px;*/
    background: #f5f4f4;
    /*box-shadow:  15px 15px 60px #ffffff,
             -15px -15px 60px #ffffff;*/`

const Box = styled.div `
width: 100%;
    padding:5px;
    background-color:#f5f4f4;
   border: 1px solid #f5f4f4;
   border-radius: 20px;
   `

   const InputWrap = styled.div `
   background: #ffffff;
  border-radius: 20px;
  padding-left: 5px;
  margin: 20px 0px;`

  const Btn = styled.button `
    width: 150px;
    height: 50px;
  margin: 20px 30%;
  border-radius: 10px;
  font-size: larger;
  outline: none;
  border: none;



&:hover{
    transform: scale(1.2,1.1);
}

a{
    color: #000000;
    text-decoration: none;
}
`
const Paragraph = styled.p `
text-align: center;
    font-size: 18px;

    `
 
