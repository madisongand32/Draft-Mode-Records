import React from "react";
import ComponentResolver from "./componentResolver";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ReferenceFieldMapper({ fields }: { fields: any }) {
  if (Array.isArray(fields) && fields.length > 0) {
    return (
      <>
        {fields.map((field, fx) => (
          <ComponentResolver
            key={`key-${field?.sys?.id}-${fx}`}
            field={field}
          />
        ))}
      </>
    );
  }

  return <>none</>;
}

export default ReferenceFieldMapper;
