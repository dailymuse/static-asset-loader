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
    const hash = loaderUtils.interpolateName(this.context, `[sha256:hash]`, {
        context: this.options.context,
        regExp: this.options.regExp,
        content
    });

    const resourcePath = path.relative(relativeTo, this.resourcePath);
    const parsedPath = path.parse(resourcePath)

    return `module.exports = "${prefix}${parsedPath.dir}/${parsedPath.name}-${hash}${parsedPath.ext}"`;
};
