import React from "react";
import {shallow} from 'enzyme';
import PatientForm from "../components/PatientForm/PatientForm";

describe('Patients form', () => {
    it('Render form', () => {
        const error = {error: false, error_msg: ""};
        const data = {
            name: '',
            patronymic: '',
            surname: '',
            gender: 'male',
            birthday: '',
            address: '',
            oms_number: ''
        };
        const component = shallow(<PatientForm data={data} error={error}/>);
        expect(component.find('input')).toHaveLength(6);
        expect(component.find('select')).toHaveLength(1);
        expect(component.find('button')).toHaveLength(1);
    });

    it('Render form with data', () => {
        const error = {error: false, error_msg: ""};
        const data = {
            "name": "Polina",
            "surname": "Na",
            "patronymic": "Andreevna",
            "gender": "female",
            "birthday": "2003-09-26",
            "address": "Orenburg",
            "oms_number": "1437057950585920"
        };
        const component = shallow(<PatientForm data={data} error={error}/>);
        expect(component.find({name: "name"}).props().value).toEqual("Polina");
        expect(component.find({name: "surname"}).props().value).toEqual("Na");
        expect(component.find({name: "patronymic"}).props().value).toEqual("Andreevna");
        expect(component.find({name: "gender"}).props().value).toEqual("female");
        expect(component.find({name: "birthday"}).props().value).toEqual("2003-09-26");
        expect(component.find({name: "address"}).props().value).toEqual("Orenburg");
        expect(component.find({name: "oms_number"}).props().value).toEqual("1437057950585920");
    });

    it('Render error', () => {
        const error = {error: true, error_msg: "Unknown error!"};
        const data = {
            "name": "",
            "surname": "",
            "patronymic": "",
            "gender": "male",
            "birthday": "",
            "address": "",
            "oms_number": ""
        };
        const component = shallow(<PatientForm data={data} error={error}/>);
        expect(component.find('.patient-error')).toHaveLength(1);
        expect(component.find('.patient-error-msg').text()).toEqual("Unknown error!");
    });

    it('Render delete button', () => {
        const error = {error: false, error_msg: ""};
        const data = {
            "name": "",
            "surname": "",
            "patronymic": "",
            "gender": "male",
            "birthday": "",
            "address": "",
            "oms_number": ""
        };
        const component = shallow(<PatientForm data={data} error={error} handleDelete={function () {
        }}/>);
        expect(component.find('.delete')).toHaveLength(1);
    });

    it('Check buttons events', () => {
        const error = {error: false, error_msg: ""};
        const data = {
            "name": "Polina",
            "surname": "Na",
            "patronymic": "Andreevna",
            "gender": "female",
            "birthday": "2003-09-26",
            "address": "Orenburg",
            "oms_number": "1437057950585920"
        };
        const handleSubmit = jest.fn();
        const handleDelete = jest.fn();
        const component = shallow(<PatientForm data={data} error={error} handleSubmit={handleSubmit}
                                               handleDelete={handleDelete}/>);
        component.find('form').simulate('submit');
        expect(handleSubmit).toHaveBeenCalledTimes(1);
        component.find('button').at(1).simulate('click');
        expect(handleDelete).toHaveBeenCalledTimes(1);
    });
});
