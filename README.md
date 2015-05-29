# Image Grid

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
2. The markup of the image box is saved as a JS variable for use in prototypes.
3. Images are pulled from API. ImageBox superclass created that turns API image
   source into markup. This superclass contains a local variable of the parent
   element it will append to.
4. Thumbnail class extends ImageBox as its own constructor, loading its own local
   variable for the parent element it will append to.
5. The lightbox and thumbnail array are added to an in-memory div element. After
   this element has all it needs, it is appended to the DOM.

### Binding events

1. A single event listener is added to the container holding the thumbnails.
   On click, the lightbox is launched and is set to show the image matching the
   id of the click event's target.
2. The "x" on the modal closes the modal.
3. Previous button calls a function that sets the image index of the carousel if
   not exceeding the ends of the image index.
