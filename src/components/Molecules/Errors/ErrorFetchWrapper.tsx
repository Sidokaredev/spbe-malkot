import React from "react";

export default function ErrorFetchWrapper({
  errorFetch,
  ErrorElement,
  children,
}: {
  errorFetch: { status: boolean; detail: string };
  ErrorElement: React.ReactElement;
  children: React.ReactNode;
}) {
  return errorFetch.status ? ErrorElement : children;
}
