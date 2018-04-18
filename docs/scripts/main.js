/*
 *  Just Color Separator. Copyright (c) 2018 HWALab. MIT License.
 *  https://www.hwalab.com/justcolorseparator/
 */

/* eslint-disable max-statements, no-console, require-jsdoc */

import * as utils from "/scripts/utils.js";

function applyColor(color) {
    console.log("Applying color:", color);
    document.body.style.backgroundColor = color;

    // "Update" the favicon color (actually create a new favicon filled with the color)
    const computedColor = window.getComputedStyle(document.body).getPropertyValue("background-color");
    console.log("Computed color:", computedColor);
    utils.setColorFavicon(computedColor);

    // Update the theme-color meta tag to update the browser toolbar color (on browsers that support this feature)
    document.querySelector("meta[name=theme-color]").setAttribute("content", computedColor);
}

/**
 * Initializes the app.
 * @returns {void}
 */
function initApp() {
    // Blank out the document title using an invisible (zero-width) control character
    document.title = "\u200E";

    // Try to apply the color query parameter. If we don't have a query parameter, generate a random color
    // and update its code in the url
    const query = window.location.search.substring(1);
    const color = query.length > 0 ? utils.ensureHexColorHash(query) : utils.getRandomColor();
    if (query.length === 0) history.replaceState(null, null, `?${color.substring(1)}`);

    // Apply the color
    applyColor(color);

    document.addEventListener("dblclick", () => {
        window.location.search = utils.getRandomColor().substring(1);
        // const newColor = utils.getRandomColor();
        // applyColor(newColor);
        // history.replaceState(null, null, `?${newColor.substring(1)}`);
    });
}

initApp();
