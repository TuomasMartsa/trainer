import React, { useState, useEffect } from 'react';
import { AgGridReact, AgGridColumn } from 'ag-grid-react';
import moment from 'moment';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Snackbar from '@material-ui/core/Snackbar';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

function Trainings() {
    const [trainings, setTrainings] = useState([]);
    const [date, setDate] = useState();
    const [open, setOpen] = useState(false);

    const openSnack = () => {
        setOpen(true);
    };

    const closeSnack = () => {
        setOpen(false);
    };

    useEffect(() => {
        fetchTrainings();
    }, []);
    
    const fetchTrainings = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => response.json())
        .then(data => setTrainings(data))
        .catch(err => console.error(err))
    }

    const deleteTraining = (id) => {
        if(window.confirm('Haluatko todella poistaa reenin?')){
            fetch('https://customerrest.herokuapp.com/api/trainings/'+id, 
            { method: 'DELETE'})
            .then(response => {
                if (response.ok){
                    openSnack();
                    fetchTrainings();
                } else 
                    alert('Poisto epäonnistui');
            })
            .catch(err => console.error(err))
        }
    };

    function nameValueGetter(params) {
        return params.data.customer.firstname + ' ' + params.data.customer.lastname;
    }

    function dateValueGetter(params) {
        return moment(params.data.date).format('DD.MM.YYYY HH:mm');
    }

    const columns = [
        { headerName: 'Aika', field: 'date', filterParams:{ buttons: ['reset'], closeOnApply: true },
        valueGetter: dateValueGetter
        },
        { headerName: 'Nimi', filterParams:{ buttons: ['reset'], closeOnApply: true }, valueGetter: nameValueGetter},
        { headerName: 'Kesto', field: 'duration', filter: "agNumberColumnFilter", filterParams:{ buttons: ['reset'] }, width: 100 },
        { headerName: 'Harkka', field: 'activity', filterParams:{ buttons: ['reset'] } },
        { headerName: '', field: 'id', width: 100,
            cellRendererFramework: params =>
                <IconButton color='secondary' size="small" onClick={() => deleteTraining(params.value)}>
                    <DeleteIcon />
                </IconButton>
        }
    ]

    return (
        <div>
            
            <div className="ag-theme-material" style={{ height: 600, width: '95%', margin: 'auto', marginTop: 10 }}>
                <AgGridReact 
                rowData={trainings}
                columnDefs={columns}
                defaultColDef={{
                    sortable: true,
                    resizable: true,
                    filter: true,
                  }}
                /* pagination={true}
                paginationAutoPageSize={true}
                filterParams={{ buttons: ['apply', 'reset'], closeOnApply: true }} */
                />
            </div>
            <Snackbar
                open={open}
                message='Treeni poistettu'
                autoHideDuration={4000}
                onClose={closeSnack}
            />
           
        </div>
    );
}

export default Trainings;