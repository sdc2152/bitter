import React from "react";
import {Link} from "react-router-dom";

const parseTags = body => {
  let tokens = body.split(/\s/);
  let contents = tokens.map((token, i) => {
    let hasSpace = i !== (tokens.length - 1);
    let maybeSpace = hasSpace ? " " : "";

    if (token.match(/^#\w+$/)) {
      return (
        <Link key={i} to={`/tag/${token.substr(1)}`}>
          {token + maybeSpace}
        </Link>
      );
    }
    else if (token.match(/^@\w+$/)) {
      return (
        <Link key={i} to={`/${token.substr(1)}`}>
          {token + maybeSpace}
        </Link>
      );
    }
    else {
      return token + maybeSpace;
    }
  });
  return contents;
};

const PostBody = ({children}) => {
  return (
    <div>
      <p>
        {parseTags(children)}
      </p>
    </div>
  );
};

export default PostBody;
