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
  box-shadow: 0 3px 25px -3px rgba(50, 50, 73, 0.4), 0 3px 3px -3px rgba(50, 50, 73, 0.3);
  backface-visibility: hidden;
`;
