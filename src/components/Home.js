import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer} from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

function Home() {
const localizer = momentLocalizer(moment);
const [trainings, setTrainings] = useState([]);

useEffect(() => {
    fetchTrainings();
}, []);

const fetchTrainings = () => {
    fetch('https://customerrest.herokuapp.com/gettrainings')
    .then(response => response.json())
    .then(data => setTrainings(data))
    .catch(err => console.error(err))
}
//console.log(trainings)


const events = trainings.map((training, id) => {

    const appts = {
        title: training.activity + ' ' + training.duration + ' mins. Asiakas: ' + 
        training.customer.firstname + ' ' + training.customer.lastname,
        start: new Date(training.date),
        end: new Date(moment(training.date).add(training.duration, 'minutes'))
    }
    return appts
});

    return (
        <div className = "App">
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500, margin: 20}}
                resizable
                defaultView='agenda'
            /> 
        </div>
    );
}

export default Home;