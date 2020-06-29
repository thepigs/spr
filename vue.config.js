const bourbon = require('bourbon');

const bourbonPaths = [...bourbon.includePaths];

module.exports = {
    css: {
        loaderOptions: {
            sass: {
                sassOptions: {includePaths: bourbonPaths}
            },
        },
    },
};