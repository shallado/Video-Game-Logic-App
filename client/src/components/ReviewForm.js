import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

class ReviewForm extends Component {
  handleSubmit = (review) => {
    const reviewInfo = {
      ...review,
      username: this.props.user.username,
    };

    this.props.handleSubmit(reviewInfo);
    this.props.handleCloseModal();
  };

  render() {
    const formInitialValues = {
      title: this.props.currentGame.name,
      review: '',
    };

    const formSchema = Yup.object({
      title: Yup.string().required('Required'),
      review: Yup.string().required('Required'),
    });

    return (
      <div>
        <Formik
          initialValues={formInitialValues}
          validationSchema={formSchema}
          onSubmit={this.handleSubmit}
        >
          <Form>
            <label htmlFor="title">Title</label>
            <Field name="title" type="text" disabled={true} />
            <ErrorMessage name="title" />
            <label htmlFor="review">Review</label>
            <Field as="textarea" name="review" type="text" />
            <ErrorMessage name="review" />
            <button type="submit">Post</button>
          </Form>
        </Formik>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  currentGame: state.game.currentGame,
});

export default connect(mapStateToProps)(ReviewForm);
