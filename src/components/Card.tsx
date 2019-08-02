import React, { useState } from "react";
import { useSpring, interpolate } from "react-spring";
import { useDrag } from "react-use-gesture";
import { AnimatedCard } from "./AnimatedCard";
import { CardContainer } from "./CardContainer";
import { Cards } from "../types/cards";
import { getClientCors } from "../lib/utils";

interface Props {
  cardType?: Cards;
  width?: number;
  stackIndex?: number;
  onMouseDown?: (e: React.MouseEvent<HTMLDivElement>) => void;
  style?: React.CSSProperties;
}

export const Card: React.FC<Props> = ({ cardType = Cards.CARD_2H, width = 40, stackIndex = 0, style, onMouseDown }) => {
  const height = width * 1.4;
  const borderRadius = width / 20;

  const [folded, setFolded] = useState<boolean>(false);
  const [mouseStart, setMouseStart] = useState<[number, number]>([0, 0]);
  const [draging, setDraging] = useState<boolean>(false);

  const { rotateY } = useSpring({ rotateY: folded ? 180 : 0 });
  const { rotateX } = useSpring({ rotateX: draging ? 0 : 20 });

  const [{ xy }, set] = useSpring(() => ({
    xy: [0, 0],
    config: { tension: 5000, friction: 60 }
  }));

  const { onMouseDown: bindMouseDown, onMouseUp: bindMouseUp, ...bindEvents } = useDrag(
    ({ delta: [x, y], memo = xy.getValue() }) => {
      set({ xy: [x + memo[0], y + memo[1]] });
      return memo;
    }
  )();

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    bindMouseDown && bindMouseDown(e);
    onMouseDown && onMouseDown(e);
    setDraging(true);
    const [x, y] = getClientCors(e.nativeEvent);
    setMouseStart([x, y]);
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
    bindMouseUp && bindMouseUp(e);
    setDraging(false);
    const [x, y] = getClientCors(e.nativeEvent);
    if (mouseStart[0] === x && mouseStart[1] === y) {
      setFolded(prev => !prev);
    }
  };

  return (
    <CardContainer
      {...bindEvents}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      height={height}
      width={width}
      style={{
        ...style,
        transform: interpolate(
          // @ts-ignore
          [xy, rotateX],
          ([x, y], r) =>
            `translate(${x}px, ${y}px) rotateX(${r}deg) rotateZ(${stackIndex - 5}deg) translateZ(${stackIndex * 5}px)`
        )
      }}
    >
      <AnimatedCard
        width={width}
        height={height}
        borderRadius={borderRadius}
        backgroundimageurl={`/card-svg/${cardType}.svg`}
        style={{
          transform: rotateY.interpolate(r => `rotateY(${r}deg)`)
        }}
      />
      <AnimatedCard
        width={width}
        height={height}
        borderRadius={borderRadius}
        backgroundimageurl={`/card-svg/${Cards.CARD_RB}.svg`}
        style={{
          transform: rotateY.interpolate(r => `rotateY(${r - 180}deg) translateZ(.5px)`),
          backfaceVisibility: "hidden"
        }}
      />
    </CardContainer>
  );
};
