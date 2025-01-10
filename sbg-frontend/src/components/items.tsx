import React from 'react';
import { Checkbox, ListItem, ListItemText, ListItemIcon, Paper, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { ItemType as ItemProps } from '../types';

interface ItemComponentProps extends ItemProps {
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
}

const Item: React.FC<ItemComponentProps> = ({ id, task, completed, onToggle, onDelete }) => {
    return (
        <Paper
            elevation={3}
            style={{
                margin: '10px 0',
                padding: '10px',
                transition: 'transform 0.2s',
                cursor: 'pointer',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >

            <ListItem>
                <ListItemIcon>
                    <Checkbox
                        edge="start"
                        checked={completed}
                        tabIndex={-1}
                        disableRipple
                        onChange={() => onToggle(id)}
                    />
                </ListItemIcon>
                <ListItemText
                    primary={task}
                    style={{ textDecoration: completed ? 'line-through' : 'none' }}
                />
                <IconButton edge="end" aria-label="delete" onClick={() => onDelete(id)}>
                    <DeleteIcon />
                </IconButton>
            </ListItem>
        </Paper>
    );
};

export default Item;