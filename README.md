# videojs-audio-player

An audio player with album artwork, artist, track, and more. Uses the HTML5 `<audio>` element.

## Installation

```sh
npm install --save videojs-audio-player
```

## Usage

To include videojs-audio-player on your website or web application, use any of the following methods.

### `<script>` Tag

This is the simplest case. Get the script in whatever way you prefer and include the plugin _after_ you include [video.js][videojs], so that the `videojs` global is available.

```html
<script src="//path/to/video.min.js"></script>
<script src="//path/to/videojs-audio-player.min.js"></script>
<script>
  var player = videojs('my-video');

  player.audioPlayer();
</script>
```

### Browserify/CommonJS

When using with Browserify, install videojs-audio-player via npm and `require` the plugin as you would any other module.

```js
var videojs = require('video.js');

// The actual plugin function is exported by this module, but it is also
// attached to the `Player.prototype`; so, there is no need to assign it
// to a variable.
require('videojs-audio-player');

var player = videojs('my-video');

player.audioPlayer();
```

### RequireJS/AMD

When using with RequireJS (or another AMD library), get the script in whatever way you prefer and `require` the plugin as you normally would:

```js
require(['video.js', 'videojs-audio-player'], function(videojs) {
  var player = videojs('my-video');

  player.audioPlayer();
});
```

## License

MIT. Copyright (c) Joseph Bona


[videojs]: http://videojs.com/
