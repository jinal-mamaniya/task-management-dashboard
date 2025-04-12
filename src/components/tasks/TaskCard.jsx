import React from 'react';
import styled from 'styled-components';
import { Card } from '../ui';

const StyledTaskCard = styled(Card)`
  margin-bottom: ${({ theme }) => theme.spacing.md};
  border-left: 4px solid ${({ priority, theme }) => {
    switch (priority) {
      case 'high':
        return theme.colors.error;
      case 'medium':
        return theme.colors.warning;
      default:
        return theme.colors.success;
    }
  }};
  transition: transform 0.2s ease;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }
`;

const TaskHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const TaskTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  margin: 0;
`;

const TaskStatus = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  background-color: ${({ status, theme }) => {
    switch (status) {
      case 'completed':
        return `${theme.colors.success}25`;
      case 'in-progress':
        return `${theme.colors.primary}25`;
      default:
        return `${theme.colors.text.secondary}15`;
    }
  }};
  color: ${({ status, theme }) => {
    switch (status) {
      case 'completed':
        return theme.colors.success;
      case 'in-progress':
        return theme.colors.primary;
      default:
        return theme.colors.text.secondary;
    }
  }};
`;

const TaskDescription = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const TaskFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

const TaskCard = ({ task, onEdit }) => {
  const { title, description, status, priority, dueDate, category } = task;
  
  return (
    <StyledTaskCard priority={priority} onClick={() => onEdit(task)}>
      <TaskHeader>
        <TaskTitle>{title}</TaskTitle>
        <TaskStatus status={status}>
          {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
        </TaskStatus>
      </TaskHeader>
      
      <TaskDescription>{description}</TaskDescription>
      
      <TaskFooter>
        <div>Due: {dueDate}</div>
        <div>{category}</div>
      </TaskFooter>
    </StyledTaskCard>
  );
};

export default TaskCard;