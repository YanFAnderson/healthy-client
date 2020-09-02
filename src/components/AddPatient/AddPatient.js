import React from "react";
import './AddPatient.css';
import Axios from "axios";
import {Redirect} from 'react-router-dom';

class AddPatient extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            success: false,
            error: false,
            error_msg: '',
            name: '',
            patronymic: '',
            surname: '',
            gender: 'male',
            birthday: '',
            address: '',
            oms_number: ''
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
        Axios.get(process.env.REACT_APP_API_URL + '/patient/create', {
            params: this.state
        })
            .then((response) => {
                this.setState({success: true});
            })
            .catch((error) => {
                console.log(error);
                this.setState({error: true, error_msg: error.response.data.message})
            });
        event.preventDefault();
    }

    render() {
        if (this.state.success)
            return <Redirect to='/'/>;
        return (
            <div className='add-patient'>
                {this.state.error &&
                <div className='add-patient-error'>
                    <div className='add-patient-error-header'>Error!</div>
                    <div className='add-patient-error-msg'>{this.state.error_msg}</div>
                </div>
                }
                <div className='add-patient-header'>
                    Add patient
                </div>
                <form onSubmit={this.handleSubmit}>
                    <div className='add-patient-item'>
                        <input type='text' name='name' placeholder='Name' required value={this.state.name}
                               onChange={this.handleChange}/>
                    </div>
                    <div className='add-patient-item'>
                        <input type='text' name='patronymic' placeholder='Patronymic' required
                               value={this.state.patronymic} onChange={this.handleChange}/>
                    </div>
                    <div className='add-patient-item'>
                        <input type='text' name='surname' placeholder='Surname' required value={this.state.surname}
                               onChange={this.handleChange}/>
                    </div>
                    <div className='add-patient-item'>
                        <select name='gender' required value={this.state.gender} onChange={this.handleChange}>
                            <option value='male'>Male</option>
                            <option value='female'>Female</option>
                        </select>
                    </div>
                    <div className='add-patient-item'>
                        <input type='text' name='birthday' placeholder='Birthday YYYY-MM-DD' minLength='10'
                               maxLength='10' required value={this.state.birthday} onChange={this.handleChange}/>
                    </div>
                    <div className='add-patient-item'>
                        <input type='text' name='address' placeholder='Address' required value={this.state.address}
                               onChange={this.handleChange}/>
                    </div>
                    <div className='add-patient-item'>
                        <input type='text' name='oms_number' placeholder='Oms number' minLength='16' maxLength='16'
                               required value={this.state.oms_number} onChange={this.handleChange}/>
                    </div>
                    <div className='add-patient-item'>
                        <button type='submit'>Add</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default AddPatient;
