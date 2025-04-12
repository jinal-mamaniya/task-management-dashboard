import React from "react";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";

const SidebarContainer = styled.aside`
  background-color: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  width: 250px;
  height: calc(100vh - 60px);
  position: fixed;
  top: 60px;
  left: 0;
  padding: ${({ theme }) => theme.spacing.lg};
  transition: transform 0.3s ease, background-color 0.3s ease;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    transform: translateX(${({ isOpen }) => (isOpen ? "0" : "-100%")});
    z-index: 99;
  }
`;

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.lg};
`;

const NavItem = styled.li`
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.background};
  }

  ${({ active, theme }) =>
    active &&
    `
    background-color: ${theme.colors.primary}15;
    color: ${theme.colors.primary};
    font-weight: 500;
  `}
`;

const StyledLink = styled(Link)`
  display: block;
  width: 100%;
  height: 100%;
`;

const Sidebar = ({ isOpen = true }) => {
  const location = useLocation();

  return (
    <SidebarContainer isOpen={isOpen}>
      <NavList>
        <NavItem active={location.pathname === "/"}>
          <StyledLink to="/">Dashboard</StyledLink>
        </NavItem>
        <NavItem active={location.pathname === "/tasks"}>
          <StyledLink to="/tasks">Tasks</StyledLink>
        </NavItem>
        <NavItem active={location.pathname === "/calendar"}>
          <StyledLink to="/calendar">Calendar</StyledLink>
        </NavItem>
        <NavItem active={location.pathname === "/reports"}>
          <StyledLink to="/reports">Reports</StyledLink>
        </NavItem>
        <NavItem active={location.pathname === "/settings"}>
          <StyledLink to="/settings">Settings</StyledLink>
        </NavItem>
      </NavList>
    </SidebarContainer>
  );
};

export default Sidebar;
