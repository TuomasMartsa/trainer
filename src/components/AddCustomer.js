import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import SaveIcon from '@material-ui/icons/Save';

function AddCustomer(props) {
    const [open, setOpen] = useState(false);
    const [customer, setCustomer] = useState({
        firstname: '',
        lastname: '',
        streetaddress: '',
        postcode: '',
        city: '',
        email: '',
        phone: '' 
    });

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleSave = () => {
        props.addCustomer(customer);
        setOpen(false);
    };
    const InputChanged = (event) => {
        setCustomer({...customer, [event.target.name]: event.target.value})
    };


    return (
        <div>
            <Button style={{ marginTop: 10 }} color="primary" variant="outlined" onClick={handleClickOpen}>
                Lisää asiakas
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Uusi asiakas</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Etunimi"
                        name='firstname'
                        value={customer.firstname}
                        onChange={InputChanged}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Sukunimi"
                        name='lastname'
                        value={customer.lastname}
                        onChange={InputChanged}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Katuosoite"
                        name='streetaddress'
                        value={customer.streetaddress}
                        onChange={InputChanged}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Postinumero"
                        name='postcode'
                        value={customer.postcode}
                        onChange={InputChanged}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Kaupunki"
                        name='city'
                        value={customer.city}
                        onChange={InputChanged}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Sähköposti"
                        name='email'
                        value={customer.email}
                        onChange={InputChanged}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Puhelin"
                        name='phone'
                        value={customer.phone}
                        onChange={InputChanged}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary" variant="outlined">
                        Peruuta
                    </Button>
                    <Button onClick={handleSave} color="primary" variant="outlined" startIcon={<SaveIcon />}>
                        Tallenna
                    </Button>
                </DialogActions>
            </Dialog>
            
        </div>
    );
}

export default AddCustomer;