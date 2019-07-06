import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import SurveyField from './SurveyField';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import validateEmails from '../../utils/validateEmails';
import FIELDS from '../surveys/surveyConfig';

class SurveyForm extends Component {
    renderFields() {
        return _.map(FIELDS, ({ label, name }) => {
            return (
                <Field key={name} type="text" label={label} name={name} component={SurveyField} />
            )
        });
    }
    render() {
        return(
            <div> 
                <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
                {this.renderFields()}
                <Link to="/surveys" className="red btn-flat white-text">Cancel</Link>
                <button className="teal btn-flat right white-text" type="submit">
                    Submit
                    <i className="material-icons">done</i>
                </button>
                </form>
            
            </div>
        );
    }
}

function validate(values) {
    const errors = {};

    errors.recipients = validateEmails(values.recipients || '');

    _.each(FIELDS, ({name}) => {
        if(!values[name]) {
            errors[name] = "You must provide the " + name;
        }
    });
    return errors;
}
export default reduxForm({
    validate,
    form: 'surveyForm',
    destroyOnUnmount: false
})(SurveyForm);