import React, { useEffect } from "react";

// Components
import BookTable from "./BookTable";
import Loading from "./Loading";
import AddBookButton from "./AddBookButton";

import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchAuthorDetail } from "./redux/actions";

const AuthorDetail = ({ author, getAuthor, loading }) => {
  const { authorID } = useParams();

  useEffect(() => {
    getAuthor(authorID);
  }, [authorID]);

  if (loading) {
    return <Loading />;
  } else {
    const authorName = `${author.first_name} ${author.last_name}`;
    return (
      <div className="author">
        <div>
          <h3>{authorName}</h3>
          <img
            src={author.imageUrl}
            className="img-thumbnail img-fluid"
            alt={authorName}
          />
        </div>
        <BookTable books={author.books} />
        <AddBookButton author={author} />
      </div>
    );
  }
};

const mapStateToProps = ({ authorState: { author, loading } }) => ({
  author,
  loading,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getAuthor: (authorID) => dispatch(fetchAuthorDetail(authorID)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthorDetail);
