import axios from 'axios';
import { ItemType } from '../types';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/todos'; // added a default value just for TS

export const fetchTodos = async (): Promise<ItemType[]> => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching todos:', error);
        throw new Error('Error fetching todos');
    }
};

export const addTodo = async (newTodo: ItemType): Promise<void> => {
    try {
        await axios.post(API_URL, newTodo, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error('Error adding todo:', error);
        throw new Error('Error adding todo');
    }
};

export const toggleTodo = async (updatedTodo: ItemType): Promise<void> => {
    try {
        await axios.put(API_URL, updatedTodo, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error('Error updating todo:', error);
        throw new Error('Error updating todo');
    }
};

export const deleteTodo = async (id: string): Promise<void> => {
    try {
        await axios.delete(API_URL, {
            data: { id },
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error('Error deleting todo:', error);
        throw new Error('Error deleting todo');
    }
};
