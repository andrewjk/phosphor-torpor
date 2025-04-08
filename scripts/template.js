// TODO: weight, color, size and mirrored were $derived

/**
 *
 * @param {{ weight: string, svgPath: string }[]} iconWeights
 * @returns
 */
export function componentTemplate(iconWeights) {
  let componentString = `/*-- GENERATED FILE --*/
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
${iconWeights
  .map(({ weight, svgPath }, i) => {
    const cond =
      i === 0
        ? `@if (weight === "${weight}") {`
        : `} else if (weight === "${weight}") {`;
    return `      ${cond}\n        ${svgPath.trim()}\n`;
  })
  .join("")}      } else {
        @console.error('Unsupported icon weight. Choose from "thin", "light", "regular", "bold", "fill", or "duotone".')
      }
    </svg>
  }
}`;

  return componentString;
}

export function definitionsTemplate(components) {
  let str = `export { default as IconContext } from "./IconContext.torp";\n`;

  components.forEach((cmp) => {
    str += `export { default as ${cmp.name} } from "./${cmp.name}.torp";\n`;
  });

  str += `export type * from "./shared.d.ts";\n`;

  return str;
}

export function componentDefinitionTempalte(componentName) {
  return `import type { Component } from "@torpor/view";
import type { IconComponentProps } from "./shared.d.ts";

/**
 *
 * @example
 * \`\`\`torpor
 * <${componentName} color="white" weight="fill" size="20px" mirrored={false} />
 * \`\`\`
 *
 * @prop {string} color
 * @prop {number | string} size
 * @prop {"bold" | "duotone" | "fill" | "light" | "thin" | "regular"} weight
 * @prop {boolean} mirrored
 */
declare const ${componentName}: Component<IconComponentProps, {}, "">;
type ${componentName} = ReturnType<typeof ${componentName}>;
export default ${componentName};\n`;
}

export function moduleTemplate(components) {
  let str = "export { default as IconContext } from './IconContext.torp';\n";

  components.forEach((cmp) => {
    str += `export { default as ${cmp.name} } from './${cmp.name}.torp';\n`;
  });

  return str;
}
