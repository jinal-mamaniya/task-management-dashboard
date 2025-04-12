import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { Button } from '../ui';
import { updateTask, deleteTask } from '../../store/slices/tasksSlice';

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
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.md};
  grid-column: 1 / -1;
  margin-top: ${({ theme }) => theme.spacing.md};
`;

const DeleteButton = styled(Button)`
  background-color: ${({ theme }) => theme.colors.error};
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.error}dd;
  }
`;

const TaskEditForm = ({ task, onClose }) => {
  const dispatch = useDispatch();
  const [editedTask, setEditedTask] = useState({ ...task });
  
  useEffect(() => {
    setEditedTask({ ...task });
  }, [task]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTask(prevTask => ({
      ...prevTask,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateTask(editedTask));
    alert('Task updated successfully!');
    onClose();
  };
  
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      dispatch(deleteTask(task.id));
      alert('Task deleted successfully!');
      onClose();
    }
  };
  
  return (
    <FormContainer>
      <h2>Edit Task</h2>
      
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="edit-title">Title</Label>
          <Input 
            type="text" 
            id="edit-title" 
            name="title" 
            value={editedTask.title} 
            onChange={handleChange}
            required
          />
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="edit-category">Category</Label>
          <Input 
            type="text" 
            id="edit-category" 
            name="category" 
            value={editedTask.category} 
            onChange={handleChange}
          />
        </FormGroup>
        
        <FormGroup className="full-width">
          <Label htmlFor="edit-description">Description</Label>
          <Textarea 
            id="edit-description" 
            name="description" 
            value={editedTask.description} 
            onChange={handleChange}
          />
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="edit-status">Status</Label>
          <Select 
            id="edit-status" 
            name="status" 
            value={editedTask.status} 
            onChange={handleChange}
          >
            <option value="to-do">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </Select>
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="edit-priority">Priority</Label>
          <Select 
            id="edit-priority" 
            name="priority" 
            value={editedTask.priority} 
            onChange={handleChange}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </Select>
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="edit-dueDate">Due Date</Label>
          <Input 
            type="date" 
            id="edit-dueDate" 
            name="dueDate" 
            value={editedTask.dueDate} 
            onChange={handleChange}
          />
        </FormGroup>
        
        <ButtonGroup>
          <DeleteButton type="button" onClick={handleDelete}>Delete Task</DeleteButton>
          <div>
            <Button type="button" variant="text" onClick={onClose} style={{ marginRight: '10px' }}>Cancel</Button>
            <Button type="submit">Save Changes</Button>
          </div>
        </ButtonGroup>
      </Form>
    </FormContainer>
  );
};

export default TaskEditForm;