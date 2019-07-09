import React from 'react';

export const PullSVG = ({ height = 16, fill = 'currentcolor' }) => (
  <svg height={height} viewBox={`0 0 13 16`}>
    <path
      fill={fill}
      d="M8.133 3.303l.605.625a.74.74 0 0 1 0 1.022.685.685 0 0 1-.99 0l-1.8-1.858a.74.74 0 0 1 0-1.022l1.8-1.858a.685.685 0 0 1 .99 0 .74.74 0 0 1 0 1.022l-.605.624H10c.718 0 1.3.6 1.3 1.342v7.952c.984.31 1.7 1.254 1.7 2.37C13 14.892 11.925 16 10.6 16s-2.4-1.11-2.4-2.477c0-1.117.716-2.062 1.7-2.37v-7.85H8.133zM3.1 4.951v6.201c.984.31 1.7 1.254 1.7 2.37C4.8 14.892 3.725 16 2.4 16S0 14.89 0 13.523c0-1.117.716-2.062 1.7-2.37V4.95C.716 4.641 0 3.698 0 2.581 0 1.212 1.075.103 2.4.103s2.4 1.11 2.4 2.478c0 1.117-.716 2.06-1.7 2.37zm-.7-1.338c.552 0 1-.462 1-1.032 0-.57-.448-1.033-1-1.033s-1 .463-1 1.033c0 .57.448 1.032 1 1.032zm0 10.942c.552 0 1-.462 1-1.032 0-.57-.448-1.033-1-1.033s-1 .462-1 1.033c0 .57.448 1.032 1 1.032zm8.2 0c.552 0 1-.462 1-1.032 0-.57-.448-1.033-1-1.033s-1 .462-1 1.033c0 .57.448 1.032 1 1.032z"
    />
  </svg>
);
