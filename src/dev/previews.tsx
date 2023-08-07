import React from "react";
import { ComponentPreview, Previews } from "@react-buddy/ide-toolbox-next";
import { PaletteTree } from "./palette";
import Home from "~/pages";
import { Ticker } from "~/components/ticker";

const ComponentPreviews = () => {
  return (
    <Previews palette={<PaletteTree />}>
      <ComponentPreview path="/Home">
        <Home />
      </ComponentPreview>
      <ComponentPreview path="/Ticker">
        <Ticker ticker="AAPL" removeTicker={() => {}} />
      </ComponentPreview>
    </Previews>
  );
};

export default ComponentPreviews;
