import {Box, Button} from "@mui/material";
import {DataGrid, GridColDef, GridRenderCellParams, GridRowParams} from '@mui/x-data-grid';
import {useAuth} from "../hooks/useAuth.tsx";
import {useEffect, useState} from "react";
import ModalComp from "./modalComp.tsx";
import Loader from "./loader.tsx";
import ErrorComp from "./errorComp.tsx";

export interface DataTable {
    companySigDate: string;
    companySignatureName: string;
    documentName: string;
    documentStatus: string;
    documentType: string;
    employeeNumber: string;
    employeeSigDate: string;
    employeeSignatureName: string;
    id?: string;
}

export interface MessageType {
    type: 'error' | 'success',
    message: string,
    open: boolean,
}

const checkData = (res: Response) => {
    if (res.status != 200) {
        throw new Error('Error status: ' + res.status)
    }
}

const DataGridComp = () => {
    const user = useAuth()
    const host = import.meta.env.VITE_HOST
//todo get from env
    const getURL = '/ru/data/v3/testmethods/docs/userdocs/get';
    const addURL = '/ru/data/v3/testmethods/docs/userdocs/create';
    const deleteURL = '/ru/data/v3/testmethods/docs/userdocs/delete/';
    const editURL = '/ru/data/v3/testmethods/docs/userdocs/set/';

    const closeBar = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setMessage({
            type: 'error',
            message: '',
            open: false,
        })

    }

    const [message, setMessage] = useState<MessageType>({
        type: 'error',
        message: '',
        open: false,
    })
    const [loading, setLoading] = useState(false)
    const [modalValue, setModalValue] = useState<DataTable | null>(null)
    const [openModal, setOpenModal] = useState<boolean>(false)
    const [mode, setMode] = useState<'edit' | 'add'>('add')
    const [data, setData] = useState<DataTable[]>([{
        companySigDate: '',
        companySignatureName: '',
        documentName: '',
        documentStatus: '',
        documentType: '',
        employeeNumber: '',
        employeeSigDate: '',
        employeeSignatureName: '',
        id: '',
    }])

    const fetchRequest = async () => {
        try {
            setLoading(true)
            const response = await fetch(host + getURL, {
                method: 'GET',
                headers: {
                    'x-auth': user?.token ? user?.token : ''
                },
            })
            const json: { data: DataTable[] } = await response.json()
            setData(json.data)
            setLoading(false)
            setMessage({type: 'success', message: 'data was loaded successfully', open: true,})

        } catch
            (error) {
            setLoading(false)
            setMessage({type: 'error', message: `error occured! `, open: true,})

        }
    }

    useEffect(() => {
        fetchRequest()
    }, [])


    const postRequest = async (value: DataTable) => {
        const url = mode == 'edit' ? editURL + value.id : addURL
        setLoading(true)
        try {
            const res = await fetch(host + url, {
                method: 'POST',
                body: JSON.stringify(value),
                headers: {
                    "Content-Type": "application/json",
                    'x-auth': user?.token ? user?.token : ''
                },
            })
            checkData(res)
            const json: { data: DataTable } = await res.json()
            const postedData: DataTable = json.data
            mode == 'add' ? setData([...data, postedData]) : setData(data.map(row => row.id === postedData.id ? postedData : row))
            setMessage({type: 'success', message: 'data was saved successfully', open: true,})
            setLoading(false)

        } catch (error) {
            setLoading(false)
            setMessage({type: 'error', message: `error occured! ${error.message} `, open: true,})

        }

        setModalValue(null)
    }

    const columns: GridColDef<(typeof data)[number]>[] = [
        {field: 'id', headerName: 'ID', width: 90},
        {
            field: 'documentName',
            headerName: 'Название документа',
            width: 150,
        },
        {
            field: 'documentStatus',
            headerName: 'Статус',
            width: 150,
        },
        {
            field: 'documentType',
            headerName: 'Тип документа',
            width: 150,
        },
        {
            field: 'employeeNumber',
            headerName: 'Номер сотрудника',
            width: 150,
        },
        // {
        //     field: 'employeeSigName',
        //     headerName: 'employee signature',
        //     width: 150,
        // },
        {
            field: 'employeeSigDate',
            headerName: 'Дата подписания сотрудником',
            type: 'date',
            valueFormatter: (params: string) =>
                 params?.substring(0,10),
            width: 200,
        },
        // {
        //     field: 'companySigName',
        //     headerName: 'employee signature',
        //     width: 150,
        // },
        {
            field: 'companySigDate',
            headerName: 'Дата подписания компанией',
            type: 'date',
            valueFormatter: (params: string) =>
                params?.substring(0,10),
            width: 200,
        },
    ];

    const handleRowSelection = (params: GridRowParams) => {
        setModalValue(params.row)
    }

    const handleDeleteRow = async () => {
        if (data.length === 0) {
            return;
        }
        const idRow = modalValue?.id
        if (!idRow) {
            return;
        }
        setLoading(true)
        try {
            await fetch(`${host}${deleteURL}${idRow}`, {
                method: 'POST',
                headers: {
                    'x-auth': user?.token ? user?.token : ''
                },
            })

            setModalValue(null);
            setMessage({
                ...message,
                type: 'success',
                message: 'row was deleted successfully',
                open: true,
            })
            setLoading(false)
            setData([...data.filter((row) => row.id !== idRow)])
        } catch (error) {
            setMessage({
                ...message,
                type: 'error',
                message: 'error occured',
                open: true,
            })
            setLoading(false)
        }
    };

    const handleAddRow = () => {
        setModalValue(null)
        setMode('add')
        setOpenModal(true)
    };

    const handleEditRow = () => {
        setMode('edit')
        setOpenModal(true)
    }

    const handleCloseModal = (value: DataTable | null) => {

        setOpenModal(false)
        if (value) {
            postRequest(value);
        }
    }


    return (
        <Box sx={{height: 400, width: '100%'}}>
            {loading && <Loader/>}
            <DataGrid
                getRowId={(data) => data.id!}
                rows={data}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 5,
                        },
                    },
                }}
                onRowClick={handleRowSelection}
                pageSizeOptions={[5]}
            />
            <Box padding={2} sx={{display: 'flex', justifyContent: 'center', columnGap: 2, alignItems: 'center'}}>
                <Button onClick={handleAddRow} variant={'contained'}>Добавить запись</Button>
                <Button disabled={modalValue === null} onClick={handleEditRow} variant={'contained'}>Редактировать
                    запись</Button>
                <Button disabled={modalValue === null} onClick={handleDeleteRow} variant={'outlined'}>Удалить
                    запись</Button>
            </Box>
            <ModalComp open={openModal} onClose={handleCloseModal} value={modalValue}/>
            {message.open && <ErrorComp {...message} handleClose={closeBar}/>}
        </Box>
    );
};

export default DataGridComp;