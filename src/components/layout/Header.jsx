import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, ThemeToggle } from '../ui';
import { logout, selectUser, selectIsAuthenticated } from '../../store/slices/authSlice';

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.lg}`};
  background-color: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  height: 60px;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.md}`};
  }
`;

const Logo = styled(Link)`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: ${({ theme }) => theme.fontSizes.lg};
  }
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    gap: ${({ theme }) => theme.spacing.sm};
  }
`;

const HelpButton = styled(Button)`
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    display: none;
  }
`;

const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.primary};
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: center;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 500;
`;

const ProfileMenu = styled.div`
  position: absolute;
  top: 60px;
  right: ${({ theme }) => theme.spacing.lg};
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  width: 200px;
  z-index: 100;
  overflow: hidden;
`;

const ProfileMenuItem = styled(Link)`
  display: block;
  padding: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.text.primary};
  text-decoration: none;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.background};
  }
`;

const ProfileMenuButton = styled.button`
  display: block;
  width: 100%;
  text-align: left;
  padding: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.text.primary};
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.background};
  }
`;

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileMenuRef = useRef(null);
  
  const handleLogout = () => {
    dispatch(logout());
    navigate('/signin');
  };
  
  // Close profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [profileMenuRef]);
  
  const getInitials = (name) => {
    if (!name) return '?';
    return name.split(' ').map(part => part[0]).join('').toUpperCase();
  };
  
  return (
    <HeaderContainer>
      <Logo to="/">TaskMaster</Logo>
      <HeaderActions>
        <ThemeToggle />
        <HelpButton variant="text">Help</HelpButton>
        
        {isAuthenticated ? (
          <div style={{ position: 'relative' }} ref={profileMenuRef}>
            <Avatar 
              src={user?.avatar} 
              onClick={() => setShowProfileMenu(!showProfileMenu)}
            >
              {!user?.avatar && getInitials(user?.name)}
            </Avatar>
            
            {showProfileMenu && (
              <ProfileMenu>
                <ProfileMenuItem to="/settings">Settings</ProfileMenuItem>
                <ProfileMenuItem to="/profile">Profile</ProfileMenuItem>
                <ProfileMenuButton onClick={handleLogout}>
                  Sign Out
                </ProfileMenuButton>
              </ProfileMenu>
            )}
          </div>
        ) : (
          <Button variant="outlined" size="small" onClick={() => navigate('/signin')}>
            Sign In
          </Button>
        )}
      </HeaderActions>
    </HeaderContainer>
  );
};

export default Header;