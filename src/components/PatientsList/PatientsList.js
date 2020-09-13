import React from "react";
import './PatientsList.css';

class PatientsList extends React.Component {
    render() {
        return (
            <div className='patients-list'>
                {this.props.error.error &&
                <div className='patients-list-error'>{this.props.error.error_msg}</div>
                }
                {this.props.header &&
                <div className='patients-list-item header'>
                    <div className='patients-list-item-item surname'>
                        Surname
                    </div>
                    <div className='patients-list-item-item name'>
                        Name
                    </div>
                    <div className='patients-list-item-item patronymic'>
                        Patronymic
                    </div>
                    <div className='patients-list-item-item gender'>
                        Gender
                    </div>
                    <div className='patients-list-item-item birthday'>
                        Birthday
                    </div>
                    <div className='patients-list-item-item oms-number'>
                        Oms number
                    </div>
                </div>
                }
                {this.props.patients.map(patient => (
                    <div key={patient.id} className='patients-list-item'>
                        <div className='patients-list-item-item surname'>
                            {patient.surname}
                        </div>
                        <div className='patients-list-item-item name'>
                            {patient.name}
                        </div>
                        <div className='patients-list-item-item patronymic'>
                            {patient.patronymic}
                        </div>
                        <div className='patients-list-item-item gender'>
                            {patient.gender}
                        </div>
                        <div className='patients-list-item-item birthday'>
                            {patient.birthday}
                        </div>
                        <div className='patients-list-item-item oms-number'>
                            {patient.oms_number}
                        </div>
                        <div className='patients-list-item-item edit'>
                            <a href={'/edit/' + patient.id}></a>
                        </div>
                    </div>
                ))}
            </div>
        )
    }
}

export default PatientsList;
