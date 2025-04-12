import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { Card, Button } from '../components/ui';
import { selectAllTasks } from '../store/slices/tasksSlice';

const ReportsContainer = styled.div`
  margin-top: ${({ theme }) => theme.spacing.lg};
`;

const ReportControls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
    align-items: flex-start;
    gap: ${({ theme }) => theme.spacing.md};
  }
`;

const DateRangeSelector = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 100%;
    overflow-x: auto;
    padding-bottom: ${({ theme }) => theme.spacing.sm};
  }
`;

const ReportCard = styled(Card)`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => theme.spacing.lg};
`;

const ReportTitle = styled.h3`
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const ReportTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  text-align: left;
  padding: ${({ theme }) => theme.spacing.md};
  border-bottom: 1px solid ${({ theme }) => theme.colors.text.disabled};
`;

const Td = styled.td`
  padding: ${({ theme }) => theme.spacing.md};
  border-bottom: 1px solid ${({ theme }) => theme.colors.text.disabled}40;
`;

const ProgressBarContainer = styled.div`
  width: 100%;
  height: 10px;
  background-color: ${({ theme }) => theme.colors.text.disabled}30;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  overflow: hidden;
`;

const ProgressBar = styled.div`
  height: 100%;
  width: ${(props) => props.progress}%;
  background-color: ${({ theme, status }) => {
    switch (status) {
      case 'completed':
        return theme.colors.success;
      case 'in-progress':
        return theme.colors.primary;
      default:
        return theme.colors.warning;
    }
  }};
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const StatCard = styled(Card)`
  padding: ${({ theme }) => theme.spacing.lg};
`;

const StatValue = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: 700;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const StatLabel = styled.div`
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const ReportsPage = () => {
  const tasks = useSelector(selectAllTasks);
  const [dateRange, setDateRange] = useState('week');
  
  // Function to filter tasks by date range
  const getTasksByDateRange = (range) => {
    const today = new Date();
    const startDate = new Date();
    
    switch (range) {
      case 'week':
        startDate.setDate(today.getDate() - 7);
        break;
      case 'month':
        startDate.setMonth(today.getMonth() - 1);
        break;
      case 'quarter':
        startDate.setMonth(today.getMonth() - 3);
        break;
      default:
        startDate.setDate(today.getDate() - 7);
    }
    
    return tasks.filter(task => {
      const taskDate = new Date(task.dueDate);
      return taskDate >= startDate && taskDate <= today;
    });
  };
  
  const filteredTasks = getTasksByDateRange(dateRange);
  
  // Calculate statistics
  const calculateStats = () => {
    const total = filteredTasks.length;
    const completed = filteredTasks.filter(task => task.status === 'completed').length;
    const inProgress = filteredTasks.filter(task => task.status === 'in-progress').length;
    const todo = filteredTasks.filter(task => task.status === 'to-do').length;
    const completionRate = total > 0 ? (completed / total) * 100 : 0;
    
    // Group by category
    const categories = {};
    filteredTasks.forEach(task => {
      if (!categories[task.category]) {
        categories[task.category] = 0;
      }
      categories[task.category]++;
    });
    
    // Find most common category
    let mostCommonCategory = 'None';
    let maxCount = 0;
    
    for (const category in categories) {
      if (categories[category] > maxCount) {
        maxCount = categories[category];
        mostCommonCategory = category;
      }
    }
    
    return {
      total,
      completed,
      inProgress,
      todo,
      completionRate,
      mostCommonCategory
    };
  };
  
  const stats = calculateStats();
  
  // Group tasks by category for category performance
  const getCategoryPerformance = () => {
    const categories = {};
    
    filteredTasks.forEach(task => {
      const category = task.category || 'Uncategorized';
      
      if (!categories[category]) {
        categories[category] = {
          total: 0,
          completed: 0,
          inProgress: 0,
          todo: 0
        };
      }
      
      categories[category].total++;
      
      switch (task.status) {
        case 'completed':
          categories[category].completed++;
          break;
        case 'in-progress':
          categories[category].inProgress++;
          break;
        default:
          categories[category].todo++;
      }
    });
    
    // Convert to array for rendering
    return Object.entries(categories).map(([name, data]) => ({
      name,
      ...data,
      completionRate: data.total > 0 ? (data.completed / data.total) * 100 : 0
    }));
  };
  
  const categoryPerformance = getCategoryPerformance();
  
  return (
    <div>
      <h1>Reports</h1>
      <p>View task performance and statistics</p>
      
      <ReportsContainer>
        <ReportControls>
          <ReportTitle>Task Performance</ReportTitle>
          <DateRangeSelector>
            <Button 
              variant={dateRange === 'week' ? 'primary' : 'outlined'} 
              size="small"
              onClick={() => setDateRange('week')}
            >
              Last Week
            </Button>
            <Button 
              variant={dateRange === 'month' ? 'primary' : 'outlined'} 
              size="small"
              onClick={() => setDateRange('month')}
            >
              Last Month
            </Button>
            <Button 
              variant={dateRange === 'quarter' ? 'primary' : 'outlined'} 
              size="small"
              onClick={() => setDateRange('quarter')}
            >
              Last Quarter
            </Button>
          </DateRangeSelector>
        </ReportControls>
        
        <StatsGrid>
          <StatCard>
            <StatValue>{stats.total}</StatValue>
            <StatLabel>Total Tasks</StatLabel>
          </StatCard>
          <StatCard>
            <StatValue>{stats.completionRate.toFixed(1)}%</StatValue>
            <StatLabel>Completion Rate</StatLabel>
          </StatCard>
          <StatCard>
            <StatValue>{stats.mostCommonCategory}</StatValue>
            <StatLabel>Top Category</StatLabel>
          </StatCard>
        </StatsGrid>
        
        <ReportCard>
          <ReportTitle>Category Performance</ReportTitle>
          <ReportTable>
            <thead>
              <tr>
                <Th>Category</Th>
                <Th>Tasks</Th>
                <Th>Completion</Th>
                <Th>Progress</Th>
              </tr>
            </thead>
            <tbody>
              {categoryPerformance.map((category, index) => (
                <tr key={index}>
                  <Td>{category.name}</Td>
                  <Td>{category.total}</Td>
                  <Td>{category.completionRate.toFixed(1)}%</Td>
                  <Td>
                    <ProgressBarContainer>
                      <ProgressBar 
                        progress={category.completionRate} 
                        status={
                          category.completionRate > 70 
                            ? 'completed' 
                            : category.completionRate > 30 
                              ? 'in-progress' 
                              : 'to-do'
                        }
                      />
                    </ProgressBarContainer>
                  </Td>
                </tr>
              ))}
            </tbody>
          </ReportTable>
        </ReportCard>
        
        <ReportCard>
          <ReportTitle>Task Status Breakdown</ReportTitle>
          <ReportTable>
            <thead>
              <tr>
                <Th>Status</Th>
                <Th>Count</Th>
                <Th>Percentage</Th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <Td>Completed</Td>
                <Td>{stats.completed}</Td>
                <Td>{stats.total > 0 ? ((stats.completed / stats.total) * 100).toFixed(1) : 0}%</Td>
              </tr>
              <tr>
                <Td>In Progress</Td>
                <Td>{stats.inProgress}</Td>
                <Td>{stats.total > 0 ? ((stats.inProgress / stats.total) * 100).toFixed(1) : 0}%</Td>
              </tr>
              <tr>
                <Td>To Do</Td>
                <Td>{stats.todo}</Td>
                <Td>{stats.total > 0 ? ((stats.todo / stats.total) * 100).toFixed(1) : 0}%</Td>
              </tr>
            </tbody>
          </ReportTable>
        </ReportCard>
      </ReportsContainer>
    </div>
  );
};

export default ReportsPage;