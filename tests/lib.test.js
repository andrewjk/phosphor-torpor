// @vitest-environment jsdom

import { mount } from "@torpor/view";
import { afterEach, describe, expect, it, vi } from "vitest";
import { getByRole } from "@testing-library/dom";
import Circle from "../lib/Circle.torp";
import Rectangle from "../lib/Rectangle.torp";
import ContextTest from "./__fixtures__/ContextTest.torp";

describe("component", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should render", () => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    mount(container, Circle);

    const svg = getByRole(container, "img");
    expect(svg).toBeInTheDocument();
  });

  it("should accept props", async () => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    mount(container, Circle, {
      color: "black",
      size: "5em",
      mirrored: true,
    });

    const icon = getByRole(container, "img");
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute("fill", "black");
    expect(icon).toHaveAttribute("width", "5em");
    expect(icon).toHaveAttribute("height", "5em");
    expect(icon).toHaveAttribute("fill", "black");
    expect(icon).toHaveAttribute("transform", "scale(-1, 1)");
  });

  it("should render weight properly", () => {
    const boldPath = `<path d="M216,36H40A20,20,0,0,0,20,56V200a20,20,0,0,0,20,20H216a20,20,0,0,0,20-20V56A20,20,0,0,0,216,36Zm-4,160H44V60H212Z"/>`;

    const container = document.createElement("div");
    document.body.appendChild(container);
    mount(container, Rectangle, { weight: "bold" });

    const icon = getByRole(container, "img");

    expect(icon).toContainHTML(boldPath);
  });

  it("should log error for unsupported weight", () => {
    vi.spyOn(console, "error").mockImplementation(() => {});

    const container = document.createElement("div");
    document.body.appendChild(container);
    mount(container, Circle, {
      weight: "aaa",
    });

    const icon = getByRole(container, "img");

    expect(icon).toBeInTheDocument();
    expect(console.error).toHaveBeenCalled();
  });

  it("should render slot", () => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    mount(container, Circle, undefined, {
      _: (parent, anchor) => {
        const title = document.createElement("title");
        title.appendChild(document.createTextNode("the circle"));
        parent.insertBefore(title, anchor);
      },
    });

    const icon = getByRole(container, "img");

    expect(icon).toContainHTML(`<title>the circle</title>`);
  });

  it("should accept props from context", () => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    mount(container, ContextTest, {
      values: { color: "red" },
    });

    let icon = getByRole(container, "img");

    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute("fill", "red");
  });
});
