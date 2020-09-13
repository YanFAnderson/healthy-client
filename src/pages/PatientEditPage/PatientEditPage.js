import React from "react";
import api from "../../services/PatientsService";
import PatientForm from "../../components/PatientForm/PatientForm";
import LoadingRing from "../../components/LoadingRing/LoadingRing";
import {Redirect} from "react-router-dom";

class PatientEditPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
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
        this.setState({loading: true});
        api.search({id: id})
            .then(response => {
                const data = response.data[0];
                if (response.data.length === 0) {
                    this.setState({error: true, error_msg: 'Patient not found!', loading: false})
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
                        },
                        loading: false
                    })
                }
            })
            .catch((error) => {
                console.log(error);
                this.setState({error: true, error_msg: error.response.data.message, loading: false})
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
        this.setState({loading: true});
        api.update(this.state.data)
            .then((response) => {
                this.setState({success: true, loading: false});
            })
            .catch((error) => {
                console.log(error);
                this.setState({error: true, error_msg: error.response.data.message, loading: false})
            });
        event.preventDefault();
    }

    handleDelete(event) {
        this.setState({loading: true});
        api.delete(this.state.data.id)
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

                    <PatientForm data={this.state.data} error={error} header={"Edit patient"}
                                 handleChange={this.handleChange}
                                 handleSubmit={this.handleSubmit} handleDelete={this.handleDelete}/>
                }
            </div>
        )
    }
}

export default PatientEditPage
