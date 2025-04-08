//import { getContext, hasContext, setContext } from "svelte";

let contextKey = Symbol("phosphor-torpor");

export function setIconContext($context, value) {
  $context[contextKey] = value;
}

/**
 *
 * @returns {import("./shared").IconContextProps["values"]}
 */
export function getIconContext($context) {
  return ($context && $context[contextKey]) ?? {};
}
