import react, { useState, useEffect } from 'react';
import { AgGridReact, AgGridColumn } from 'ag-grid-react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Snackbar from '@material-ui/core/Snackbar';
import AddCustomer from './AddCustomer';
import EditCustomer from './EditCustomer';
import AddTraining from './AddTraining';

import './Customers.css';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';


function Customers() {
    const [customers, setCustomers] = useState([]);
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState('');

    const openSnack = () => {
        setOpen(true);
    };

    const closeSnack = () => {
        setOpen(false);
    };

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => response.json())
        .then(data => setCustomers(data.content))
        .catch(err => console.err(err))
    }
//console.log(customers)
    const addCustomer = (newCustomer) => {
        fetch('https://customerrest.herokuapp.com/api/customers', {
            method: 'POST',
            body: JSON.stringify(newCustomer),
            headers: { 'Content-type': 'application/json' }
        })
        .then(response => {
            if (response.ok){
                setMsg('Asiakkaan tiedot tallennettu');
                openSnack();
                fetchCustomers();
            } else
                alert('Tallennus epäonnistui, yritä uudelleen')
        })
        .catch(err => console.error(err))
    }

    const editCustomer = (url, updatedCustomer) => {
        fetch(url, {
            method: 'PUT',
            body: JSON.stringify(updatedCustomer),
            headers: { 'Content-type': 'application/json' }
        })
        .then(response => {
            if (response.ok){
                setMsg('Muutokset tallennettu');
                openSnack();
                fetchCustomers();
            }
            else
                alert('Tallennus epäonnistui, yritä uudelleen')
        })
        .catch(err => console.error(err))
    };

    const deleteCustomer = (url) => {
        if(window.confirm('Haluatko todella poistaa asiakkaan tiedot ja harjoitukset?')){
            fetch(url, { method: 'DELETE'})
            .then(response => {
                if (response.ok){
                    setMsg('Asiakkaan tiedot poistettu');
                    openSnack();
                    fetchCustomers();
                } else 
                    alert('Poisto epäonnistui');
            })
            .catch(err => console.error(err))
        }
    };

    const addTraining = (newTraining) => {
        //console.log(newTraining)
        fetch('https://customerrest.herokuapp.com/api/trainings', {
            method: 'POST',
            body: JSON.stringify(newTraining),
            headers: { 'Content-type': 'application/json' }
        })
        .then(response => {
            if (response.ok){
                setMsg('Treeni tallennettu');
                openSnack();
                fetchCustomers();
            } else
                alert('Tallennus epäonnistui, yritä uudelleen')
        })
        .catch(err => console.error(err))
    }

    const columns = [
        { headerName: 'Nimi', children: [
            { headerName: 'Etunimi', field: 'firstname', width: 120, columnGroupShow: 'open'  }, 
            { headerName: 'Sukunimi', field: 'lastname', width: 120 }
        ]},
        { headerName: 'Osoite', children: [
            { headerName: 'Katuosoite', field: 'streetaddress', columnGroupShow: 'open' },
            { headerName: 'P.O', field: 'postcode', width: 100, columnGroupShow: 'open' },
            { headerName: 'Kaupunki', field: 'city', width: 130 }
        ]},
        { headerName: 'Yhteystiedot', children: [
            { headerName: 'Sähköposti', field: 'email', width: 200, columnGroupShow: 'open' },
            { headerName: 'Puhelin', field: 'phone', width: 160 }
        ]}, 
        {   headerName: '',
            field: 'links.0.href',
            width: 60,
            cellRendererFramework: params =>
                <EditCustomer link={ params.value } customer={ params.data } editCustomer={ editCustomer }/>
        },
        {   headerName: '',
            field: 'links.0.href',
            width: 60,
            cellRendererFramework: params =>
                <IconButton color='secondary' size="small" onClick={() => deleteCustomer(params.value)}>
                    <DeleteIcon />
                </IconButton>
        },
        {   headerName: '',
            field: 'links.0.href',
            width: 200,
            cellRendererFramework: params =>
                <AddTraining  link={ params.value } addTraining={addTraining} />
        }
    ]

    return (
        <div>
            <AddCustomer addCustomer={addCustomer} />
            <div className="ag-theme-material" 
                style={{ textAlign:'center', alignSelf: 'center', height: 600, width: '95%', margin: 'auto'}}>
                <AgGridReact 
                rowData={customers}
                columnDefs={columns}
                defaultColDef={{
                    sortable: true,
                    resizable: true,
                    filter: true,
                  }}
                pagination={true}
                paginationAutoPageSize={true}
                />
            </div>
            <Snackbar
                open={open}
                message={msg}
                autoHideDuration={4000}
                onClose={closeSnack}
            />
        </div>
    );
}

export default Customers;