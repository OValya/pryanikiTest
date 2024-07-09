import {Box, Button, Alert} from "@mui/material";
import {DataGrid, GridColDef, GridRowParams} from '@mui/x-data-grid';
import {useAuth} from "../hooks/useAuth.tsx";
import {useEffect, useState} from "react";
import ModalComp from "./modalComp.tsx";
import Loader from "./loader.tsx";

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

    const [error, setError] = useState('')
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
            if (!loading) {
                setLoading(true)
            }
            const response = await fetch(host + getURL, {
                method: 'GET',
                headers: {
                    'x-auth': user?.token ? user?.token : ''
                },
            })
            const json: { data: DataTable[] } = await response.json()
            setData(json.data)
            setLoading(false)
            // console.log('json', json.data)
        } catch
            (error) {
            console.log('error', error)
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
            fetchRequest()

        } catch (error) {
            setLoading(false)
            console.log('error', error) //todo show error
        }

        setModalValue(null)
    }

    const columns: GridColDef<(typeof data)[number]>[] = [
        {field: 'id', headerName: 'ID', width: 90},
        {
            field: 'documentName',
            headerName: 'doc name',
            width: 150,
        },
        {
            field: 'documentStatus',
            headerName: 'status',
            width: 150,
        },
        {
            field: 'documentType',
            headerName: 'type',
            width: 150,
        },
        {
            field: 'employeeNumber',
            headerName: 'employee number',
            width: 150,
        },
        {
            field: 'employeeSigName',
            headerName: 'employee signature',
            width: 150,
        },
        {
            field: 'employeeSigDate',
            headerName: 'date',
            // type: 'date',
            width: 110,
        },
        {
            field: 'companySigName',
            headerName: 'employee signature',
            width: 150,
        },
        {
            field: 'companySigDate',
            headerName: 'date',
            // type: 'date',
            width: 110,
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

        await fetch(`${host}${deleteURL}${idRow}`, {
            method: 'POST',
            headers: {
                'x-auth': user?.token ? user?.token : ''
            },
        })

        setModalValue(null);

        await fetchRequest()

        //onsole.log('del')

        setLoading(false)

    };

    const handleAddRow = () => {
        setModalValue({
            companySigDate: '',
            companySignatureName: '',
            documentName: '',
            documentStatus: '',
            documentType: '',
            employeeNumber: '',
            employeeSigDate: '',
            employeeSignatureName: '',
            id: '',
        })
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
            {error && <Alert severity="error">{error}</Alert>}
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

        </Box>
    );
};

export default DataGridComp;