import React from "react";
import PatientsList from "../SearchPatient/SearchPatient.css";
import Axios from "axios";

class SearchPatient extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false,
            error_msg: '',
            name: '',
            patronymic: '',
            surname: '',
            gender: 'male',
            birthday: '',
            address: '',
            oms_number: '',
            patients: []
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        Axios.get(process.env.REACT_APP_API_URL + '/patient/search', {
            params: this.state
        })
            .then((response) => {
                this.setState({patients: response.data});
            })
            .catch((error) => {
                console.log(error);
                this.setState({error: true, error_msg: error.response.data.message})
            });
        event.preventDefault();
    }

    render() {
        const {error, error_msg, patients} = this.state;
        if (error === true) {
            return <div className='search-patient-error'>Error: {error_msg}</div>;
        } else {
            return (
                <div className='search-patient'>
                    <form onSubmit={this.handleSubmit}>
                        <div className='search-patient-item header'>
                            <div className='search-patient-item-item surname'>
                                <input type='text' name='surname' placeholder='Surname' value={this.state.surname}
                                       onChange={this.handleChange}/>
                            </div>
                            <div className='search-patient-item-item name'>
                                <input type='text' name='name' placeholder='Name' value={this.state.name}
                                       onChange={this.handleChange}/>
                            </div>
                            <div className='search-patient-item-item patronymic'>
                                <input type='text' name='patronymic' placeholder='Patronymic'
                                       value={this.state.patronymic}
                                       onChange={this.handleChange}/>
                            </div>
                            <div className='search-patient-item-item gender'>
                                <select name='gender' required value={this.state.gender} onChange={this.handleChange}>
                                    <option value='male'>Male</option>
                                    <option value='female'>Female</option>
                                </select>
                            </div>
                            <div className='search-patient-item-item birthday'>
                                <input type='text' name='birthday' placeholder='Birthday' minLength='10' maxLength='10'
                                       value={this.state.birthday}
                                       onChange={this.handleChange}/>
                            </div>
                            <div className='search-patient-item-item oms-number'>
                                <input type='text' name='oms_number' placeholder='Oms number' minLength='16'
                                       maxLength='16'
                                       value={this.state.oms_number}
                                       onChange={this.handleChange}/>
                            </div>
                            <div className='search-patient-item-item edit'>
                                <button type="submit">Go</button>
                            </div>
                        </div>
                    </form>
                    {patients.map(patient => (
                        <div key={patient.id} className='search-patient-item'>
                            <div className='search-patient-item-item surname'>
                                {patient.surname}
                            </div>
                            <div className='search-patient-item-item name'>
                                {patient.name}
                            </div>
                            <div className='search-patient-item-item patronymic'>
                                {patient.patronymic}
                            </div>
                            <div className='search-patient-item-item gender'>
                                {patient.gender}
                            </div>
                            <div className='search-patient-item-item birthday'>
                                {patient.birthday}
                            </div>
                            <div className='search-patient-item-item oms-number'>
                                {patient.oms_number}
                            </div>
                            <div className='search-patient-item-item edit'>
                                <a href={'/edit/' + patient.id}></a>
                            </div>
                        </div>
                    ))}
                </div>
            );
        }
    }
}

export default SearchPatient;
