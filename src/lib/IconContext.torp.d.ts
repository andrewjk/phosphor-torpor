import type { Component } from "@torpor/view";
import type { IconContextProps } from "./shared";

/**
 *
 * @example
 * ```torpor
 * <IconContext
 *   values={{
 *     color: "white",
 *     weight: "fill",
 *     size: "20px",
 *     mirrored: false
 *   }}
 * >
 *   <Acorn />
 * </IconContext>
 * ```
 */
declare const IconContext: Component<IconContextProps, {}, "">;
type IconContext = ReturnType<typeof IconContext>;
export default IconContext;
