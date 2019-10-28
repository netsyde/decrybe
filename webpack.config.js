module.exports = {
	entry: [
		'./src/index.tsx'
	],
	mode: "development",
	output: {
		//path: __dirname + "/dist",
		path: __dirname + "/dist",
		filename: 'build.js',
		publicPath: __dirname + '/'
	},
	resolve: {
		extensions: ['.js', '.jsx', '.ts', '.tsx']
	  },
	devServer: {
		historyApiFallback: true,
		//contentBase: './',
   		hot: false
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
				test: /\.(png|jpg|gif|svg|ico)$/,
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
			{
				test: /\.s[ac]ss$/i,
				use: [
				  // Creates `style` nodes from JS strings
				  'style-loader',
				  // Translates CSS into CommonJS
				  'css-loader',
				  // Compiles Sass to CSS
				  'sass-loader',
				],
			  },
		]
	}
};