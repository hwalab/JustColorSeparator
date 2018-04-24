/*
 *  Just Color Separator. Copyright (c) 2018 HWALab. MIT License.
 *  https://www.hwalab.com/justcolorseparator/
 */

/* eslint-disable max-statements, no-console, require-jsdoc */

import * as utils from "/scripts/utils.js";
import colorIcon from "/scripts/coloricon.js";

function applyColor(color, shape) {
    console.log("Applying color:", color);
    document.body.style.backgroundColor = color;

    // Get the computed color
    const computedColor = window.getComputedStyle(document.body).getPropertyValue("background-color");
    console.log("Computed color:", computedColor);

    // "Update" the favicon color (actually create a new favicon with the specified fill color and shape)
    utils.addFaviconElement(document, colorIcon(computedColor, shape));

    // Update the theme-color meta tag to update the browser toolbar color (on browsers that support this feature)
    document.querySelector("meta[name=theme-color]").setAttribute("content", computedColor);
}

function getQueryParams(query) {
    if (!query) {
        return null;
    }

    const params = query.split("-");
    return { color: utils.ensureHexColorHash(params[0]), iconShape: params[1] }
}

function initExamples() {
    [...document.getElementById("examples").children].forEach(elem => {
        const params = getQueryParams(elem.dataset.query);
        if (params) {
            const imgElem = elem.querySelector("img");
            if (imgElem) imgElem.src = colorIcon(params.color, params.iconShape);
        }
    });
}

/**
 * Initializes the app.
 * @returns {void}
 */
function initApp() {


    // Try to apply the color query parameter. If we don't have a query parameter, generate a random color
    // and update its code in the url
    const query = window.location.search.substring(1);
    if (query.length === 0) {
        initExamples();
        document.getElementById("help").hidden = false;
        return;
    }

    const params = query.split("-");
    applyColor(utils.ensureHexColorHash(params[0]), params[1]);

    // Blank out the document title using an invisible (zero-width) control character
    document.title = "\u200E";
}

initApp();
