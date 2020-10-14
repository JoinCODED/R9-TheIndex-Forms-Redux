import React from "react";
import { Link } from "react-router-dom";

import hipster1 from "./assets/hipster1.jpg";
import hipster2 from "./assets/hipster2.jpg";
import hipster3 from "./assets/hipster3.jpg";

const placeholders = [hipster1, hipster2, hipster3];

const AuthorCard = ({ author }) => (
  <div className="col-lg-4 col-md-6 col-12">
    <Link to={`/authors/${author.id}`} className="card">
      <div className="image">
        <img
          onError={(e) =>
            (e.target.src =
              placeholders[Math.floor(Math.random() * placeholders.length)])
          }
          className="card-img-top img-fluid"
          src={author.imageUrl}
          alt={author.first_name + " " + author.last_name}
        />
      </div>
      <div className="card-body">
        <h5 className="card-title">
          <span>{author.first_name + " " + author.last_name}</span>
        </h5>
        <small className="card-text">{author.books.length} books</small>
      </div>
    </Link>
  </div>
);

export default AuthorCard;
