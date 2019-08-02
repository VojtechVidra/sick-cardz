import styled from "styled-components";
import { animated } from "react-spring/web";

interface Props {
  height: number;
  width: number;
}

export const CardContainer = styled(animated.div)<Props>`
  cursor: pointer;
  position: absolute;
  height: ${({ height }) => `${height}px`};
  width: ${({ width }) => `${width}px`};
  perspective: 1000px;
`;
