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
export function validateIconShape(shape) {
    return shapeFunc.hasOwnProperty(shape) ? shape : "square";
}

/**
 * Creates a color filled favicon and returns its data URI.
 * @param {object} document The Document object.
 * @param {string} color The color of the icon.
 * @param {string} shape The shape of the icon, "square" by default.
 * @returns {string} A DOMString containing the icon data URI.
 */
export function createIcon(document, color, shape) {
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
export function addFaviconElement(document, dataURL) {
    if (!document || !dataURL) return;

    const link = document.createElement("link");
    link.type = "image/png";
    link.rel = "icon";
    link.href = dataURL;
    document.head.appendChild(link);
}
