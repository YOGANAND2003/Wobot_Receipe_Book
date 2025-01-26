import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';

const Nav = styled.nav`
  background-color: #333;
  padding: 1rem;
  color: white;
`;

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1rem;
  
  a {
    color: white;
    text-decoration: none;
    &:hover {
      color: #ddd;
    }
  }
`;

const Navbar = ({ user }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <Nav>
      <NavContainer>
        <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
          <h1>Recipe Book</h1>
        </Link>
        <NavLinks>
          <Link to="/">Home</Link>
          {user ? (
            <>
              <Link to="/favorites">Favorites</Link>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </NavLinks>
      </NavContainer>
    </Nav>
  );
};

export default Navbar;