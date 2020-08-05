import React from "react";
import Spinner from "../components/Spinner/Spinner";

function HomePage({ user: { isLoading, error, user } }) {
  const spinner = isLoading ? <Spinner /> : null;
  const hello = !isLoading && !error ? <div>Hello, {user.name}!</div> : null;
  return (
    <div className="homepage">
      {spinner} {hello}
    </div>
  );
}

export default HomePage;
