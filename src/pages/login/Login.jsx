import React, { useState, useContext } from 'react'
import AuthContext from '../../context/AuthContext';
import {BsRocketTakeoff} from 'react-icons/bs'
import "./LoginPage.css"

const Login = () => {
  const [formData, setFormData] = useState({ name: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { loginUser } = useContext(AuthContext);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLoginFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.password) {
      setError('Please fill in both fields.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      await loginUser(e);
      setIsLoading(false);
    } catch (err) {
      setError('Login failed. Please check your credentials.');
    } 
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLoginFormSubmit}>
     <BsRocketTakeoff /> <h2>Gamezone Inc.</h2>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className={error && !formData.name ? 'error' : ''}
        />
        {error ? "user does not exist or wrong password" : ""}
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          className={error && !formData.password ? 'error' : ''}
        />
        {error && <p className="error-message">{error}</p>}
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
        </button>

        {error ? "user does not exist or wrong password" : ""}
      </form>
    </div>
  );
};

export default Login;
