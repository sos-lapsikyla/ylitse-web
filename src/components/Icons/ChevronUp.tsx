import type { Color } from '../variables';

type Props = {
  size: number;
  color: Color;
};
export const ChevronUp: React.FC<Props> = ({ size, color }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 10 6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.70711 5.70708C9.31658 6.0976 8.68342 6.0976 8.29289 5.70708L5 2.41418L1.70711 5.70708C1.31658 6.0976 0.683417 6.0976 0.292892 5.70708C-0.097632 5.31655 -0.0976319 4.68339 0.292892 4.29286L4.29289 0.292862C4.48043 0.105326 4.73478 -3.10365e-05 5 -3.10103e-05C5.26522 -3.09842e-05 5.51957 0.105326 5.70711 0.292862L9.70711 4.29286C10.0976 4.68339 10.0976 5.31655 9.70711 5.70708Z"
        fill={color}
      />
    </svg>
  );
};