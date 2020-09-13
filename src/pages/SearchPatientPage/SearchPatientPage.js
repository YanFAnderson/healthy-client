import React from "react";
import "./SearchPatientPage.css"
import PatientsList from "../../components/PatientsList/PatientsList";
import api from "../../services/PatientsService"

class SearchPatient extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false,
            error_msg: '',
            data: {
                name: '',
                patronymic: '',
                surname: '',
                gender: 'male',
                birthday: '',
                address: '',
                oms_number: '',
            },
            patients: []
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        let newData = {...this.state.data, [name]: value};
        this.setState({
            data: newData
        });
    }

    handleSubmit(event) {
        api.search(this.state.data)
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
        const error = {error: this.state.error, error_msg: this.state.error_msg};
        return (
            <div className='search-patient'>
                {error.error &&
                <div className='search-patient-error'>Error: {error.error_msg} </div>
                }
                <form onSubmit={this.handleSubmit}>
                    <div className='search-patient-item header'>
                        <div className='search-patient-item-item surname'>
                            <input type='text' name='surname' placeholder='Surname' value={this.state.data.surname}
                                   onChange={this.handleChange}/>
                        </div>
                        <div className='search-patient-item-item name'>
                            <input type='text' name='name' placeholder='Name' value={this.state.data.name}
                                   onChange={this.handleChange}/>
                        </div>
                        <div className='search-patient-item-item patronymic'>
                            <input type='text' name='patronymic' placeholder='Patronymic'
                                   value={this.state.data.patronymic}
                                   onChange={this.handleChange}/>
                        </div>
                        <div className='search-patient-item-item gender'>
                            <select name='gender' required value={this.state.data.gender}
                                    onChange={this.handleChange}>
                                <option value='male'>Male</option>
                                <option value='female'>Female</option>
                            </select>
                        </div>
                        <div className='search-patient-item-item birthday'>
                            <input type='text' name='birthday' placeholder='Birthday' minLength='10' maxLength='10'
                                   value={this.state.data.birthday}
                                   onChange={this.handleChange}/>
                        </div>
                        <div className='search-patient-item-item oms-number'>
                            <input type='text' name='oms_number' placeholder='Oms number' minLength='16'
                                   maxLength='16'
                                   value={this.state.data.oms_number}
                                   onChange={this.handleChange}/>
                        </div>
                        <div className='search-patient-item-item edit'>
                            <button type="submit">Go</button>
                        </div>
                    </div>
                </form>
                <PatientsList header={false} patients={this.state.patients} error={error}/>
            </div>
        );
    }
}


export default SearchPatient;
