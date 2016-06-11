import ReactDOM from "react-dom";
import React from "react";

export default function(target, Layout, props={}) {
  let mainEl;
  if (target && target.nodeType === 1) {
    mainEl = target;
  } else if (typeof target === "string") {
    mainEl = document.querySelector(target);
  } else {
    throw new Error("Expecting element or string for render target");
  }

  return function(ctx, next) {
    // scroll back to top when route changes
    document.body.scrollTop = 0;

    // method to render a view on the page
    ctx.render = function(bodyView, layoutProps) {
      const p = { ...props, ...layoutProps };
      return ReactDOM.render(React.createElement(Layout, p, bodyView), mainEl);
    };

    next();
  };
}
