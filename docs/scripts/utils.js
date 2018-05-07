/*
 *  Just Color Separator. Copyright (c) 2018 HWALab. MIT License.
 *  https://www.hwalab.com/justcolorseparator/
 */

/**
 * Adds a leading number sign (#) if the string argument is a hex color value (eg F955AB).
 * @param {string} colorString A potentially hex color string.
 * @returns {string} The color string argument, #-prefixed if it contains a hex color value.
 */
export function ensureHexColorHash(colorString) {
    const hexColorRegex = /^([a-f0-9]{3,4}|[a-f0-9]{4}(?:[a-f0-9]{2}){1,2})\b$/i;
    return hexColorRegex.test(colorString) ? `#${colorString}` : colorString;
}
