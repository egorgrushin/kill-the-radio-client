const path = require('path');

const EVENT = process.env.npm_lifecycle_event || '';

// Helper functions
const ROOT = path.resolve(__dirname, '../.');
const SOURCE_ROOT = path.resolve(__dirname, '../src');

exports.hasProcessFlag = (flag) => {
	return process.argv.join('').indexOf(flag) > -1;
};

exports.hasNpmFlag = (flag) => {
	return EVENT.includes(flag);
};

exports.isWebpackDevServer = () => {
	return process.argv[1] && !!(/webpack-dev-server/.exec(process.argv[1]));
};

exports.root = path.join.bind(path, ROOT);
exports.sourceRoot = path.join.bind(path, SOURCE_ROOT);
