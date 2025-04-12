import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import Header from './Header';
import Sidebar from './Sidebar';
import { toggleSidebar, selectSidebarOpen } from '../../store/slices/uiSlice';

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Main = styled.main`
  margin-top: 60px;
  margin-left: ${({ sidebarOpen }) => (sidebarOpen ? '250px' : '0')};
  padding: ${({ theme }) => theme.spacing.lg};
  transition: margin-left 0.3s ease;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-left: 0;
    padding: ${({ theme }) => theme.spacing.md};
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  align-items: center;
  justify-content: center;
  box-shadow: ${({ theme }) => theme.shadows.md};
  z-index: 1000;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: flex;
  }
`;

const MainLayout = ({ children }) => {
  const dispatch = useDispatch();
  const sidebarOpen = useSelector(selectSidebarOpen);
  
  const handleToggleSidebar = () => {
    dispatch(toggleSidebar());
  };
  
  return (
    <LayoutContainer>
      <Header />
      <Sidebar isOpen={sidebarOpen} />
      <Main sidebarOpen={sidebarOpen}>
        {children}
      </Main>
      <MobileMenuButton onClick={handleToggleSidebar}>
        {sidebarOpen ? 'X' : '☰'}
      </MobileMenuButton>
    </LayoutContainer>
  );
};

export default MainLayout;