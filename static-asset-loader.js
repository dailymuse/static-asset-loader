const loaderUtils = require("loader-utils");
const path = require("path");
/**
 * A loader to generate an image URL with file
 * hash when an image file is required.
 */
module.exports = function(content) {
    // Flag this loader as cacheable.
    this.cacheable && this.cacheable();

    const query = loaderUtils.getOptions(this) || {};

    const relativeTo = query.relativeTo || __dirname;
    const prefix = query.prefix || "";

    const hash = loaderUtils.interpolateName(this.context, `[hash]`, {
        context: this.rootContext || this.options.context,
        content
    });

    const resourcePath = path.relative(relativeTo, this.resourcePath);

    return `module.exports = "${prefix}${resourcePath}?v=${hash}"`;
};