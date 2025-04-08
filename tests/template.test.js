import { componentTemplate, definitionsTemplate } from "../scripts/template.js";
import { describe, it, expect } from "vitest";

describe("componentTemplate", () => {
  it("should generate component", () => {
    const icon = [
      {
        weight: "regular",
        svgPath: `<path d="M216,136H40a8,8,0,0,1,0-16H216a8,8,0,0,1,0,16Z"/>`,
      },
      {
        weight: "thin",
        svgPath: `<path d="M216,132H40a4,4,0,0,1,0-8H216a4,4,0,0,1,0,8Z"/>`,
      },
    ];

    const result = componentTemplate(icon);
    expect(result).toEqual(`/*-- GENERATED FILE --*/
import type { IconComponentProps } from "./shared.d.ts";
import { getIconContext } from "./context";

export default function Icon() {
  const ctx = getIconContext($context);

  //let { children, ...props }: IconComponentProps = $props ?? {};
  let props = $props ?? {};

  let weight = (props.weight ?? ctx.weight ?? "regular");
  let color = (props.color ?? ctx.color ?? "currentColor");
  let size = (props.size ?? ctx.size ?? "1em");
  let mirrored = (props.mirrored ?? ctx.mirrored ?? false);

  function svgAttr(obj: IconComponentProps) {
    let { weight, color, size, mirrored, ...attrs } = obj;
    return attrs;
  }

  @render {
    <svg
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      width={size}
      height={size}
      fill={color}
      transform={mirrored ? "scale(-1, 1)" : undefined}
      viewBox="0 0 256 256"
      @/* {...svgAttr(ctx)}
      {...svgAttr(props)} */
    >
      <:slot />
      <rect width="256" height="256" fill="none" />
      @if (weight === "regular") {
        <path d="M216,136H40a8,8,0,0,1,0-16H216a8,8,0,0,1,0,16Z"/>
      } else if (weight === "thin") {
        <path d="M216,132H40a4,4,0,0,1,0-8H216a4,4,0,0,1,0,8Z"/>
      } else {
        @console.error('Unsupported icon weight. Choose from "thin", "light", "regular", "bold", "fill", or "duotone".')
      }
    </svg>
  }
}`);
  });
});

describe("definitionsTemplate", () => {
  it("should generate ts definition", () => {
    const components = [{ name: "Minus" }, { name: "Plus" }];

    const result = definitionsTemplate(components);
    expect(result).toEqual(
      `export { default as IconContext } from "./IconContext.torp";
export { default as Minus } from "./Minus.torp";
export { default as Plus } from "./Plus.torp";
export type * from "./shared.d.ts";\n`
    );
  });
});
