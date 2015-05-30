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
3. Images are pulled from API and ImageArray is extended into `thumbnailArray`
4. LightBoxImageArray extends ImageArray with special methods and is
   instantiated by `lightBoxArray`
5. Markup is assembled in-memory from `thumbnailArray` and `lightBoxArray`
   and appended to their respective render elements.

### Binding events

1. A single event listener is added to the container holding the thumbnails.
   On click, if the target is an image, the lightbox is launched and is set to
   show the image matching the id of the click event's target.
2. The "x" on the modal or the area around a visible modal closes the modal.
3. Previous/Next buttons call a function that sets the image index of the
   carousel if not exceeding the ends of the image index.

## Notes

Lightbox can also be controlled with cursor keys.
