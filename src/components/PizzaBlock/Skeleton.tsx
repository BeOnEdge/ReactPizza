import React from "react";
import ContentLoader from "react-content-loader";

export const Skeleton: React.FC = (props) => (
  <ContentLoader
    speed={2}
    width={280}
    height={465}
    viewBox='0 0 280 465'
    backgroundColor='#f3f3f3'
    foregroundColor='#ecebeb'
    {...props}
  >
    <circle cx='135' cy='120' r='120' />
    <rect x='0' y='267' rx='17' ry='17' width='280' height='30' />
    <rect x='0' y='316' rx='18' ry='18' width='281' height='88' />
    <rect x='0' y='416' rx='10' ry='10' width='82' height='45' />
    <rect x='128' y='415' rx='30' ry='30' width='152' height='45' />
  </ContentLoader>
);
