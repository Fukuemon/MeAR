import dynamic from "next/dynamic";

export const DynamicModelViewer = dynamic(() => import("./index"), {
  ssr: false,
});
