# Drawing a blank

This is the code for a blank canvas I drew.

All it does is create a `<canvas>` HTML element that covers the full viewport, and then uses the [Canvas Context 2D Web API](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D) to draw a white rectangle over the whole canvas. 

## Drawing on the blank

You can draw on the canvas by clicking and dragging your mouse (or touching the screen if using a touch screen). 

If you click the question mark button in the top right, some controls will appear. You can clear the canvas, change the canvas color, or change the marker color. 

## Live site

Live site is located [here](https://drawing-a-blank.numberthink.com).

Happy drawing!

## Pure blank

If you're just looking for a pure blank canvas, no bells or whistles attached, then checkout this [branch](https://github.com/numberthink/drawing-a-blank/tree/pureblank)

## Running the site locally

To run this locally on your own computer, follow these simple commands. 

Clone this repo:
```bash
npx degit https://github.com/numberthink/drawing-a-blank.git
```

Install dependencies:
```bash
npm install
```

Run locally:
```bash
npm run dev
```




