/*
 *  Just Color Separator. Copyright (c) 2018 HWALab. MIT License.
 *  https://www.hwalab.com/justcolorseparator/
 */

/* eslint-disable max-statements */

/**
 * Adds a leading number sign (#) if the string argument is a hex color value (eg F955AB).
 * @param {string} colorString A potentially hex color string.
 * @returns {string} The color string argument, #-prefixed if it contains a hex color value.
 */
export function ensureHexColorHash(colorString) {
    const hexColorRegex = /^([a-f0-9]{3,4}|[a-f0-9]{4}(?:[a-f0-9]{2}){1,2})\b$/i;
    return hexColorRegex.test(colorString) ? `#${colorString}` : colorString;
}

/**
 * Creates a new favicon in memory and fills it with the specified color.
 * @param {*} color The color of the icon.
 * @returns {void}
 */
export function setColorFavicon(color) {
    const canvas = document.createElement("canvas");
    // canvas.width = 16;
    canvas.width = 64;
    // canvas.height = 16;
    canvas.height = 64;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const link = document.createElement("link");
    link.type = "image/png";
    link.rel = "icon";
    link.href = canvas.toDataURL();
    document.head.appendChild(link);
}

/**
 * Returns a random integer between 0 and the specified value.
 * @param {number} max The maximum value for the random integer.
 * @returns {number} A positive random integer less than (and not equal) max.
 */
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

/**
 * Returns a random hex color.
 * @returns {String} A RGB color string.
 */
export function getRandomColor() {

    const comp2Hex = comp => {
        const hex = comp.toString(16);
        return hex.length === 1 ? `0${hex}` : hex;
    };

    const maxRGB = 256;
    return `#${comp2Hex(getRandomInt(maxRGB))}${comp2Hex(getRandomInt(maxRGB))}${comp2Hex(getRandomInt(maxRGB))}`;
}
