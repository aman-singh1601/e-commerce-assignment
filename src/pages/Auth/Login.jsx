import React, { useState } from 'react'
import {Row, Col, Button, Input} from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { userlogin } from '../../fakebackend/auth';

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      "username": email,
      "password": password,
      "expiresInMins": 60
    }
    const user = userlogin(data, navigate);
  }
  const enterAssGuest = (e) => {
    e.preventDefault();
    const data = {
      "username": "kminchelle",
      "password": "0lelplR",
      "expiresInMins": 60
    }
    const user = userlogin(data, navigate);

  }

  return (
    <React.Fragment>
    <Row className='signup-body '>
      <Col className='signup-form' sm="12">
        <div className='heading'>Welcome Back!</div>
        <div className='sub-heading'>LogIn To Your Account</div>
          {/* <label  className='text'>Email</label><br/>   */}
          <Input name='email' type='email' onChange={(e) => setEmail(e.target.value)} className='form-input mt-3' placeholder='chandler@bing.com'/>
          <br />
          {/* <label  className='text'>Password</label><br/>   */}
          <Input name='password' type='text' onChange={(e) => setPassword(e.target.value)} className='form-input' placeholder='password'/>
        <Button className='btn' onClick={(e) => handleSubmit(e)}>Login</Button><br/>
        <Button className='guest-btn' onClick={(e) => enterAssGuest(e)} >Enter as Guest</Button><br/>
        <span className='text'>Don't Have An Account? SignUp!</span>
      </Col>
    </Row>
</React.Fragment>
  )
}

export default Login