import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import venmoLogo from '../assets/venmo_v.png';

const Nav = styled.nav`
  background-color: ${props => props.theme.colors.background};
  padding: ${props => props.theme.spacing.md};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${props => props.theme.colors.primary};
  text-decoration: none;
`;

const NavLinks = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.lg};
  align-items: center;
`;

const NavLink = styled(Link)`
  color: ${props => props.theme.colors.text};
  text-decoration: none;
  font-weight: 500;
  
  &:hover {
    color: ${props => props.theme.colors.accent};
  }
`;

const SocialIcon = styled.img`
  width: 20px;
  height: 20px;
  filter: brightness(0);
  transition: filter 0.2s ease;
`;

const SocialSvg = styled.svg`
  width: 20px;
  height: 20px;
  fill: currentColor;
  transition: fill 0.2s ease;
`;

const SocialLink = styled.a`
  color: ${props => props.theme.colors.text};
  text-decoration: none;
  display: flex;
  align-items: center;
  transition: color 0.2s ease;
  
  &:hover {
    color: ${props => props.theme.colors.accent};
  }
`;

const Navbar = () => {
  return (
    <Nav>
      <NavContainer>
        <Logo to="/">Dylan Lynch Ceramics</Logo>
        <NavLinks>
          <NavLink to="/">Shop</NavLink>
          <NavLink to="/gallery">Gallery</NavLink>
          <SocialLink 
            href="https://www.instagram.com/d.q.lynch/" 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <SocialSvg viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </SocialSvg>
          </SocialLink>
          <SocialLink 
            href="https://venmo.com/Dylan-Lynch-2" 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="Venmo"
          >
            <SocialIcon src={venmoLogo} alt="Venmo" />
          </SocialLink>
        </NavLinks>
      </NavContainer>
    </Nav>
  );
};

export default Navbar; 