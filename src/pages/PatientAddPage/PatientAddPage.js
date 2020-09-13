import React from "react";
import api from "../../services/PatientsService"
import PatientForm from "../../components/PatientForm/PatientForm";
import LoadingRing from "../../components/LoadingRing/LoadingRing";
import {Redirect} from 'react-router-dom';

class PatientAddPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
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
        this.setState({loading: true});
        api.create(this.state.data)
            .then((response) => {
                this.setState({success: true, loading: false});
            })
            .catch((error) => {
                console.log(error);
                this.setState({error: true, error_msg: error.response.data.message, loading: false})
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
                {this.state.loading ?
                    <LoadingRing/> :

                    <PatientForm data={this.state.data} error={error} header={"Add patient"}
                                 handleChange={this.handleChange}
                                 handleSubmit={this.handleSubmit}/>
                }
            </div>
        );
    }
}

export default PatientAddPage;
