module.exports = {
	entry: [
		'./src/main.js'
	],
	mode: "development",
	output: {
		filename: 'build.js'
	},
	module: {
		rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            }
		]
	}
};