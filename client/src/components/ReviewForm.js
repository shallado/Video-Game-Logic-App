import React, { Component } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

export default class ReviewForm extends Component {
  handleSubmit = ({ review }) => {
    this.props.handleSubmit(review);
  };

  render() {
    const formInitialValues = {
      review: !!this.props.videoGameReviewsUserReview
        ? this.props.videoGameReviewsUserReview.reviews.review
        : !!this.props.userReviewsUserReview
        ? this.props.userReviewsUserReview.reviewInfo.review
        : '',
    };

    const formSchema = Yup.object({
      review: Yup.string().required('Required'),
    });

    return (
      <Formik
        initialValues={formInitialValues}
        validationSchema={formSchema}
        onSubmit={this.handleSubmit}
      >
        <Form className="review-page__form">
          <div className="review-page__form-input-container">
            <label htmlFor="review" className="review-page__form-input-label">
              Review :
            </label>
            <Field
              as="textarea"
              name="review"
              type="text"
              className="review-page__form-input review-page__form-input--review"
            />
            <ErrorMessage
              name="review"
              className="error-message"
              component="div"
            />
          </div>
          <div className="review-page__btn-container">
            <button type="submit" className="btn">
              {this.props.videoGameId ? 'Update' : 'Post'}
            </button>
          </div>
        </Form>
      </Formik>
    );
  }
}
