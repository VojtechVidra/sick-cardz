import React, { useState } from "react";
import { Card } from "./components/Card";
import { GlobalStyle } from "./styles/GlobalStyle";
import styled from "styled-components";
import { Cards } from "./types/cards";

const Container = styled.div`
  padding: 20px;
  position: relative;
  width: 100vw;
  height: 100vh;
  perspective: 2000px;
`;

const keys = Object.keys(Cards).filter(k => !/B$/.test(k));

export const App: React.FC = () => {
  const [zIndexOrder, setZindexOrder] = useState<string[]>(keys);

  const handleMouseDown = (_e: React.MouseEvent<HTMLDivElement>, cardKey: string) => {
    const cardIndex = zIndexOrder.indexOf(cardKey);
    const newOrder = [
      cardKey,
      ...zIndexOrder.slice(0, cardIndex),
      ...zIndexOrder.slice(cardIndex + 1, zIndexOrder.length)
    ];
    setZindexOrder(newOrder);
  };

  const zIndexOrderMap = new Map(zIndexOrder.map((k, i) => [k, i]));

  return (
    <Container>
      {keys.map((k, i) => {
        const currentZIndex = zIndexOrderMap.get(k);
        return (
          <Card
            key={k}
            style={{ zIndex: zIndexOrder.length - currentZIndex }}
            stackIndex={i}
            cardType={Cards[k]}
            width={200}
            onMouseDown={e => handleMouseDown(e, k)}
          />
        );
      })}

      <GlobalStyle />
    </Container>
  );
};
