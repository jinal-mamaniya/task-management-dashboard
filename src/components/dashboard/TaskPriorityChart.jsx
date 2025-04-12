import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { Card } from '../ui';
import { selectAllTasks } from '../../store/slices/tasksSlice';

const ChartContainer = styled(Card)`
  padding: ${({ theme }) => theme.spacing.lg};
  min-height: 300px;
`;

const ChartTitle = styled.h3`
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const BarChartContainer = styled.div`
  display: flex;
  height: 220px;
  align-items: flex-end;
  justify-content: space-evenly;
  margin-top: ${({ theme }) => theme.spacing.lg};
  padding-bottom: ${({ theme }) => theme.spacing.md};
  border-bottom: 1px solid ${({ theme }) => theme.colors.text.disabled};
`;

const BarGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60px;
`;

const Bar = styled.div`
  width: 40px;
  height: ${props => props.height}px;
  background-color: ${props => props.color};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  transition: height 0.5s ease;
`;

const BarLabel = styled.div`
  margin-top: ${({ theme }) => theme.spacing.xs};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const TaskPriorityChart = () => {
  const tasks = useSelector(selectAllTasks);
  
  // Calculate priority stats from tasks
  const priorityStats = {
    high: tasks.filter(task => task.priority === 'high').length,
    medium: tasks.filter(task => task.priority === 'medium').length,
    low: tasks.filter(task => task.priority === 'low').length
  };
  
  const maxValue = Math.max(priorityStats.high, priorityStats.medium, priorityStats.low);
  const scale = maxValue > 0 ? 180 / maxValue : 0; // Scale to fit within chart height
  
  return (
    <ChartContainer>
      <ChartTitle>Task Priority Distribution</ChartTitle>
      
      <BarChartContainer>
        <BarGroup>
          <Bar 
            height={priorityStats.high * scale} 
            color="#ef476f"
          />
          <BarLabel>High</BarLabel>
        </BarGroup>
        
        <BarGroup>
          <Bar 
            height={priorityStats.medium * scale} 
            color="#ffd166"
          />
          <BarLabel>Medium</BarLabel>
        </BarGroup>
        
        <BarGroup>
          <Bar 
            height={priorityStats.low * scale} 
            color="#06d6a0"
          />
          <BarLabel>Low</BarLabel>
        </BarGroup>
      </BarChartContainer>
    </ChartContainer>
  );
};

export default TaskPriorityChart;