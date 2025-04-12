import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { Card } from "../ui";
import { selectAllTasks } from "../../store/slices/tasksSlice";

const ListContainer = styled(Card)`
  padding: ${({ theme }) => theme.spacing.lg};
  min-height: 300px;
`;

const ListTitle = styled.h3`
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const TaskItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.md};
  border-bottom: 1px solid ${({ theme }) => theme.colors.text.disabled}20;

  &:last-child {
    border-bottom: none;
  }
`;

const TaskInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const TaskName = styled.span`
  font-weight: 500;
`;

const TaskDate = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const TaskStatus = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  background-color: ${({ status, theme }) => {
    switch (status) {
      case "completed":
        return `${theme.colors.success}25`;
      case "in-progress":
        return `${theme.colors.primary}25`;
      default:
        return `${theme.colors.text.secondary}15`;
    }
  }};
  color: ${({ status, theme }) => {
    switch (status) {
      case "completed":
        return theme.colors.success;
      case "in-progress":
        return theme.colors.primary;
      default:
        return theme.colors.text.secondary;
    }
  }};
`;

const RecentTasksList = () => {
  const allTasks = useSelector(selectAllTasks);

  // Sort tasks by due date (most recent first) and get the top 5
  const recentTasks = [...allTasks]
    .sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate))
    .slice(0, 4);

  return (
    <ListContainer>
      <ListTitle>Recent Tasks</ListTitle>

      {recentTasks.length > 0 ? (
        recentTasks.map((task) => (
          <TaskItem key={task.id}>
            <TaskInfo>
              <TaskName>{task.title}</TaskName>
              <TaskDate>Due: {task.dueDate}</TaskDate>
            </TaskInfo>
            <TaskStatus status={task.status}>
              {task.status.charAt(0).toUpperCase() +
                task.status.slice(1).replace("-", " ")}
            </TaskStatus>
          </TaskItem>
        ))
      ) : (
        <p>No tasks found.</p>
      )}
    </ListContainer>
  );
};

export default RecentTasksList;
