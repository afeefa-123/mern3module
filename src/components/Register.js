// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';

// function RegistrationForm() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [role, setRole] = useState('user'); // Default role is 'user'

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       if (!email || !password || !role) {
//         alert('Please fill in all fields.');
//         return;
//       }

//       const response = await axios.post('http://localhost:8080/registerdata', {
//         email,
//         password,
//         role,
//       });

//       alert(response.data);
//     } catch (error) {
//       console.error('Error registering user', error);
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <label>Email:
//           <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
//         </label>
//         <br />
//         <label>Password:
//           <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
//         </label>
//         <br />
//         <label>Role:
//           <select value={role} onChange={(e) => setRole(e.target.value)}>
//             <option value="user">User</option>
//             <option value="seller">Seller</option>
//           </select>
//         </label>
//         <br />
//         <button type="submit">Register</button>
//       </form>
//       {/* Add a link to the login page */}
//       <p>Already have an account? <Link to="/">Login</Link></p>
//     </div>
//   );
// }

// export default RegistrationForm;
// components/RegistrationForm.js
import React, { useState } from 'react';
import axios from 'axios';

function RegistrationForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/register', { email, password, role });
      alert(response.data);
    } catch (error) {
      console.error('Registration failed', error);
    }
  }

  return (
    <div>
      <h2>Registration</h2>
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
        <label>
          Role:
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="user">User</option>
            <option value="seller">Seller</option>
            
          </select>
        </label>
        <br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default RegistrationForm;
