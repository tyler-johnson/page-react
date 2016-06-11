import React from "react";
import {findDOMNode} from "react-dom";
import {findRenderedComponentWithType as findByType} from "react-addons-test-utils";
import test from "tape";
import pageReact from "../src/index";
import page from "page";

function resetPage() {
	page.callbacks = [];
	page.exits = [];
	page.current = '';
	page.len = 0;
}

test("renders layout into element", (t) => {
	t.plan(1);

	const div = document.createElement("div");
	const Layout = React.createClass({
		render() {
			return <div></div>;
		}
	});

	resetPage();
	page(pageReact(div, Layout));
	page(function(ctx) {
		const layout = ctx.render();
		const el = findDOMNode(layout);
		t.ok(div.contains(el), "layout element is in the div container");
	});

	page.show("/", {}, true, false);

	t.end();
});

test("renders layout into selector", (t) => {
	t.plan(1);

	const div = document.createElement("div");
	div.classList.add("test-class");
	document.body.appendChild(div);

	const Layout = React.createClass({
		render() {
			return <div></div>;
		}
	});

	resetPage();
	page(pageReact(".test-class", Layout));
	page(function(ctx) {
		const layout = ctx.render();
		const el = findDOMNode(layout);
		t.ok(div.contains(el), "layout element is in the div container");
	});

	page.show("/", {}, true, false);

	document.body.removeChild(div);
	t.end();
});

test("renders with layout children", (t) => {
	t.plan(1);

	const div = document.createElement("div");
	const Layout = React.createClass({
		propTypes: {
			children: React.PropTypes.any
		},
		render() {
			return <div>{this.props.children}</div>;
		}
	});

	const Body = React.createClass({
		render() {
			return <span></span>;
		}
	});

	resetPage();
	page(pageReact(div, Layout));
	page(function(ctx) {
		const layout = ctx.render(<Body />);
		const body = findByType(layout, Body);
		const el = findDOMNode(body);
		t.ok(div.contains(el), "body element is in the div container");
	});

	page.show("/", {}, true, false);

	t.end();
});

test("accepts layout default props", (t) => {
	t.plan(1);

	const div = document.createElement("div");
	const defaults = { foo: "bar" };

	const Layout = React.createClass({
		render() {
			t.ok(Object.keys(defaults).every((key) => {
				return this.props[key] === defaults[key];
			}), "props has default values");

			return <div></div>;
		}
	});

	resetPage();
	page(pageReact(div, Layout, defaults));
	page(function(ctx) {
		ctx.render();
	});

	page.show("/", {}, true, false);

	t.end();
});

test("render() accepts layout props", (t) => {
	t.plan(1);

	const div = document.createElement("div");
	const props = { foo: "bar" };

	const Layout = React.createClass({
		render() {
			t.ok(Object.keys(props).every((key) => {
				return this.props[key] === props[key];
			}), "props has render values");

			return <div></div>;
		}
	});

	resetPage();
	page(pageReact(div, Layout));
	page(function(ctx) {
		ctx.render(null, props);
	});

	page.show("/", {}, true, false);

	t.end();
});
