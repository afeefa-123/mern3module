// // components/Login.js

// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';

// function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post('http://localhost:8080/login', { email, password });

//       // Assuming your server returns a token and role in the response
//       const { token, role } = response.data;

//       // Save the token in local storage or a cookie for authentication
//       localStorage.setItem('token', token);

//       if (role === 'user') {
//         // Redirect to the user page (you should have a route set up for this)
//         window.location.href = '/user';
//       } else if (role === 'admin') {
//         // Redirect to the admin page
//         window.location.href = '/admin';
//       } else if (role === 'seller') {
//         // Redirect to the seller page
//         window.location.href = '/seller';
//       }
//     } catch (error) {
//       console.error('Login failed', error);
//     }
//   }

//   return (
//     <div>
//       <h2>Login</h2>
//       <form onSubmit={handleSubmit}>
//         <label>
//           Email:
//           <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
//         </label>
//         <br />
//         <label>
//           Password:
//           <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
//         </label>
//         <br />
//         <button type="submit">Login</button>
//         {/* Add a link to the login page */}
//        <p>Already have an account? <Link to="register">Register</Link></p>
//       </form>
//     </div>
//   );
// }

// export default Login;


// components/LoginForm.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/login', { email, password });
      const { token, role } = response.data;

      localStorage.setItem('token', token);

      if (role === 'user') {
        window.location.href = '/user-dashboard';
      } else if (role === 'admin') {
        window.location.href = '/admin-dashboard';
      } else if (role === 'seller') {
        window.location.href = '/seller-dashboard';
      }
    } catch (error) {
      console.error('Login failed', error);
    }
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <button type="submit">Login</button>
        <p>Already have an account? <Link to="register">Register</Link></p>
      </form>
    </div>
  );
}

export default LoginForm;
