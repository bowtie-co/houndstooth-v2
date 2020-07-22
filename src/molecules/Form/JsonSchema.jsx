import React from 'react';
// import {
//   Container, Row, Col,
//   ListGroup, ListGroupItem
// } from 'reactstrap';
import Form from "@rjsf/core";

export const FormJsonSchema = ({ repos }) => {
  const schema = {
    title: "Todo",
    type: "object",
    required: ["title"],
    properties: {
      title: {type: "string", title: "Title", default: "A new task"},
      done: {type: "boolean", title: "Done?", default: false}
    }
  };

  const log = (type) => console.log.bind(console, type);

  return (
    <Form schema={schema}
        onChange={log("changed")}
        onSubmit={log("submitted")}
        onError={log("errors")} />
  );
};
