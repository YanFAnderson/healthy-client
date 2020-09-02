import React from "react";
import './PatientsList.css';
import Axios from "axios";

class PatientsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false,
            error_msg: '',
            patients: []
        }
    }

    componentDidMount() {
        Axios.get(process.env.REACT_APP_API_URL + '/patient/list')
            .then((response) => {
                this.setState({patients: response.data});
            })
            .catch((error) => {
                console.log(error);
                this.setState({error: true, error_msg: error.response.data.message})
            });
    }

    render() {
        const {error, error_msg, patients} = this.state;
        if (error === true) {
            return <div className='patients-list-error'>Error: {error_msg}</div>;
        } else {
            return (
                <div className='patients-list'>
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
                    {patients.map(patient => (
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
            );
        }
    }
}

export default PatientsList;
