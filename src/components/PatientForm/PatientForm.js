import React from "react";
import './PatientForm.css';

class PatientForm extends React.Component {

    render() {
        return (
            <div className='patient'>
                {this.props.error.error &&
                <div className='patient-error'>
                    <div className='patient-error-header'>Error!</div>
                    <div className='patient-error-msg'>{this.props.error.error_msg}</div>
                </div>
                }
                <div className='patient-header'>
                    {this.props.header}
                </div>
                <form onSubmit={this.props.handleSubmit}>
                    <div className='patient-item'>
                        <input type='text' name='name' placeholder='Name' required value={this.props.data.name}
                               onChange={this.props.handleChange}/>
                    </div>
                    <div className='patient-item'>
                        <input type='text' name='patronymic' placeholder='Patronymic' required
                               value={this.props.data.patronymic} onChange={this.props.handleChange}/>
                    </div>
                    <div className='patient-item'>
                        <input type='text' name='surname' placeholder='Surname' required value={this.props.data.surname}
                               onChange={this.props.handleChange}/>
                    </div>
                    <div className='patient-item'>
                        <select name='gender' required value={this.props.data.gender}
                                onChange={this.props.handleChange}>
                            <option value='male'>Male</option>
                            <option value='female'>Female</option>
                        </select>
                    </div>
                    <div className='patient-item'>
                        <input type='text' name='birthday' placeholder='Birthday YYYY-MM-DD' minLength='10'
                               maxLength='10' required value={this.props.data.birthday}
                               onChange={this.props.handleChange}/>
                    </div>
                    <div className='patient-item'>
                        <input type='text' name='address' placeholder='Address' required value={this.props.data.address}
                               onChange={this.props.handleChange}/>
                    </div>
                    <div className='patient-item'>
                        <input type='text' name='oms_number' placeholder='Oms number' minLength='16' maxLength='16'
                               required value={this.props.data.oms_number} onChange={this.props.handleChange}/>
                    </div>
                    <div className='patient-item'>
                        <button type='submit'>Save</button>
                    </div>
                    {this.props.handleDelete &&
                    <div className='patient-item delete'>
                        <button type='button' onClick={this.props.handleDelete}>Delete</button>
                    </div>
                    }
                </form>
            </div>
        );
    }
}

export default PatientForm;
