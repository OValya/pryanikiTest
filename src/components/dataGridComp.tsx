import {Box, Button} from "@mui/material";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import {useAuth} from "../hooks/useAuth.tsx";
import {useEffect, useState} from "react";

interface DataTable {
    companySigDate: string;
    companySignatureName: string;
    documentName: string;
    documentStatus: string;
    documentType: string;
    employeeNumber: string;
    employeeSigDate: string;
    employeeSignatureName: string;
    id: string;
}


const DataGridComp = () => {
    const user = useAuth()
    const host = import.meta.env.VITE_HOST

    const getURL = '/ru/data/v3/testmethods/docs/userdocs/get';
    const addURL = '/ru/data/v3/testmethods/docs/userdocs/add';
    const deleteURL = '/ru/data/v3/testmethods/docs/userdocs/delete/';

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
            field: 'employeeSigDate',
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
        console.log(params.id)
        setIdRow(params.id)
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


    return (
        <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
                getRowId={(data) => data.id}
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
                <Button onClick={handleAddRow} variant={'contained'}>Добавить запись</Button>
                <Button onClick={handleDeleteRow} variant={'outlined'}>Удалить запись</Button>
            </Box>

        </Box>
    );
};

export default DataGridComp;