/**
 * LazyLoad class to handle lazy loading of images with various options.
 */
class LazyLoad {
    /**
     * Creates an instance of LazyLoad.
     * @param {string} selector - The CSS selector to target elements for lazy loading.
     * @param {Object} [options={}] - Configuration options for the LazyLoad instance.
     * @param {number} [options.threshold=300] - The distance in pixels before the viewport to start loading the images.
     * @param {function} [options.callback=null] - A callback function to execute after each image is loaded.
     * @param {string} [options.animation='fade'] - The type of animation to use when loading images. Default is 'fade'.
     * @param {number} [options.delay=500] - The delay in milliseconds before checking the position of images.
     * @param {string} [options.placeholder=null] - A placeholder image source to display before the actual image loads.
     * @param {string} [options.errorImage=null] - An image source to display if the actual image fails to load.
     * @param {boolean} [options.useIntersectionObserver=false] - Whether to use the IntersectionObserver API for lazy loading.
     * @param {boolean} [options.responsive=false] - Whether to support responsive images using srcset and sizes attributes.
     */
    constructor(selector, options = {}) {
        this.lazyLoadElements = document.querySelectorAll(selector + ' [data-src]');
        this.threshold = options.threshold || 300;
        this.callback = options.callback || null;
        this.animation = options.animation || 'fade';
        this.delay = options.delay || 500;
        this.placeholder = options.placeholder || null;
        this.errorImage = options.errorImage || null;
        this.useIntersectionObserver = options.useIntersectionObserver || false;
        this.responsive = options.responsive || false;
        this.init();
    }

    /**
     * Initializes the lazy loading by setting placeholders and adding event listeners.
     */
    init() {
        if (this.placeholder) {
            this.lazyLoadElements.forEach(element => {
                element.setAttribute('src', this.placeholder);
            });
        }

        if (this.useIntersectionObserver && 'IntersectionObserver' in window) {
            this.observer = new IntersectionObserver(this.onIntersection.bind(this), {
                rootMargin: `${this.threshold}px`,
            });
            this.lazyLoadElements.forEach(el => this.observer.observe(el));
        } else {
            this.lazyLoadEvent();
            document.addEventListener('scroll', this.lazyLoadEvent.bind(this));
        }
    }

    /**
     * Callback function for the IntersectionObserver.
     * @param {IntersectionObserverEntry[]} entries - The intersection observer entries.
     */
    onIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                this.loadElement(entry.target);
                this.observer.unobserve(entry.target);
            }
        });
    }

    /**
     * Handles the lazy loading event for elements that are within the viewport.
     */
    lazyLoadEvent() {
        setTimeout(() => {
            let range = this.lazyLoadElements.length;
            for (let idx = 0; idx < range; idx++) {
                let currentHeight = window.innerHeight + window.pageYOffset;
                let elementHeight = this.lazyLoadElements[idx].offsetTop - this.threshold;
                if (elementHeight < currentHeight) {
                    this.loadElement(this.lazyLoadElements[idx]);
                }
            }
            this.lazyLoadElements = document.querySelectorAll('[data-src]');
            if (this.lazyLoadElements.length === 0) {
                document.removeEventListener('scroll', this.lazyLoadEvent.bind(this));
            }
        }, this.delay);
    }

    /**
     * Loads the image element with the actual image source.
     * @param {HTMLElement} element - The image element to load.
     */
    loadElement(element) {
        let dataSrc = element.getAttribute('data-src');

        if (this.responsive) {
            const srcset = element.getAttribute('data-srcset');
            const sizes = element.getAttribute('data-sizes');
            if (srcset) {
                element.setAttribute('srcset', srcset);
            }
            if (sizes) {
                element.setAttribute('sizes', sizes);
            }
        }

        const img = new Image();
        img.src = dataSrc;

        img.onload = () => {
            element.setAttribute('src', dataSrc);
            element.removeAttribute('data-src');

            if (this.animation === 'fade') {
                element.style.transition = 'opacity 0.5s';
                element.style.opacity = 0;
                setTimeout(() => {
                    element.style.opacity = 1;
                }, 50);
            }

            if (this.callback) {
                this.callback(element);
            }
        };

        img.onerror = () => {
            if (this.errorImage) {
                element.setAttribute('src', this.errorImage);
            }
            element.removeAttribute('data-src');
        };
    }
}

document.addEventListener('DOMContentLoaded', function() {
    new LazyLoad('body', {
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
