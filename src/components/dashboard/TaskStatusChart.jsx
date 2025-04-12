import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { Card } from "../ui";
import { selectTaskStats } from "../../store/slices/tasksSlice";

const ChartContainer = styled(Card)`
  padding: ${({ theme }) => theme.spacing.lg};
  min-height: 300px;
`;

const ChartTitle = styled.h3`
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const DonutChart = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
  margin: 0 auto;
  border-radius: 50%;
  background: conic-gradient(
    ${({ theme }) => theme.colors.success} 0%
      ${(props) => props.completedPercentage}%,
    ${({ theme }) => theme.colors.primary}
      ${(props) => props.completedPercentage}%
      ${(props) => props.completedPercentage + props.inProgressPercentage}%,
    ${({ theme }) => theme.colors.text.disabled}
      ${(props) => props.completedPercentage + props.inProgressPercentage}% 100%
  );

  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 120px;
    height: 120px;
    border-radius: 50%;
    background-color: white;
  }
`;

const ChartLegend = styled.div`
  display: flex;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.lg};
  margin-top: ${({ theme }) => theme.spacing.xl};
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const ColorIndicator = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const TaskStatusChart = () => {
  const taskStats = useSelector(selectTaskStats);

  const completedPercentage = (taskStats.completed / taskStats.total) * 100;
  const inProgressPercentage = (taskStats.inProgress / taskStats.total) * 100;

  return (
    <ChartContainer>
      <ChartTitle>Task Status Distribution</ChartTitle>

      <DonutChart
        completedPercentage={completedPercentage}
        inProgressPercentage={inProgressPercentage}
      />

      <ChartLegend>
        <LegendItem>
          <ColorIndicator color="#06d6a0" />
          <span>Completed</span>
        </LegendItem>
        <LegendItem>
          <ColorIndicator color="#4361ee" />
          <span>In Progress</span>
        </LegendItem>
        <LegendItem>
          <ColorIndicator color="#adb5bd" />
          <span>To Do</span>
        </LegendItem>
      </ChartLegend>
    </ChartContainer>
  );
};

export default TaskStatusChart;
