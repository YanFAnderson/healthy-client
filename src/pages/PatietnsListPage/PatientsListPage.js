import React from "react";
import api from "../../services/PatientsService"
import PatientsList from '../../components/PatientsList/PatientsList'

class PatientsListPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false,
            error_msg: '',
            patients: []
        }
    }

    componentDidMount() {
        api.findAll()
            .then(resp => {
                this.setState({patients: resp.data})
            })
            .catch(error => {
                console.log(error.response);
                this.setState({error: true, error_msg: error.response.data.message})
            });
    }

    render() {
        const error = {error: this.state.error, error_msg: this.state.error_msg};
        return (
            <PatientsList header={true} patients={this.state.patients} error={error}/>
        )
    }
}

export default PatientsListPage;
