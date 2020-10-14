import React, { useState } from "react";
import { connect } from "react-redux";

// Components
import AddAuthorCard from "./AddAuthorCard";
import AuthorCard from "./AuthorCard";
import SearchBar from "./SearchBar";
import Loading from "./Loading";

const AuthorsList = ({ authors, loading }) => {
  const [query, setQeury] = useState("");

  const filterAuthors = () => {
    return authors.filter((author) => {
      return `${author.first_name} ${author.last_name}`
        .toLowerCase()
        .includes(query.toLowerCase());
    });
  };

  if (loading) return <Loading />;

  const authorCards = filterAuthors().map((author) => (
    <AuthorCard
      key={author.first_name + author.last_name + author.id}
      author={author}
    />
  ));

  return (
    <div className="authors">
      <h3>Authors</h3>
      <SearchBar onChange={setQeury} />
      <div className="row">
        <AddAuthorCard />
        {authorCards}
      </div>
    </div>
  );
};

const mapStateToProps = ({ authorsState: { authors, loading } }) => ({
  authors,
  loading,
});

export default connect(mapStateToProps)(AuthorsList);
