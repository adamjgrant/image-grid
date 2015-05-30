# Image Grid

Grid of images loaded from Google Images. jQuery free and built from Jade and Sass.

## Running

Install bundler and bundle

    gem install bundler
    bundle

Install node dependencies

    npm install .

Afterwards, run `gulp` to build and watch.

## Running tests

Run `gulp test`

## How this works

### Creating the page

1. CSS and markup load showing a title bar, an image box template, and a
   lightbox.
2. An ImageArray prototype is created to assemble image lists into markup.
3. Images are pulled from API and ImageArray is extended into `thumbnailArray` and
   `lightBoxArray`
4. Markup is assembled in-memory from `thumbnailArray` and `lightBoxArray`
   and appended to their respective render elements.
5. Markup is added to the DOM.

### Binding events

1. A single event listener is added to the container holding the thumbnails.
   On click, the lightbox is launched and is set to show the image matching the
   id of the click event's target.
2. The "x" on the modal closes the modal.
3. Previous button calls a function that sets the image index of the carousel if
   not exceeding the ends of the image index.

## Notes

API connectivity requires the request to be made from one of these referrers:
image-grid-slack.s3-website-us-east-1.amazonaws.com, localhost, localhost:3000
