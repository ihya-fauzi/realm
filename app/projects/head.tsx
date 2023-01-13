import { NextSeo } from "next-seo";
import { getProps, indexFollow } from "next-seo.config";

export default function Head() {
  return (
    <NextSeo
      useAppDir={true}
      {...indexFollow()}
      {...getProps({
        title: "Projects",
        desc: "Projects I made.",
        path: "/projects",
      })}
    />
  );
}
