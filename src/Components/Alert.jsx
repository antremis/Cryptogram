import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import './Alert.css'

const Alert = ({info, alert, type, remove}) => {
    return(
        <div className={`alert ${type?type:'info'}`}>
            <p className='more-info'>!</p>
            <p>{alert}</p>
            <p className='close' onClick={remove}>X</p>
        </div>
    )
}

let notify;

const Alerts = () => {
    const [alerts, setAlerts] = useState([]);

    const removeAlert = (id) => {
        setAlerts(prev => {
            return prev.filter((el) => el.id != id)
        })
    }

    notify = (alert) => {
        alert.id = uuid()
        alert.remove = () => removeAlert(alert.id)
        setAlerts(prev => {
            return [...prev, alert]
        })
        setTimeout(() =>{
            alert.remove()
        }, 3000)
    }

    return(
        <div className="alerts-wrapper">
            {alerts.map((el) => <Alert key={el.id} info={el.info} alert={el.alert} type={el.type} remove={el.remove} /> )}
        </div>
    )
}

export default Alerts
export {notify}