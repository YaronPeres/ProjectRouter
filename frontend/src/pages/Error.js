import { useRouteError } from "react-router-dom";
import React from "react";
import PageContent from "../components/PageContent";

function Error() {
  const error = useRouteError();
  console.log(error.message);
  let title = "An error occoured!";
  let message = "Something went wrong!";
  if (error.status === 500) {
    // message = JSON.parse(error.data).message;
    message = error.data.message;
  }
  if (error.status === 404) {
    title = "Not found";
    message = "Could not find resource or page.";
  }
  return (
    <PageContent title={title}>
      <p>{message}</p>
    </PageContent>
  );
}

export default Error;
