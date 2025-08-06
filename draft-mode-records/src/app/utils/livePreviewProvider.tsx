"use client";
import { ContentfulLivePreviewProvider } from "@contentful/live-preview/react";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  isEnabled: boolean;
};
const LivePreviewProvider = ({ children, isEnabled }: Props) => {
  return (
    <ContentfulLivePreviewProvider
      locale="en-US"
      enableInspectorMode={isEnabled}
      enableLiveUpdates={isEnabled}
    >
      {children}
    </ContentfulLivePreviewProvider>
  );
};

export default LivePreviewProvider;
