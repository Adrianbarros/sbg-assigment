import React, { useState, useEffect } from 'react';
import {
    Container,
    TextField,
    Button,
    List,
    Typography,
    Snackbar,
    Alert,
    CircularProgress,
} from '@mui/material';
import Item from '../components/items'; // Import the Item component
import { ItemType } from '../types';
import { fetchTodos, addTodo, toggleTodo, deleteTodo } from '../utils/requests'; // Import API functions

const App: React.FC = () => {
    const [task, setTask] = useState('');
    const [todos, setTodos] = useState<ItemType[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    // Fetch Todos on component mount
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const todos = await fetchTodos();
                setTodos(todos);
                setError(null); // Clear any previous errors
            } catch (error) {
                setError('Error fetching todos. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleAddTodo = async () => {
        if (!task.trim()) {
            alert('Please enter a task');
            return;
        }

        const newTodo: ItemType = {
            id: Date.now().toString(), // Generate a unique ID
            task,
            completed: false,
        };

        setLoading(true);
        try {
            await addTodo(newTodo);
            setTodos([...todos, newTodo]);
            setTask(''); // Clear the input field
            setSuccessMessage('Task added successfully!');
            setError(null);
        } catch (error) {
            setError('Error adding task. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleToggleTodo = async (id: string) => {
        const updatedTodos = todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        );
        setTodos(updatedTodos);

        const updatedTodo = updatedTodos.find((todo) => todo.id === id);
        if (updatedTodo) {
            setLoading(true);
            try {
                await toggleTodo(updatedTodo);
                setSuccessMessage('Task updated successfully!');
                setError(null);
            } catch (error) {
                setError('Error updating task. Please try again.');
            } finally {
                setLoading(false);
            }
        }
    };

    const handleDeleteTodo = async (id: string) => {
        setLoading(true);
        try {
            await deleteTodo(id);
            const updatedTodos = todos.filter((todo) => todo.id !== id);
            setTodos(updatedTodos);
            setSuccessMessage('Task deleted successfully!');
            setError(null);
        } catch (error) {
            setError('Error deleting task. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container style={styles.container}>
            <Typography variant="h4" gutterBottom>
                SBG Todo App
            </Typography>
            <div style={styles.inputContainer}>
                <TextField
                    label="Enter a task"
                    variant="outlined"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    style={styles.textField}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAddTodo}
                    style={styles.button}
                    disabled={loading}
                >
                    Add Task
                </Button>
            </div>

            {loading && <CircularProgress style={styles.loader} />}

            <List style={styles.list}>
                {todos.map((todo) => (
                    <Item
                        key={todo.id}
                        {...todo}
                        onToggle={handleToggleTodo}
                        onDelete={handleDeleteTodo}
                    />
                ))}
            </List>

            {error && (
                <Snackbar
                    open={!!error}
                    autoHideDuration={6000}
                    onClose={() => setError(null)}
                >
                    <Alert onClose={() => setError(null)} severity="error">
                        {error}
                    </Alert>
                </Snackbar>
            )}

            {successMessage && (
                <Snackbar
                    open={!!successMessage}
                    autoHideDuration={6000}
                    onClose={() => setSuccessMessage(null)}
                >
                    <Alert onClose={() => setSuccessMessage(null)} severity="success">
                        {successMessage}
                    </Alert>
                </Snackbar>
            )}
        </Container>
    );
};

// Inline styles for better maintainability
const styles = {
    container: {
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
    },
    inputContainer: {
        display: 'flex',
        alignItems: 'center',

        marginBottom: '20px',
    },
    textField: {
        marginRight: '10px',
        width: '300px',
    },
    button: {
        marginRight: '10px',
    },
    list: {
        marginTop: '20px',
    },
    loader: {
        display: 'block',
        margin: '20px auto',
    },
};

export default App;
