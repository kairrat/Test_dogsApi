import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppBar, Grid, Typography, Switch } from '@mui/material';
import { toggleDarkMode } from '../redux/slices/DarkModeSlice';

// Define the type for the Redux state
interface RootState {
    darkMode: boolean;
}

const Header: React.FC = () => {
    const isDarkMode = useSelector((state: RootState) => state.darkMode);
    const dispatch = useDispatch();

    const handleDarkModeToggle = () => {
        dispatch(toggleDarkMode());
    };

    return (
        <AppBar sx={{ height: '80px', backgroundColor: 'purple', position: 'static' }}>
            <Grid container justifyContent="space-between" alignItems="center" sx={{ height: '100%' }}>
                <Grid item>
                    <Typography>
                        React-Dog-Test-Project
                    </Typography>
                </Grid>

                <Grid item>
                    <Typography>
                        Dark Mode
                        <Switch
                            color="default"
                            checked={isDarkMode}
                            onChange={handleDarkModeToggle}
                        />
                    </Typography>
                </Grid>
            </Grid>
        </AppBar>
    );
};

export default Header;
