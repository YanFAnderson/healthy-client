import React from "react";
import './EditPatient.css'
import Axios from "axios";
import {Redirect} from "react-router-dom";

class EditPatient extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            success: false,
            error: false,
            error_msg: '',
            id: '',
            name: '',
            patronymic: '',
            surname: '',
            gender: '',
            birthday: '',
            address: '',
            oms_number: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }


    componentDidMount() {
        const id = this.props.match.params.id;
        Axios.get(process.env.REACT_APP_API_URL + '/patient/search', {
            params: {id: id}
        })
            .then(response => {
                const data = response.data[0];
                if (response.data.length === 0) {
                    this.setState({error: true, error_msg: 'Patient not found!'})
                } else {
                    this.setState({
                        id: id,
                        name: data.name,
                        patronymic: data.patronymic,
                        surname: data.surname,
                        gender: data.gender,
                        birthday: data.birthday,
                        address: data.address,
                        oms_number: data.oms_number
                    })
                }
            })
            .catch((error) => {
                console.log(error);
                this.setState({error: true, error_msg: error.response.data.message})
            });
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
        Axios.get(process.env.REACT_APP_API_URL + '/patient/update', {
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

    handleDelete(event) {
        Axios.get(process.env.REACT_APP_API_URL + '/patient/delete', {
            params: this.state
        })
            .then((response) => {
                this.setState({success: true});
                console.log(response)
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
            <div className='edit-patient'>
                {this.state.error &&
                <div className='edit-patient-error'>
                    <div className='edit-patient-error-header'>Error!</div>
                    <div className='edit-patient-error-msg'>{this.state.error_msg}</div>
                </div>
                }
                <div className='edit-patient-header'>
                    Edit patient
                </div>
                {this.state.id !== '' &&
                <form onSubmit={this.handleSubmit}>
                    <div className='edit-patient-item'>
                        <input type='text' name='name' placeholder='Name' value={this.state.name}
                               onChange={this.handleChange}/>
                    </div>
                    <div className='edit-patient-item'>
                        <input type='text' name='patronymic' placeholder='Patronymic' required
                               value={this.state.patronymic} onChange={this.handleChange}/>
                    </div>
                    <div className='edit-patient-item'>
                        <input type='text' name='surname' placeholder='Surname' required value={this.state.surname}
                               onChange={this.handleChange}/>
                    </div>
                    <div className='edit-patient-item'>
                        <select name='gender' required value={this.state.gender} onChange={this.handleChange}>
                            <option value='male'>Male</option>
                            <option value='female'>Female</option>
                        </select>
                    </div>
                    <div className='edit-patient-item'>
                        <input type='text' name='birthday' placeholder='Birthday YYYY-MM-DD' minLength='10'
                               maxLength='10' required value={this.state.birthday} onChange={this.handleChange}/>
                    </div>
                    <div className='edit-patient-item'>
                        <input type='text' name='address' placeholder='Address' required value={this.state.address}
                               onChange={this.handleChange}/>
                    </div>
                    <div className='edit-patient-item'>
                        <input type='text' name='oms_number' placeholder='Oms number' minLength='16' maxLength='16'
                               required value={this.state.oms_number} onChange={this.handleChange}/>
                    </div>
                    <div className='edit-patient-item'>
                        <button type='submit'>Save</button>
                    </div>
                    <div className='edit-patient-item delete'>
                        <button type='button' onClick={this.handleDelete}>Delete</button>
                    </div>
                </form>
                }
            </div>
        )
    }
}

export default EditPatient
