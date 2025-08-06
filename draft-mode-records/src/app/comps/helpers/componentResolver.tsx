import React from "react";
import dynamic from "next/dynamic";

// Dynamically import components based on content type
const componentMap: Record<string, React.ComponentType<unknown>> = {
  duplexComponent: dynamic(() => import("../../artist/comps/duplex")),
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ComponentResolver = React.forwardRef((props: any, ref) => {
  const { field, getSectionInspectorProps, page, ...rest } = props;
  const contentType = field?.sys?.contentType?.sys?.id;

  // Resolve the component based on content type
  const Component = componentMap[contentType];
  if (!Component) {
    console.warn(`No component found for content type: ${contentType}`);
    return null;
  }

  const inspectorProps = getSectionInspectorProps
    ? getSectionInspectorProps({
        entryId: field.sys.id,
        fieldId: "internalName",
      })
    : () => ({});

  const artistInspectorProps = getSectionInspectorProps
    ? getSectionInspectorProps({
        entryId: page.artist,
        fieldId: "internalName",
      })
    : () => ({});

  return (
    <div className="max-h-fit">
      <Component
        {...field}
        duplexInspectorProps={inspectorProps}
        artistInspectorProps={artistInspectorProps}
        page={page}
        {...rest}
        ref={ref}
      />
    </div>
  );
});

ComponentResolver.displayName = "ComponentResolver";
export default ComponentResolver;
