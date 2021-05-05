import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';

function EditCustomer(props) {
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

    const handleOpen = () => {
        setOpen(true);
        setCustomer({
            firstname: props.customer.firstname,
            lastname: props.customer.lastname,
            streetaddress: props.customer.streetaddress,
            postcode: props.customer.postcode,
            city: props.customer.city,
            email: props.customer.email,
            phone: props.customer.phone
        })
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleSave = () => {
        props.editCustomer(props.link, customer);
        setOpen(false);
    };
    const InputChanged = (event) => {
        setCustomer({...customer, [event.target.name]: event.target.value})
    };


    return (
        <div>
            <IconButton color="primary" size="small" onClick={handleOpen}>
                <EditIcon />
            </IconButton>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
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
                    <Button onClick={handleSave} color="primary"  variant="outlined" startIcon={<SaveIcon />}>
                        Tallenna
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default EditCustomer;