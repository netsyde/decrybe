module.exports = {
	entry: [
		'./src/main.js'
	],
	mode: "development",
	output: {
		//path: path.resolve(__dirname, 'dist'),
		filename: 'build.js',
		publicPath: '/'
	},
	devServer: {
		historyApiFallback: true
	},
	module: {
		rules: [
            {
                test: /\.js$|jsx/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
			},
			{
				test: /\.(png|jpg|gif)$/,
				use: [
				  {
					loader: 'file-loader',
					options: {},
				  },
				],
			}
		]
	}
};