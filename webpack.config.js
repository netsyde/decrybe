module.exports = {
	entry: [
		'./src/index.tsx'
	],
	mode: "development",
	output: {
		//path: path.resolve(__dirname, 'dist'),
		filename: 'build.js',
		publicPath: '/'
	},
	resolve: {
		extensions: ['.js', '.jsx', '.ts', '.tsx']
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
				test: /\.(png|jpg|gif|svg)$/,
				use: [
				  {
					loader: 'file-loader',
					options: {},
				  },
				],
			},
			{
				test: /(\.ts|\.tsx)$/, 
				loaders: ["ts-loader"],
				//include: [path.join(__dirname, "src"), path.join(__dirname, "data")] 
			  },
		]
	}
};