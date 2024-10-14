import { FC } from 'react';

interface CustomLogoIconProps {
  fillColor?: string;
  primalStrokeColor?: string;
  secondaryStrokeColor?: string;
  width?: number;
  height?: number;
  className?: string;
}

const CustomLogoIcon: FC<CustomLogoIconProps> = ({
  fillColor = '#000',
  primalStrokeColor = '#000',
  secondaryStrokeColor = '#15b45d',
  width = 32,
  height = 32,
  className = '',
}) => {
  return (
    <svg
      fill={fillColor}
      width={width}
      height={height}
      className={className}
      viewBox="0 0 24 24"
      id="note-alt"
      data-name="Line Color"
    >
      <path
        id="secondary"
        d="M14,6H10A1,1,0,0,1,9,5V4a1,1,0,0,1,1-1h4a1,1,0,0,1,1,1V5A1,1,0,0,1,14,6ZM9,11h6M9,15h6"
        style={{
          fill: 'none',
          stroke: secondaryStrokeColor,
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          strokeWidth: 2,
        }}
      ></path>
      <path
        id="primary"
        d="M18,4a1,1,0,0,1,1,1V20a1,1,0,0,1-1,1H6a1,1,0,0,1-1-1V5A1,1,0,0,1,6,4"
        style={{
          fill: 'none',
          stroke: primalStrokeColor,
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          strokeWidth: 2,
        }}
      ></path>
    </svg>
  );
};

export default CustomLogoIcon;
