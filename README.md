# Easy Lazy Load Image

LazyLoad is a lightweight JavaScript library for lazy loading images with various customization options. It improves
performance by loading images only when they are about to enter the viewport.

## Installation

You can install LazyLoad using npm:

```bash
npm install easy-lazy-load-image
```

or

```html

<script src="https://cdn.jsdelivr.net/npm//easy-lazyload-image@0.0.1/index.js"></script>
```

## Usage

To use LazyLoad, create a new instance of the class and pass the CSS selector of the container holding the images along
with any desired options.

### Basic Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>LazyLoad Example</title>
    <style>
        #image {
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        ul {
            list-style-type: none;
        }

        li {
            width: 550px;
            height: 310px;
            margin: 10px;
            align-items: center;
            background-color: gray;
            border: 1px solid black;
        }

        img {
            width: 100%;
        }

    </style>
</head>
<body>
<div id="image-container">
    <img data-src="image1.jpg" alt="Image 1">
    <img data-src="image2.jpg" alt="Image 2">
</div>

<script src="https://cdn.jsdelivr.net/npm//easy-lazyload-image@0.0.1/index.js"></script>
<script>
    document.addEventListener('DOMContentLoaded', function () {
        new LazyLoad('#image-container', {
            threshold: 200,
            animation: 'fade',
            callback: (element) => console.log(`Loaded: ${element.src}`),
            delay: 300,
            placeholder: 'placeholder.jpg',
            errorImage: 'error.jpg',
            useIntersectionObserver: true,
            responsive: true
        });
    });
</script>
</body>
</html>
```

## Options

1. `selector`: The CSS selector to target elements for lazy loading. This is a required parameter.
2. `threshold`: The distance in pixels from the viewport that triggers the loading of an image. The default value is
    300.
3. `root`: The element that is used as the viewport for checking visibility of the target elements. The default value is
   the browser viewport.
4. `callback`: A callback function to execute after each image is loaded. Default is `null`.
5. `animation`: The type of animation to use when loading images. Default is `fade`.
6. `animationDuration`: The duration of the animation in milliseconds. Default is `500`.
7. `delay`: The delay in milliseconds before loading an image. Default is `500`.
8. `placeholder`: The URL of the placeholder image to use while the target image is loading. Default is `null`.
9. `errorPlaceholder`: The URL of the placeholder image to use if the target image fails to load. Default is `null`.
10. `useIntersectionObserver`: A boolean value indicating whether to use the Intersection Observer API. Default
    is `false`.
11. `responsive`: Whether to support responsive images using `srcset` and sizes attributes. Default is `false`.

## Methods

### Constructor

Creates an instance of LazyLoad.

```javascript
new LazyLoad(selector, options);
```
* `selector` (string): The CSS selector to target elements for lazy loading.
* `options` (object): An object containing customization options.
### Example

```javascript
new LazyLoad('#image-container', {
    threshold: 200,
    animation: 'fade',
    callback: (element) => console.log(`Loaded: ${element.src}`),
    delay: 300,
    placeholder: 'placeholder.jpg',
    errorImage: 'error.jpg',
    useIntersectionObserver: true,
    responsive: true
});
```
