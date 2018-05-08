(function () {
    'use strict';

    /*
     *  Just Color Separator. Copyright (c) 2018 HWALab. MIT License.
     *  https://www.hwalab.com/justcolorseparator/
     */

    /* eslint-disable no-magic-numbers */

    const FAVICON_SIZE = 32;

    /**
     * Icon shapes drawing functions.
     */
    const shapeFunc = {
        square: ctx => ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height),
        disc: ctx => {
            ctx.beginPath();
            ctx.arc(ctx.canvas.width / 2, ctx.canvas.height / 2, ctx.canvas.width / 2, 0, 2 * Math.PI, true);
            ctx.fill();
        },
        hline: ctx => ctx.fillRect(0, (ctx.canvas.height / 2) - 2, ctx.canvas.width, 4),
        vline: ctx => ctx.fillRect((ctx.canvas.width / 2) - 2, 0, 4, ctx.canvas.height),
        hrect: ctx => ctx.fillRect(0, ctx.canvas.height * 0.2, ctx.canvas.width, ctx.canvas.height * 0.6),
        vrect: ctx => ctx.fillRect(ctx.canvas.width * 0.2, 0, ctx.canvas.width * 0.6, ctx.canvas.height)
    };

    /**
     * Tests for a valid icon shape, and returns a default value if the specified shape is invalid.
     * @param {*} shape The icon shape to test.
     * @returns {string} A valid icon shape.
     */
    function validateIconShape(shape) {
        return shapeFunc.hasOwnProperty(shape) ? shape : "square";
    }

    /**
     * Creates a color filled favicon and returns its data URI.
     * @param {object} document The Document object.
     * @param {string} color The color of the icon.
     * @param {string} shape The shape of the icon, "square" by default.
     * @returns {string} A DOMString containing the icon data URI.
     */
    function createIcon(document, color, shape) {
        // Create and prepare the canvas element
        const canvas = document.createElement("canvas");
        canvas.width = FAVICON_SIZE;
        canvas.height = FAVICON_SIZE;
        if (!canvas.getContext) return null;
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = color;

        // Apply the icon shape function
        shapeFunc[validateIconShape(shape)](ctx);

        return canvas.toDataURL();
    }

    /**
     * Adds a favicon link element to the document head.
     * @param {*} document The Document object.
     * @param {*} dataURL The data URI of the favicon.
     * @returns {void}
     */
    function addFaviconElement(document, dataURL) {
        if (!document || !dataURL) return;

        const link = document.createElement("link");
        link.type = "image/png";
        link.rel = "icon";
        link.href = dataURL;
        document.head.appendChild(link);
    }

    /*
     *  Just Color Separator. Copyright (c) 2018 HWALab. MIT License.
     *  https://www.hwalab.com/justcolorseparator/
     */

    /**
     * Adds a leading number sign (#) if the string argument is a hex color value (eg F955AB).
     * @param {string} colorString A potentially hex color string.
     * @returns {string} The color string argument, #-prefixed if it contains a hex color value.
     */
    function ensureHexColorHash(colorString) {
        const hexColorRegex = /^([a-f0-9]{3,4}|[a-f0-9]{4}(?:[a-f0-9]{2}){1,2})\b$/i;
        return hexColorRegex.test(colorString) ? `#${colorString}` : colorString;
    }

    /*
     *  Just Color Separator. Copyright (c) 2018 HWALab. MIT License.
     *  https://www.hwalab.com/justcolorseparator/
     */

    /**
     * Parses a dash delimited query string, and returns the parameters.
     * @param {string} query A query string.
     * @returns {object} The color and icon shape parameters.
     */
    function getQueryParams(query) {
        if (!query) return null;
        const params = query.split("-");
        return { color: ensureHexColorHash(params[0]), iconShape: params[1] };
    }

    /**
     * Creates and applies the color favicon.
     * @param {string} computedColor The icon color.
     * @param {string} shape The icon shape.
     * @returns {void}
     */
    function applyFavicon(computedColor, shape) {

        // Create a new favicon with the specified fill color and shape, and add it to the HTML head
        const validShape = validateIconShape(shape);
        const icon = createIcon(document, computedColor, validShape);
        addFaviconElement(document, icon);
        localStorage.setItem("iconShape", validShape);

        // Add the icon to the drag tip
        document.getElementById("dragTipIcon").src = icon;
    }

    /**
     * Applies the specified parameters.
     * @param {string} color The color of the background and favicon.
     * @param {string} shape The favicon shape.
     * @returns {void}
     */
    function applyParams(color, shape) {

        // First of all, apply red: in case we get an invalid color parameter, the background will remain red, meaning error
        document.body.style.backgroundColor = "red";

        // Apply the specified color
        console.log("Applying color:", color);
        document.body.style.backgroundColor = color;

        // Get the computed color
        const computedColor = window.getComputedStyle(document.body).getPropertyValue("background-color");
        console.log("Computed color:", computedColor);

        // Apply the favicon
        applyFavicon(computedColor, shape);

        // Update the theme-color meta tag to update the browser toolbar color (on browsers that support this feature)
        document.querySelector("meta[name=theme-color]").setAttribute("content", computedColor);
    }

    /**
     * Updates and shows the help screen.
     * @returns {void}
     */
    function showHelp() {

        // Initializes the icons of the ready-to-use examples
        Array.from(document.getElementById("examples").children).forEach(elem => {
            const params = getQueryParams(elem.dataset.query);
            if (params) {
                const imgElem = elem.querySelector("img");
                if (imgElem) imgElem.src = createIcon(document, params.color, params.iconShape);
            }
        });

        // Update the icon shape of the named colors links with the last used shape saved to local storage
        const lastShape = localStorage.getItem("iconShape");
        if (lastShape) {
            document.querySelectorAll(".colors-list a").forEach(elem => {
                elem.href += `-${lastShape}`;
            });
        }
    }

    /**
     * Initializes the app.
     * @returns {void}
     */
    function initApp() {

        // Parse and apply color and icon shape query parameters, or show help if we don't have at least a color parameter
        const params = getQueryParams(window.location.search.substring(1));
        document.body.dataset.screen = params ? "color" : "help";
        if (params) {
            applyParams(params.color, params.iconShape);

            // Blank out the document title using an invisible (zero-width) control character
            document.title = "\u200E";
        } else {
            showHelp();
        }
    }

    initApp();

}());
