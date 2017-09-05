import videojs from 'video.js'
import {version as VERSION} from '../package.json'

// Default options for the plugin.
const defaults = {}

// Cross-compatibility for Video.js 5 and 6.
const registerPlugin = videojs.registerPlugin || videojs.plugin
// const dom = videojs.dom || videojs;

/**
 * Function to invoke when the player is ready.
 *
 * This is a great place for your plugin to initialize itself. When this
 * function is called, the player will have its DOM and child components
 * in place.
 *
 * @function onPlayerReady
 * @param    {Player} player
 *           A Video.js player object.
 *
 * @param    {Object} [options={}]
 *           A plain object containing options for the plugin.
 */
const onPlayerReady = (player, options) => {
  player.addClass('vjs-audio-player')
}

/**
 * A video.js plugin.
 *
 * In the plugin function, the value of `this` is a video.js `Player`
 * instance. You cannot rely on the player being in a "ready" state here,
 * depending on how the plugin is invoked. This may or may not be important
 * to you; if not, remove the wait for "ready"!
 *
 * @function audioPlayer
 * @param    {Object} [options={}]
 *           An object of options left to the plugin author to define.
 */

const Component = videojs.getComponent('Component')
const AudioPlayer = videojs.extend(Component, {})
const CurrentTrack = videojs.extend(Component, {})
const PlayerDash = videojs.extend(Component, {})

videojs.registerComponent('AudioPlayer', AudioPlayer)
videojs.registerComponent('PlayerDash', PlayerDash)
videojs.registerComponent('CurrentTrack', CurrentTrack)

const audioPlayer = function (options) {
  this.ready(() => {
    this.removeChild('PosterImage')
    this.removeChild('TextTrackDisplay')
    this.removeChild('BigPlayButton')
    this.removeChild('ControlBar')
    onPlayerReady(this, videojs.mergeOptions(defaults, options))
  })

  const _audioPlayer = this.addChild('AudioPlayer')
  _audioPlayer.addClass('vjs-ap-container')
  const _playerDash = _audioPlayer.addChild('PlayerDash')
  _playerDash.addClass('vjs-ap-dash')
  const _currentTrack = _playerDash.addChild('CurrentTrack')
  _currentTrack.addClass('vjs-ap-current-track')
  const _controlBar = _playerDash.addChild('ControlBar')
  _controlBar.addClass('vjs-ap-control-bar')
  _controlBar.removeChild('FullscreenToggle')
  _controlBar.removeChild('RemainingTimeDisplay')
  // cover image
  const _cover = document.createElement('img')
  _cover.classList.add('vjs-ap-cover--desktop')
  _cover.src = options.cover
  // coverMobile image
  const _coverMobile = document.createElement('img')
  _coverMobile.classList.add('vjs-ap-cover--mobile')
  _coverMobile.src = options.coverMobile ? options.coverMobile : options.cover
  // track text
  const _text = document.createElement('div')
  _text.classList.add('vjs-ap-track-text')
  // artist
  const _artist = document.createElement('h3')
  _artist.classList.add('vjs-ap-artist')
  _artist.textContent = options.artist
  // track
  const _track = document.createElement('h2')
  _track.classList.add('vjs-ap-track')
  _track.textContent = options.track

  _audioPlayer.el().prepend(_cover)
  _currentTrack.el().prepend(_coverMobile)
  _currentTrack.el().append(_text)
  _text.append(_artist)
  _text.append(_track)
}

// Register the plugin with video.js.
registerPlugin('audioPlayer', audioPlayer)

// Include the version number.
audioPlayer.VERSION = VERSION

export default audioPlayer
