import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import TaskCard from "./TaskCard";
import { Button } from "../ui";
import { selectAllTasks } from "../../store/slices/tasksSlice";
import { setTaskFilter, selectTaskFilter } from "../../store/slices/uiSlice";

const ListHeader = styled.div`
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

const FiltersContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 100%;
    overflow-x: auto;
    padding-bottom: ${({ theme }) => theme.spacing.sm};

    /* Hide scrollbar */
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
    &::-webkit-scrollbar {
      display: none; /* Chrome, Safari, Opera */
    }
  }
`;

const FilterButton = styled(Button)`
  min-width: 80px;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-shrink: 0;
  }
`;

const TasksGrid = styled.div`
  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: ${({ theme }) => theme.spacing.lg};
  }
`;

const TaskList = ({ onEditTask }) => {
  const dispatch = useDispatch();
  const tasks = useSelector(selectAllTasks);
  const filter = useSelector(selectTaskFilter);

  const handleFilterChange = (newFilter) => {
    dispatch(setTaskFilter(newFilter));
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true;
    return task.status === filter;
  });

  return (
    <div>
      <ListHeader>
        <h2>Your Tasks</h2>
        <FiltersContainer>
          <FilterButton
            variant={filter === "all" ? "primary" : "outlined"}
            size="small"
            onClick={() => handleFilterChange("all")}
          >
            All
          </FilterButton>
          <FilterButton
            variant={filter === "to-do" ? "primary" : "outlined"}
            size="small"
            onClick={() => handleFilterChange("to-do")}
          >
            To Do
          </FilterButton>
          <FilterButton
            variant={filter === "in-progress" ? "primary" : "outlined"}
            size="small"
            onClick={() => handleFilterChange("in-progress")}
          >
            In Progress
          </FilterButton>
          <FilterButton
            variant={filter === "completed" ? "primary" : "outlined"}
            size="small"
            onClick={() => handleFilterChange("completed")}
          >
            Completed
          </FilterButton>
        </FiltersContainer>
      </ListHeader>

      <TasksGrid>
        {filteredTasks.map((task) => (
          <TaskCard key={task.id} task={task} onEdit={onEditTask} />
        ))}
      </TasksGrid>

      {filteredTasks.length === 0 && (
        <p>No tasks found with the selected filter.</p>
      )}
    </div>
  );
};

export default TaskList;
