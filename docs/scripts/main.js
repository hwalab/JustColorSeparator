/*
 *  Just Color Separator. Copyright (c) 2018 HWALab. MIT License.
 *  https://www.hwalab.com/justcolorseparator/
 */

/* eslint-disable no-console */

import * as colorFavicon from "/scripts/colorfavicon.js";
import * as utils from "/scripts/utils.js";

/**
 * Parses a dash delimited query string, and returns the parameters.
 * @param {string} query A query string.
 * @returns {object} The color and icon shape parameters.
 */
function getQueryParams(query) {
    if (!query) return null;
    const params = query.split("-");
    return { color: utils.ensureHexColorHash(params[0]), iconShape: params[1] };
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

    // Create a new favicon with the specified fill color and shape, and add it to the HTML head
    colorFavicon.addFaviconElement(document, colorFavicon.createIcon(document, computedColor, shape));

    // Update the theme-color meta tag to update the browser toolbar color (on browsers that support this feature)
    document.querySelector("meta[name=theme-color]").setAttribute("content", computedColor);
}

/**
 * Shows the help screen, after initializing the icons of the ready-to-use examples.
 * @returns {void}
 */
function showHelp() {
    [...document.getElementById("examples").children].forEach(elem => {
        const params = getQueryParams(elem.dataset.query);
        if (params) {
            const imgElem = elem.querySelector("img");
            if (imgElem) imgElem.src = colorFavicon.createIcon(document, params.color, params.iconShape);
        }
    });

    document.getElementById("help").hidden = false;
}

/**
 * Initializes the app.
 * @returns {void}
 */
function initApp() {

    // Parse and apply color and icon shape query parameters, or show help if we don't have at least a color parameter
    const params = getQueryParams(window.location.search.substring(1));
    if (params) {
        applyParams(params.color, params.iconShape);

        // Blank out the document title using an invisible (zero-width) control character
        // document.title = "\uFEFF";
        document.title = "\u200E";
    } else {
        showHelp();
    }
}

initApp();
