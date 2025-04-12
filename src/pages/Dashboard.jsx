import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { Card } from '../components/ui';
import { TaskStatusChart, TaskPriorityChart, RecentTasksList } from '../components/dashboard';
import { selectTaskStats } from '../store/slices/tasksSlice';

const PageHeader = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const Title = styled.h1`
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const StatsCard = styled(Card)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.lg};
`;

const StatsTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const StatsValue = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.xxl};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
`;

const ChartsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing.lg};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

const Dashboard = () => {
  const taskStats = useSelector(selectTaskStats);
  
  return (
    <>
      <PageHeader>
        <Title>Dashboard</Title>
        <Subtitle>Welcome to your task management dashboard</Subtitle>
      </PageHeader>
      
      <StatsGrid>
        <StatsCard>
          <StatsTitle>Total Tasks</StatsTitle>
          <StatsValue>{taskStats.total}</StatsValue>
        </StatsCard>
        
        <StatsCard>
          <StatsTitle>In Progress</StatsTitle>
          <StatsValue>{taskStats.inProgress}</StatsValue>
        </StatsCard>
        
        <StatsCard>
          <StatsTitle>Completed</StatsTitle>
          <StatsValue>{taskStats.completed}</StatsValue>
        </StatsCard>
        
        <StatsCard>
          <StatsTitle>Overdue</StatsTitle>
          <StatsValue>{taskStats.overdue}</StatsValue>
        </StatsCard>
      </StatsGrid>
      
      <ChartsGrid>
        <TaskStatusChart />
        <TaskPriorityChart />
        <RecentTasksList />
      </ChartsGrid>
    </>
  );
};

export default Dashboard;