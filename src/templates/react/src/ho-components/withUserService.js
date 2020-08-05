import React from "react";
import { PlaceholderServiceConsumer } from "../contexts/PlaceholderServiceContext";

const withPlaceholderService = () => Wrapped => {
  return props => {
    return (
      <PlaceholderServiceConsumer>
        {placeholderService => {
          return <Wrapped {...props} placeholderService={placeholderService} />;
        }}
      </PlaceholderServiceConsumer>
    );
  };
};

export default withPlaceholderService;
