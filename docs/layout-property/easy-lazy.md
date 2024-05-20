# Configuration Options

## Overview

The LazyLoad class accepts a variety of options to customize its behavior. These options are passed as an object to the
constructor.

To install the Scraper Library, use the following command:

```bash
npm i easy-lazyload-image
```

 or

```html

<script src="https://cdn.jsdelivr.net/npm//easy-lazyload-image@0.0.1/index.js"></script>
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

```javascript
new LazyLoad(selector, options);
```

* `selector`: The CSS selector string to target the elements to lazy load.
* `options`: An object containing configuration options.

### init()

Initializes the lazy loading by setting placeholders and adding event listeners.

### onIntersection(entries)

A callback function that is executed when an element intersects with the root element.

* `entries`: An array of IntersectionObserverEntry objects.

### lazyLoadEvent()

A callback function that is executed when the window is scrolled or resized.

### loadElement(element)

Loads an element by setting its `src` attribute to the value of the `data-src` attribute.

* `element`: The image element to load.

## Detailed Description

### Constructor

The constructor initializes the LazyLoad instance with the provided options. It selects all elements with the `data-src`
attribute within the specified container and stores them in `this.lazyLoadElements`.

### init()

The `init` method sets placeholder images if specified and adds the appropriate event listeners for lazy loading.
If `useIntersectionObserver` is true and the browser supports the IntersectionObserver API, it uses it for observing
when images come into the viewport. Otherwise, it falls back to listening for scroll events and manually checking the
position of images.

### onIntersection(entries)

The `onIntersection` method is called when an element intersects with the root element. It checks if the element is
intersecting and loads the image if it is.

### lazyLoadEvent()

The `lazyLoadEvent` method is called when the window is scrolled or resized. It checks if any of the lazy load elements
are in the viewport and loads them if they are.

### loadElement(element)

The `loadElement` method loads an element by setting its `src` attribute to the value of the `data-src` attribute. It
also handles the animation and placeholder images if specified.

## Example Use Cases

### Default Initialization

```javascript
new LazyLoad('#image-container');
```
This initializes the LazyLoad with default options.

### Custom Options
```javascript
new LazyLoad('#image-container', {
    threshold: 100,
    animation: 'fade',
    delay: 200,
    placeholder: 'placeholder.jpg',
    errorImage: 'error.jpg',
    useIntersectionObserver: true,
    responsive: true
});
```
This initializes the LazyLoad with custom options for threshold, animation, delay, placeholder, error image,
IntersectionObserver, and responsive images.
