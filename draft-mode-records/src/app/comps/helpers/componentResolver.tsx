import React from "react";
import dynamic from "next/dynamic";

// Dynamically import components based on content type
const componentMap: Record<string, React.ComponentType<unknown>> = {
  duplexComponent: dynamic(() => import("../duplex")),
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ComponentResolver = React.forwardRef((props: any, ref) => {
  const { field } = props;
  const contentType = field?.sys?.contentType?.sys?.id;

  // Resolve the component based on content type
  const Component = componentMap[contentType];
  if (!Component) {
    console.warn(`No component found for content type: ${contentType}`);
    return null;
  }

  return (
    <div className="max-h-fit">
      <Component {...field} {...props} ref={ref} />
    </div>
  );
});

ComponentResolver.displayName = "ComponentResolver";
export default ComponentResolver;
