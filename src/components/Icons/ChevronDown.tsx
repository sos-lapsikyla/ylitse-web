import type { Color } from '../variables';

type Props = {
  size: number;
  color: Color;
};
export const ChevronDown: React.FC<Props> = ({ size, color }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 10 6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.292893 0.292893C0.683418 -0.0976314 1.31658 -0.0976314 1.70711 0.292893L5 3.58579L8.29289 0.292893C8.68342 -0.0976314 9.31658 -0.0976314 9.70711 0.292893C10.0976 0.683417 10.0976 1.31658 9.70711 1.70711L5.70711 5.70711C5.51957 5.89464 5.26522 6 5 6C4.73478 6 4.48043 5.89464 4.29289 5.70711L0.292893 1.70711C-0.097631 1.31658 -0.097631 0.683417 0.292893 0.292893Z"
        fill={color}
      />
    </svg>
  );
};