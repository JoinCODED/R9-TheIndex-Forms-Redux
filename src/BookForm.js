import React, { useState, useEffect } from "react";

// Redux
import { connect } from "react-redux";
import { resetErrors, postBook } from "./redux/actions";

const BookForm = ({ author, errors, resetErrors, closeModal }) => {
  const [book, setBook] = useState({
    title: "",
    color: "",
    authors: [author.id],
  });

  useEffect(() => {
    return () => {
      if (errors.length) resetErrors();
    };
  }, []); // Component Will unmount

  const submitAuthor = (event) => {
    event.preventDefault();
    submitBook(book, closeModal);
  };

  const handleChange = (e) =>
    setBook({ ...book, [e.target.name]: e.target.value });

  const errors = errors;

  return (
    <div className="mt-5 p-2">
      <form onSubmit={submitAuthor}>
        {!!errors.length && (
          <div className="alert alert-danger" role="alert">
            {errors.map((error) => (
              <p key={error}>{error}</p>
            ))}
          </div>
        )}
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text">Title</span>
          </div>
          <input
            type="text"
            className="form-control"
            name="title"
            onChange={handleChange}
          />
        </div>
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text">Color</span>
          </div>
          <input
            type="text"
            className="form-control"
            name="color"
            onChange={handleChange}
          />
        </div>
        <input type="submit" />
      </form>
    </div>
  );
};

const mapStateToProps = ({ errorsState: { errors } }) => ({ errors });

const mapDispatchToProps = (dispatch) => {
  return {
    resetErrors: () => dispatch(resetErrors()),
    submitBook: (book, closeModal) => dispatch(postBook(book, closeModal)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookForm);
