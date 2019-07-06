import React, { Component } from 'react';
import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';
import { reduxForm } from 'redux-form';

class SurveyNew extends Component {
    state = { showFormReview: false }
    render() {
        if (this.state.showFormReview) {
            return (
                <SurveyFormReview onCancel={() => this.setState({showFormReview: false})}/>
            );
        } else {
            return (
                <SurveyForm onSurveySubmit={() => this.setState({showFormReview: true})}/>
            );
        }
    }
}

export default reduxForm({
    form: 'surveyForm'
  })(SurveyNew);