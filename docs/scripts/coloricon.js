
/* eslint-disable require-jsdoc */

const shapeFunc = {

    square: ctx => ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height),
    disc: ctx => {
        ctx.beginPath();
        ctx.arc(ctx.canvas.width / 2, ctx.canvas.height / 2, ctx.canvas.width / 2, 0, 2 * Math.PI, true);
        ctx.fill();
    },
    hline: ctx => ctx.fillRect(0, ctx.canvas.height / 2 - 2, ctx.canvas.width, 4),
    vline: ctx => ctx.fillRect(ctx.canvas.width / 2 - 2, 0, 4, ctx.canvas.height)

};

export default function (color, shape) {
    // console.log(color, shape);

    const canvas = document.createElement("canvas");
    const size = 64;
    canvas.width = size;
    canvas.height = size;
    if (!canvas.getContext) return null;

    const ctx = canvas.getContext("2d");
    ctx.fillStyle = color;

    const func = shape in shapeFunc ? shape : "square";
    shapeFunc[func](ctx);

    return canvas.toDataURL();
}
