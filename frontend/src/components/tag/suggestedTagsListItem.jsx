import React from "react";
import {Link} from "react-router-dom";

const SuggestedTagsListItem = ({tag}) => {
  const {name} = tag;
  return (
    <li className="list-group-item py-4 px-3">
      <div className="d-flex align-items-center">
        <div className="ml-2 text-truncate">
          <div className="text-truncate">
            <Link to={`/tag/${name}`}>#{name}</Link>
          </div>
        </div>
      </div>
    </li>
  );
};

export default SuggestedTagsListItem;
