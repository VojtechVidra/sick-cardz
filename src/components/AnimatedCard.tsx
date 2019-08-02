import { animated } from "react-spring/web";
import styled from "styled-components";

interface Props {
  width: number;
  height: number;
  backgroundimageurl: string;
  style?: React.CSSProperties;
  borderRadius?: number;
}

export const AnimatedCard = styled(animated.div)<Props>`
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  background-image: ${({ backgroundimageurl }) => `url(${backgroundimageurl})`};
  background-size: cover;
  background-repeat: no-repeat;
  position: absolute;
  border-radius: ${({ borderRadius }) => `${borderRadius}px`};
  box-shadow: 0 12.5px 100px -10px rgba(50, 50, 73, 0.4), 0 10px 10px -10px rgba(50, 50, 73, 0.3);
`;
