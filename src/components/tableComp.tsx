import {Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody} from "@mui/material";
import {useEffect, useState} from "react";
import {useAuth} from "../hooks/useAuth.tsx";


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

const TableComp =  () => {
    const user = useAuth()
    const host = import.meta.env.VITE_HOST
    const [data, setData] = useState([])
     useEffect(() => {
        const fetchData = async () =>{
            //console.log('host',host)
            const response = await fetch(host+'/ru/data/v3/testmethods/docs/userdocs/get',{
                method: 'GET',
                headers: {
                    'x-auth': user?.token ? user?.token : ''
                },
            })
            const json = await response.json()

            setData(json.data)
            console.log(json.data)
        }
       fetchData()
    }, [])

    const convertDate = (date: string):string => {
        const formatDate: Date = new Date(date);
        return formatDate.toLocaleString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' });
    }
    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>

        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Название документа</TableCell>
                        <TableCell align="right">Статус</TableCell>
                        <TableCell align="right">Тип документа</TableCell>
                        <TableCell align="right">Подписано сотрудником</TableCell>
                        <TableCell align="right">Подпись сотрудника</TableCell>
                        <TableCell align="right">Номер сотрудника</TableCell>
                        <TableCell align="right">Подпись компании</TableCell>
                        <TableCell align="right">Подписано компанией</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row: DataTable) => (
                        <TableRow
                            key={row.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.documentName}
                            </TableCell>
                            <TableCell align="right">{row.documentStatus}</TableCell>
                            <TableCell align="right">{row.documentType}</TableCell>
                            <TableCell align="right">{convertDate(row.employeeSigDate)}</TableCell>
                            <TableCell align="right">{row.employeeSignatureName}</TableCell>
                            <TableCell align="right">{row.employeeNumber}</TableCell>
                            <TableCell align="right">{row.companySignatureName}</TableCell>
                            <TableCell align="right">{convertDate(row.companySigDate)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        </Paper>
    );
};

export default TableComp;