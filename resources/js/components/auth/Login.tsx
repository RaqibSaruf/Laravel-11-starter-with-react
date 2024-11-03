import { Response } from '@/helpers/response.helper';
import { useAuth } from '@/hooks/useAuth';
import { FunctionComponent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login: FunctionComponent = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [input, setInput] = useState({
    email: '',
    password: '',
  });

  const handleSubmitEvent = async (e: any) => {
    e.preventDefault();
    if (input.email !== '' && input.password !== '') {
      //dispatch action from hooks
      const response = await login(input.email, input.password);
      if (Response.isSuccessfull(response?.statusCode)) {
        navigate('/dashboard', { replace: true });
      }
      return;
    }
    alert('please provide a valid input');
  };

  const handleInput = (e: any) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmitEvent}>
      <div className="form_control">
        <label htmlFor="user-email">Email:</label>
        <input
          type="email"
          id="user-email"
          name="email"
          placeholder="example@yahoo.com"
          aria-describedby="user-email"
          aria-invalid="false"
          onChange={handleInput}
        />
        <div id="user-email" className="sr-only">
          Please enter a valid email. It must contain at least 6 characters.
        </div>
      </div>
      <div className="form_control">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          aria-describedby="user-password"
          aria-invalid="false"
          onChange={handleInput}
        />
        <div id="user-password" className="sr-only">
          your password should be more than 6 character
        </div>
      </div>
      <button className="btn-submit">Submit</button>
    </form>
  );
};

export default Login;
