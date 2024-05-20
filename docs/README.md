# Overview
The LazyLoad class is designed to handle the lazy loading of images on a webpage. This helps improve performance and user experience by loading images only when they are about to come into the viewport. The LazyLoad class provides various configuration options to customize the behavior and appearance of the images as they are loaded.

## Installation

You can include the LazyLoad class in your project by downloading the script or including it via a `<script> </script>` tag.
```html
<script src="https://cdn.jsdelivr.net/npm//easy-lazyload-image@0.0.1/index.js"></script>
```
## Usage

To use the LazyLoad class, create a new instance of LazyLoad and pass the CSS selector of the container holding the images along with any desired options.
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
        document.addEventListener('DOMContentLoaded', function() {
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

