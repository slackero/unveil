# unveil.js
### A very lightweight plugin to lazy load images for jQuery or Zepto.js


Most of us are familiar with the [Lazy Load](http://www.appelsiini.net/projects/lazyload) plugin by [Mika Tuupola](http://www.appelsiini.net/).
This plugin is very useful and it boosts performance delaying loading of images in long web pages because images outside of viewport (visible part of web page) won't be loaded until the user scrolls to them.
Lazy Load has some cool options such as custom effects, container, events or data attribute. If you're not gonna use any of them you can reduce the file size by leaving just the essential code to show the images.
That's what I did and this is my lightweight version of Lazy Load with support for serving high-resolution images to devices with retina displays - less than 1k.

Visit unveil's [project page](http://slackero.github.com/unveil/) to read the documentation and see the demo.


## Options

| Parameter   | Default  | Description |
|:-------------|:----------|:-------------|
| threshold   | 0  | load image threshold amount of px earlier |
| src         | false  | use src as unveil data-src, SEO safe solution |
| callback    | null  | callback function that will fire after an image has been "unveiled" | 
| placeholder | data:image | the placeholder img src used when option `src: true`, the default is a transparent 1x1px GIF data:image, if you use a placeholder image it is recommend   |
| autoheight  | true  | will set placeholder img to related image width when option `src: true` |


## Browser support
Compatible with All Browsers and IE7+.


## License
Unveil is licensed under the [MIT license](http://opensource.org/licenses/MIT).
