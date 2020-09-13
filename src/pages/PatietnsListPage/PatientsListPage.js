import React from "react";
import api from "../../services/PatientsService"
import PatientsList from '../../components/PatientsList/PatientsList'
import LoadingRing from "../../components/LoadingRing/LoadingRing";

class PatientsListPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            error: false,
            error_msg: '',
            patients: []
        }
    }

    componentDidMount() {
        this.setState({loading: true});
        api.findAll()
            .then(resp => {
                this.setState({patients: resp.data, loading: false})
            })
            .catch(error => {
                console.log(error.response);
                this.setState({error: true, error_msg: error.response.data.message, loading: false})
            });
    }

    render() {
        const error = {error: this.state.error, error_msg: this.state.error_msg};
        return (
            <div>
                {this.state.loading ?
                    <LoadingRing/> :
                    <PatientsList header={true} patients={this.state.patients} error={error}/>
                }
            </div>
        )
    }
}

export default PatientsListPage;
