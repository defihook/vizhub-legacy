import React from 'react';

export const SearchSVG = ({ height = 20, fill = 'currentcolor' }) => {
  return (
    <svg height={height} viewBox="0 0 20 20">
      <path
        fill={fill}
        d="M14.3178 12.8978L19.7078 18.2978C19.8703 18.4902 19.9543 18.7369 19.9428 18.9886C19.9313 19.2402 19.8253 19.4783 19.6459 19.6552C19.4665 19.832 19.227 19.9347 18.9752 19.9426C18.7234 19.9505 18.4779 19.863 18.2878 19.6978L12.9078 14.3178C11.3005 15.5663 9.27772 16.1554 7.25139 15.9649C5.22505 15.7744 3.34749 14.8188 2.001 13.2926C0.654508 11.7664 -0.0596609 9.78441 0.00390671 7.75014C0.0674743 5.71587 0.903998 3.7823 2.34315 2.34315C3.7823 0.903998 5.71587 0.0674743 7.75014 0.00390671C9.78441 -0.0596609 11.7664 0.654508 13.2926 2.001C14.8188 3.34749 15.7744 5.22505 15.9649 7.25139C16.1554 9.27772 15.5663 11.3005 14.3178 12.9078V12.8978ZM7.99775 13.9978C9.58905 13.9978 11.1152 13.3656 12.2404 12.2404C13.3656 11.1152 13.9978 9.58905 13.9978 7.99775C13.9978 6.40646 13.3656 4.88033 12.2404 3.75511C11.1152 2.6299 9.58905 1.99775 7.99775 1.99775C6.40646 1.99775 4.88033 2.6299 3.75511 3.75511C2.6299 4.88033 1.99775 6.40646 1.99775 7.99775C1.99775 9.58905 2.6299 11.1152 3.75511 12.2404C4.88033 13.3656 6.40646 13.9978 7.99775 13.9978Z"
      />
    </svg>
  );
};
