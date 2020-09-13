import React from "react";
import api from "../../services/PatientsService";
import PatientForm from "../../components/PatientForm/PatientForm";
import {Redirect} from "react-router-dom";

class PatientEditPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            success: false,
            error: false,
            error_msg: '',
            data: {
                id: '',
                name: '',
                patronymic: '',
                surname: '',
                gender: '',
                birthday: '',
                address: '',
                oms_number: ''
            }
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        api.search({id: id})
            .then(response => {
                const data = response.data[0];
                if (response.data.length === 0) {
                    this.setState({error: true, error_msg: 'Patient not found!'})
                } else {
                    this.setState({
                        data: {
                            id: id,
                            name: data.name,
                            patronymic: data.patronymic,
                            surname: data.surname,
                            gender: data.gender,
                            birthday: data.birthday,
                            address: data.address,
                            oms_number: data.oms_number
                        }
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
        let newData = {...this.state.data, [name]: value};
        this.setState({
            data: newData
        });
    }

    handleSubmit(event) {
        api.update(this.state.data)
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
        api.delete(this.state.data.id)
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
                <PatientForm data={this.state.data} error={error} header={"Edit patient"}
                             handleChange={this.handleChange}
                             handleSubmit={this.handleSubmit} handleDelete={this.handleDelete}/>
            </div>
        )
    }
}

export default PatientEditPage
