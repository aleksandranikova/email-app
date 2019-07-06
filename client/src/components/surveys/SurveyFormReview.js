import React from 'react';
import FIELDS from '../surveys/surveyConfig';
import _ from 'lodash';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../../actions';

const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history }) => {
    const reviewFields = _.map(FIELDS, ({ name, label }) => {
        return (
            <div key={name}>
                <label>{label}</label>
                <div>
                    {formValues[name]}
                </div>
            </div>
        );
    });

    return (
        <div>
            <h5>Please Confirm Your Entries</h5>
            {reviewFields}
            <button className="yellow darken-3 white-text btn-flat" onClick={onCancel}>Cancel</button>
            <button className="green btn-flat right white-text" onClick={() => submitSurvey(formValues, history)}>Send Survey
        <i className="material-icons right">email</i></button>
        </div>
    );

}

function mapStateToProps(state) {
    return { formValues: state.form.surveyForm.values };
}

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));