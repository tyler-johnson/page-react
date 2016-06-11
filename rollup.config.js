import babel from "rollup-plugin-babel";
import json from "rollup-plugin-json";

export default {
	onwarn: ()=>{},
	format: "cjs",
	plugins: [
		json(),
		babel({
			exclude: [ "node_modules/**" ],
			include: [ "src/**", "test/**" ],
			presets: [ "es2015-rollup", "react" ],
			plugins: [ "transform-object-rest-spread" ]
		})
	]
};
