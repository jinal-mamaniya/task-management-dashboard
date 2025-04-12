import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { Button } from '../ui';
import { addTask } from '../../store/slices/tasksSlice';

const FormContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  box-shadow: ${({ theme }) => theme.shadows.md};
  padding: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const Form = styled.form`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({ theme }) => theme.spacing.md};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  
  &.full-width {
    grid-column: 1 / -1;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const Input = styled.input`
  padding: ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.text.disabled};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: ${({ theme }) => theme.fontSizes.md};
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => `${theme.colors.primary}25`};
  }
`;

const Textarea = styled.textarea`
  padding: ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.text.disabled};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: ${({ theme }) => theme.fontSizes.md};
  min-height: 100px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => `${theme.colors.primary}25`};
  }
`;

const Select = styled.select`
  padding: ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.text.disabled};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: ${({ theme }) => theme.fontSizes.md};
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => `${theme.colors.primary}25`};
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing.md};
  grid-column: 1 / -1;
  margin-top: ${({ theme }) => theme.spacing.md};
`;

const TaskForm = () => {
  const dispatch = useDispatch();
  const [task, setTask] = useState({
    title: '',
    description: '',
    status: 'to-do',
    priority: 'medium',
    dueDate: '',
    category: ''
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask(prevTask => ({
      ...prevTask,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addTask(task));
    // Reset form
    setTask({
      title: '',
      description: '',
      status: 'to-do',
      priority: 'medium',
      dueDate: '',
      category: ''
    });
    
    // Show a success message
    alert('Task created successfully!');
  };
  
  return (
    <FormContainer>
      <h2>Create New Task</h2>
      
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="title">Title</Label>
          <Input 
            type="text" 
            id="title" 
            name="title" 
            value={task.title} 
            onChange={handleChange}
            required
          />
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="category">Category</Label>
          <Input 
            type="text" 
            id="category" 
            name="category" 
            value={task.category} 
            onChange={handleChange}
          />
        </FormGroup>
        
        <FormGroup className="full-width">
          <Label htmlFor="description">Description</Label>
          <Textarea 
            id="description" 
            name="description" 
            value={task.description} 
            onChange={handleChange}
          />
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="status">Status</Label>
          <Select 
            id="status" 
            name="status" 
            value={task.status} 
            onChange={handleChange}
          >
            <option value="to-do">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </Select>
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="priority">Priority</Label>
          <Select 
            id="priority" 
            name="priority" 
            value={task.priority} 
            onChange={handleChange}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </Select>
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="dueDate">Due Date</Label>
          <Input 
            type="date" 
            id="dueDate" 
            name="dueDate" 
            value={task.dueDate} 
            onChange={handleChange}
          />
        </FormGroup>
        
        <ButtonGroup>
          <Button type="button" variant="text">Cancel</Button>
          <Button type="submit">Create Task</Button>
        </ButtonGroup>
      </Form>
    </FormContainer>
  );
};

export default TaskForm;