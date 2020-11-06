import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { hideModal } from '../actions/modal';
import { setUserReviews } from '../actions/review';

class ReviewForm extends Component {
  handleSubmit = (review) => {
    const reviewInfo = {
      ...review,
      username: this.props.user.username,
    };

    this.props.handleSubmit(reviewInfo);
    this.props.hideModal();
  };

  render() {
    const formInitialValues = {
      title: this.props.currentGame.name,
      review: '',
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
        <Form className="add-review-modal__form">
          <div className="add-review-modal__form-input-container">
            <label
              htmlFor="review"
              className="add-review-modal__form-input-label"
            >
              Review :
            </label>
            <Field
              as="textarea"
              name="review"
              type="text"
              className="add-review-modal__form-input add-review-modal__form-input--review"
            />
            <ErrorMessage
              name="review"
              className="error-message"
              component="div"
            />
          </div>
          <div className="add-review-modal__btn-container">
            <button type="submit" className="btn">
              Post
            </button>
          </div>
        </Form>
      </Formik>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  currentGame: state.game.currentGame,
});

const mapDispatchToProps = (dispatch) => ({
  hideModal: () => dispatch(hideModal('addReviewModal')),
  setUserReviews: (review) => dispatch(setUserReviews([review])),
});

export default connect(mapStateToProps, mapDispatchToProps)(ReviewForm);
