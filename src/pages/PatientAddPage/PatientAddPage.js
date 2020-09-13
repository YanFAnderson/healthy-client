import React from "react";
import api from "../../services/PatientsService"
import PatientForm from "../../components/PatientForm/PatientForm";
import {Redirect} from 'react-router-dom';

class PatientAddPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            success: false,
            error: false,
            error_msg: '',
            data: {
                name: '',
                patronymic: '',
                surname: '',
                gender: 'male',
                birthday: '',
                address: '',
                oms_number: ''
            }
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
        api.create(this.state.data)
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
        const error = {error: this.state.error, error_msg: this.state.error_msg};
        return (
            <div>
                {this.state.success &&
                <Redirect to='/'/>
                }
                <PatientForm data={this.state.data} error={error} header={"Add patient"}
                             handleChange={this.handleChange}
                             handleSubmit={this.handleSubmit}/>
            </div>
        );
    }
}

export default PatientAddPage;
