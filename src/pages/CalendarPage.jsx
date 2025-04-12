import React, { useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { Card } from "../components/ui";
import { selectAllTasks } from "../store/slices/tasksSlice";

const CalendarContainer = styled.div`
  margin-top: ${({ theme }) => theme.spacing.lg};
`;

const MonthNavigation = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const MonthTitle = styled.h2`
  margin: 0;
`;

const NavButton = styled.button`
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.text.disabled};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.background};
  }
`;

const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 10px;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    gap: 5px;
  }
`;

const WeekdayHeader = styled.div`
  text-align: center;
  font-weight: 500;
  padding: ${({ theme }) => theme.spacing.sm};
`;

const DayCell = styled(Card)`
  min-height: 100px;
  padding: ${({ theme }) => theme.spacing.sm};

  ${({ isCurrentMonth, theme }) =>
    !isCurrentMonth &&
    `
    opacity: 0.5;
    background-color: ${theme.colors.background};
  `}

  ${({ isToday, theme }) =>
    isToday &&
    `
    border: 2px solid ${theme.colors.primary};
  `}
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    min-height: 70px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    min-height: 50px;
    padding: 5px;
  }
`;

const DayNumber = styled.div`
  font-weight: 500;
  margin-bottom: 5px;
`;

const TaskDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${({ priority, theme }) => {
    switch (priority) {
      case "high":
        return theme.colors.error;
      case "medium":
        return theme.colors.warning;
      default:
        return theme.colors.success;
    }
  }};
  display: inline-block;
  margin-right: 3px;
`;

const TaskCount = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const CalendarPage = () => {
  const tasks = useSelector(selectAllTasks);
  const [currentDate, setCurrentDate] = useState(new Date());

  const getMonthData = (date) => {
    const month = date.getMonth();
    const year = date.getFullYear();

    // Get the first day of the month
    const firstDay = new Date(year, month, 1);
    // Get the last day of the month
    const lastDay = new Date(year, month + 1, 0);

    // Get the day of the week for the first day (0 = Sunday, 6 = Saturday)
    const firstDayOfWeek = firstDay.getDay();

    // Calculate days needed from previous month
    const daysFromPrevMonth = firstDayOfWeek;

    // Calculate total days in the calendar view (up to 42 - 6 weeks)
    const totalDays = 42;

    const days = [];

    // Add days from previous month
    const prevMonth = new Date(year, month - 1, 0);
    const prevMonthTotalDays = prevMonth.getDate();

    for (
      let i = prevMonthTotalDays - daysFromPrevMonth + 1;
      i <= prevMonthTotalDays;
      i++
    ) {
      days.push({
        day: i,
        month: month - 1,
        year: month === 0 ? year - 1 : year,
        isCurrentMonth: false,
        date: new Date(
          month === 0 ? year - 1 : year,
          month === 0 ? 11 : month - 1,
          i
        ),
      });
    }

    // Add days from current month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push({
        day: i,
        month: month,
        year: year,
        isCurrentMonth: true,
        date: new Date(year, month, i),
      });
    }

    // Add days from next month
    const remainingDays = totalDays - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        day: i,
        month: month + 1,
        year: month === 11 ? year + 1 : year,
        isCurrentMonth: false,
        date: new Date(
          month === 11 ? year + 1 : year,
          month === 11 ? 0 : month + 1,
          i
        ),
      });
    }

    return days;
  };

  const monthData = getMonthData(currentDate);
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Navigate to previous month
  const goToPrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  // Navigate to next month
  const goToNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  // Get tasks for a specific date
  const getTasksForDate = (date) => {
    return tasks.filter((task) => {
      const taskDate = new Date(task.dueDate);
      return (
        taskDate.getDate() === date.getDate() &&
        taskDate.getMonth() === date.getMonth() &&
        taskDate.getFullYear() === date.getFullYear()
      );
    });
  };

  // Check if a date is today
  const isToday = (date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  // Format the month and year
  const formatMonthYear = (date) => {
    return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  };

  return (
    <div>
      <h1>Calendar</h1>
      <p>View your tasks in a monthly calendar format</p>

      <CalendarContainer>
        <MonthNavigation>
          <NavButton onClick={goToPrevMonth}>&larr; Prev</NavButton>
          <MonthTitle>{formatMonthYear(currentDate)}</MonthTitle>
          <NavButton onClick={goToNextMonth}>Next &rarr;</NavButton>
        </MonthNavigation>

        <CalendarGrid>
          {weekdays.map((day) => (
            <WeekdayHeader key={day}>{day}</WeekdayHeader>
          ))}

          {monthData.map((dayData, index) => {
            const dayTasks = getTasksForDate(dayData.date);
            return (
              <DayCell
                key={index}
                isCurrentMonth={dayData.isCurrentMonth}
                isToday={isToday(dayData.date)}
              >
                <DayNumber>{dayData.day}</DayNumber>
                {dayTasks.length > 0 && (
                  <TaskCount>
                    {dayTasks.slice(0, 3).map((task, i) => (
                      <TaskDot key={i} priority={task.priority} />
                    ))}
                    {dayTasks.length > 0 &&
                      ` ${dayTasks.length} task${
                        dayTasks.length !== 1 ? "s" : ""
                      }`}
                  </TaskCount>
                )}
              </DayCell>
            );
          })}
        </CalendarGrid>
      </CalendarContainer>
    </div>
  );
};

export default CalendarPage;
