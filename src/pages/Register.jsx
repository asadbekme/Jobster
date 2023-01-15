import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';
import { Logo, FormRow } from "../components";
import Wrapper from "../assets/wrappers/RegisterPage";
import { loginUser, registerUser } from "../features/user/userSlice";

const initialValue = {
  name: '',
  email: '',
  password: '',
  isMember: false
}

const Register = () => {
  const [values, setValues] = useState(initialValue);
  const { isLoading, user } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    // console.log(`${name}: ${value}`); 
    setValues({ ...values, [name]: value });
  }

  const onSubmit = (e) => {
    e.preventDefault();

    const { name, email, password, isMember } = values;
    if (!email || !password || (!isMember && !name)) {
      toast.error('Please Fill Out All Fields');
      return;
    }
    if (isMember) {
      dispatch(loginUser({ email: email, password: password }));
      return;
    }
    dispatch(registerUser({ name, email, password }));
  }

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  }

  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={onSubmit}>
        <Logo />
        <h3>{values.isMember ? 'Login' : 'Register'}</h3>

        {/* name field */}
        {!values.isMember && (
          <FormRow 
            type="text" 
            name="name"
            value={values.name}
            handleChange={handleChange}
            labelText=""
          />
        )}

        {/* email field */}
        <FormRow 
          type="email" 
          name="email"
          value={values.email}
          handleChange={handleChange}
          labelText=""
        />

        {/* password field */}
        <FormRow 
          type="password" 
          name="password"
          value={values.password}
          handleChange={handleChange}
          labelText=""
        />

        <button type="submit" className="btn btn-block">submit</button>
        <p>
          {values.isMember ? 'Not a member yet?' : 'Already a member?'}
          <button 
            type="button" 
            onClick={toggleMember} 
            className="member-btn"
          >
            {values.isMember ? 'Register' : 'Login'}
          </button>
        </p>
      </form>
    </Wrapper>
  );
}

export default Register;