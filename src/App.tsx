import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import type {} from '@mui/x-data-grid/themeAugmentation';
import Header from './components/Header';
import { createTheme, Stack, ThemeProvider } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { fetchData } from './api/FetchDogs.ts';
import LoadingButton from '@mui/lab/LoadingButton';

interface RootState {
    darkMode: boolean;
    data: {
        rows: any[];
        status: 'idle' | 'loading' | 'succeeded' | 'failed';
        error: string | null;
    };
}

const App: React.FC = () => {
    const isDarkMode = useSelector((state: RootState) => state.darkMode);
    const dispatch = useDispatch();
    const { rows, status, error } = useSelector((state: RootState) => state.data);

    const [modalOpen, setModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    useEffect(() => {
        dispatch(fetchData());
    }, [dispatch]);

    const handleImageClick = (imageUrl: string) => {
        setSelectedImage(imageUrl);
        setModalOpen(true);
        document.body.style.overflowY = 'hidden';
    };

    const closeModal = () => {
        setSelectedImage(null);
        setModalOpen(false);
        document.body.style.overflow = 'auto';
    };

    const columns: GridColDef[] = [
        {
            field: 'name',
            headerName: 'Name',
            flex: 1,
            headerClassName: 'name-header',
            cellClassName: 'name-cell',
        },
        {
            field: 'life_span',
            headerName: 'Life Cycle',
            flex: 1,
            headerClassName: 'life-span-header',
            cellClassName: 'life-span-cell',
        },
        {
            field: 'temperament',
            headerName: 'Temperament',
            flex: 1,
            headerClassName: 'temperament-header',
            cellClassName: 'temperament-cell',
        },
        {
            field: 'image',
            headerName: 'Photo',
            flex: 1,
            headerClassName: 'image-header',
            cellClassName: 'image-cell',
            renderCell: (params) => (
                <div onClick={() => handleImageClick(params.value.url)}>
                    <img
                        src={params.value.url}
                        alt="Dog"
                        style={{ flex: 1, objectFit: 'cover', cursor: 'pointer' }}
                    />
                </div>
            ),
        },
    ];

    if (status === 'loading') {
        return (
            <Stack direction="row" spacing={2}>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100vh',
                        width: '100%',
                    }}
                >
                    <LoadingButton
                        style={{ width: '200px', height: '60px', fontSize: 62, border: 'none' }}
                        loading
                        variant="outlined"
                    >
                        Submit
                    </LoadingButton>
                </div>
            </Stack>
        );
    }

    if (status === 'failed') {
        return <div>Error: {error}</div>;
    }

    const theme = createTheme({
        components: {
            MuiDataGrid: {
                styleOverrides: {
                    root: {
                        backgroundColor: isDarkMode ? '#333' : '#FFF',
                        color: isDarkMode ? '#FFF' : '#000',
                    },
                },
            },
        },
        palette: {
            mode: isDarkMode ? 'dark' : 'light',
        },
    });

    return (
        <div className="App">
            <Header />
            <ThemeProvider theme={theme}>
                <DataGrid rows={rows} columns={columns} pageSizeOptions={[5]} />
            </ThemeProvider>
            {modalOpen && (
                <div className="modal">
                    <div className="modal-content">
            <span className="close" onClick={closeModal}>
              Х
            </span>
                        <img src={selectedImage || ""} alt="Dog" className="modal-image" />
                    </div>
                </div>
            )}
        </div>
    );
};

export default App;
