import React from "react";
import {shallow} from 'enzyme';
import PatientsList from "../components/PatientsList/PatientsList";


describe('Patients list', () => {
    it('Display patients', () => {
        const patients = [
            {
                "id": 11,
                "name": "Polina",
                "surname": "Na",
                "patronymic": "Andreevna",
                "gender": "female",
                "birthday": "2003-09-26",
                "address": "Orenburg",
                "oms_number": "1437057950585920"
            }
        ];
        const error = {error: false, error_msg: ""};
        const component = shallow(<PatientsList patients={patients} error={error}/>);
        expect(component.find('.patients-list-item')).toHaveLength(1);
        expect(component.find('.name').text()).toEqual("Polina");
        expect(component.find('.surname').text()).toEqual("Na");
        expect(component.find('.patronymic').text()).toEqual("Andreevna");
        expect(component.find('.gender').text()).toEqual("female");
        expect(component.find('.birthday').text()).toEqual("2003-09-26");
        expect(component.find('.oms-number').text()).toEqual("1437057950585920");
    });

    it("Display error", () => {
        const patients = [];
        const error = {
            error: true,
            error_msg: "Error! Could't get patients."
        };
        const component = shallow(<PatientsList patients={patients} error={error}/>);
        expect(component.find('.patients-list-error')).toHaveLength(1);
        expect(component.find('.patients-list-error').text()).toEqual("Error! Could't get patients.")
    });
});

