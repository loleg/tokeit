/**
 *
 * @param {*} opts Tools options object
 * @param {deckgl} opts.toolsContainer Tools container element
 *
 */
export function ToolBar(opts) {
  this.toolsContainer = opts.toolsContainer;
}

ToolBar.prototype.stub = function () {
  console.log(this.mapState);
};

/**
 *
 * @param {*} Tool
 */
ToolBar.prototype.addTool = function (tool) {
  tool.toolBar = this;
  const toolElement = tool.render();
  // TODO: Register tool
  this.toolsContainer.appendChild(toolElement);
};

ToolBar.prototype.removeTool = function (tool) {
  console.log("Stub not yet implemented.");
};

export function Tool(opts) {
  this.id = opts.id;
}

Tool.prototype.render = function () {
  const baselineTool = document.createElement("h4");
  baselineTool.innerText = "BaselineTool";
  return baselineTool;
};
