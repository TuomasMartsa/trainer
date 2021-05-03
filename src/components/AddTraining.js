import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import SaveIcon from '@material-ui/icons/Save';
import moment from 'moment/moment';

function AddTraining(props) {
    const now = moment().format('YYYY-MM-DDTHH:mm');
    const [open, setOpen] = useState(false);
    const [training, setTraining] = useState({
        date: now,
        activity: '',
        duration: '',
        customer: ''
    });
    const activities = [
        {value: 'Maantiepyöräily'},
        {value: 'Maastopyöräily'},
        {value: 'Spinning'},
        {value: 'Fitness'},
        {value: 'Zumba'},
        {value: 'Muu'}
    ]

    //console.log(now)

    const handleOpen = () => {
        setOpen(true);
        setTraining({...training, customer: props.link});
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleSave = () => {
        props.addTraining(training);
        setOpen(false);
    };
    const InputChanged = (event) => {
        setTraining({...training, [event.target.name]: event.target.value})
    };

    return (
        <div>
            <Button style={{ marginTop: 10 }} color="primary" variant="contained" size="small" onClick={handleOpen}>
                Lisää harjoitus
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Lisää treenin tiedot</DialogTitle>
                <DialogContent>
                    <TextField
                        //margin="dense"
                        label="Aika"
                        name='date'
                        type="datetime-local"
                        value={training.date}
                        onChange={InputChanged}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Harkka"
                        name='activity'
                        select
                        value={training.activity}
                        onChange={InputChanged}
                        fullWidth
                    >
                        {activities.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                            {option.value}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        margin="dense"
                        label="Kesto"
                        name='duration'
                        value={training.duration}
                        onChange={InputChanged}
                        fullWidth
                    />
{/*                     <TextField
                        margin="dense"
                        label="link"
                        name='asiakas'
                        value={props.link}
                        onChange={InputChanged}
                        fullWidth
                    /> */}
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

export default AddTraining;