import { Tool } from "./ToolSet";

export class SliderTool extends Tool {
  constructor(opts) {
    super(opts);
    this.handler = opts.handler;
    this.min = opts.min || 1;
    this.max = opts.max || 100;
  }
  inputHandler(event) {
    this.handler(Number(event.target.value));
  }
  render() {
    const slider = document.createElement("input");
    slider.setAttribute("type", "range");
    slider.setAttribute("min", String(this.min));
    slider.setAttribute("max", String(this.max));
    slider.setAttribute("step", "0.01");
    slider.setAttribute("value", this.val);
    slider.setAttribute("id", this.id);
    const boundInputHandler = this.inputHandler.bind(this);
    slider.addEventListener("input", boundInputHandler);
    return slider;
  }
  destroy() {
    // TODO: Clean up element
  }
}
