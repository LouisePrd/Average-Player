import React from "react";

export function ErrorMessage({ error }) {
  return <div>Error: {error.message}</div>;
}
