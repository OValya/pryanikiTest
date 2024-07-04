import {Box, Button} from "@mui/material";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import {useAuth} from "../hooks/useAuth.tsx";
import {useEffect, useState} from "react";
import ModalComp from "./modalComp.tsx";

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


const DataGridComp = () => {
    const user = useAuth()
    const host = import.meta.env.VITE_HOST

    const getURL = '/ru/data/v3/testmethods/docs/userdocs/get';
    const addURL = '/ru/data/v3/testmethods/docs/userdocs/create';
    const deleteURL = '/ru/data/v3/testmethods/docs/userdocs/delete/';

    const [modalValue, setModalValue] = useState<DataTable|null>(null)
    const [openModal, setOpenModal] = useState<boolean>(false)
    const [idRow, setIdRow] = useState<string>('')
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
    const fetchRequest = async () =>{
        const response = await fetch(host+getURL,{
            method: 'GET',
            headers: {
                'x-auth': user?.token ? user?.token : ''
            },
        })
        const json:{data:DataTable[]} = await response.json()
        setData(json.data)
        console.log(json.data)
    }
    useEffect(() => {
        fetchRequest()
    }, [])

    const postRequest = async (value:DataTable) => {
        console.log('stringify', JSON.stringify(value))
        const response = await fetch(host + addURL, {
            method: 'POST',
            body: JSON.stringify(value),
            headers:{
                "Content-Type": "application/json",
                'x-auth': user?.token ? user?.token : ''
            },
        })
        console.log('res', response)

    }

    const columns: GridColDef<(typeof data)[number]>[] = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
            field: 'documentName',
            headerName: 'doc name',
            width: 150,
            editable: true,
        },
        {
            field: 'documentStatus',
            headerName: 'status',
            width: 150,
            editable: true,
        },
        {
            field: 'documentType',
            headerName: 'type',
            width: 150,
            editable: true,
        },
        {
            field: 'employeeNumber',
            headerName: 'employee number',
            width: 150,
            editable: true,
        },
        {
            field: 'employeeSigName',
            headerName: 'employee signature',
            width: 150,
            editable: true,
        },
        {
            field: 'employeeSigDate',
            headerName: 'date',
            // type: 'date',
            width: 110,
            editable: true,
        },
        {
            field: 'companySigName',
            headerName: 'employee signature',
            width: 150,
            editable: true,
        },
        {
            field: 'companySigDate',
            headerName: 'date',
            // type: 'date',
            width: 110,
            editable: true,
        },
        // {
        //     field: 'fullName',
        //     headerName: 'Full name',
        //
        //     sortable: false,
        //     width: 160,
        //
        // },
    ];

    const handleRowSelection = (params: DataTable) => {
        //console.log(params.id)
        setIdRow(params.id!)
    }

    const handleDeleteRow = async () => {
        if (data.length === 0) {
            return;
        }

        if (!idRow) {
            return;
        }

        await fetch(`${host}${deleteURL}${idRow}`, {
            method: 'POST',
            headers: {
                'x-auth': user?.token ? user?.token : ''
            },
        })

        await fetchRequest()

    };

    const handleAddRow = () => {
        //setRows((prevRows) => [...prevRows, createRandomRow()]);
    };

    const handleCloseModal = (value:DataTable|null) => {
       // setModalValue(value)
        setOpenModal(false)
        if(value) {
            console.log('from parent',value);
            postRequest(value);
        }
    }
    const handleOpenModal = () => {
        setOpenModal(true)
    }


    return (
        <Box sx={{ height: 400, width: '100%' }}>
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
                // checkboxSelection
               // disableRowSelectionOnClick
            />
            <Box padding={2} sx={{ display: 'flex', justifyContent: 'center', columnGap: 2, alignItems: 'center' }}>
                <Button onClick={handleOpenModal} variant={'contained'}>Добавить запись</Button>
                <Button onClick={handleDeleteRow} variant={'outlined'}>Удалить запись</Button>
            </Box>
            <ModalComp open={openModal} onClose={handleCloseModal} />

        </Box>
    );
};

export default DataGridComp;