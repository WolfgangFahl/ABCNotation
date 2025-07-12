/**
 * ABCjs MediaWiki Extension - Audio-Enabled Music Notation Renderer
 * 
 * This script automatically finds ABC music notation on MediaWiki pages and renders 
 * it as interactive sheet music with optional audio playback controls.
 * 
 * Features:
 * - Converts ABC notation text to visual sheet music (SVG)
 * - Responsive design that adapts to container size
 * - Audio synthesis and playback using Web Audio API
 * - Professional audio controls (play/pause/restart/progress/clock)
 * - Browser compatibility check for audio features
 * 
 * Requirements:
 * - abcjs-basic-min.js library (includes audio synthesis)
 * - abcjs-audio.css stylesheet for control styling
 * - Modern browser with Web Audio API support
 * 
 * Usage:
 * This script runs automatically when the page loads. It looks for elements with
 * the class "abcjs-raw" containing ABC notation and converts them to sheet music.
 * 
 * MediaWiki Integration:
 * Use with <abc>...</abc> tags in wiki pages. The ABCjsHooks.php parser hook
 * creates the necessary HTML structure with "abcjs-raw" class elements.
 * 
 * Audio Activation:
 * Due to browser autoplay policies, users must click "Activate Audio" button
 * before audio controls become functional. This creates the synthesizer and
 * connects it to the visual notation.
 * 
 * @author Wolfgang Fahl
 * @requires abcjs-basic-min.js
 * @requires abcjs-audio.css
 */

function initABC() {
  // Check if the ABCJS library is loaded and available
  if (typeof ABCJS !== "undefined") {
    
    // Find all elements with ABC notation content
    var elements = document.querySelectorAll(".abcjs-raw");
    
    // Process each ABC notation element
    for (var i = 0; i < elements.length; i++) {
      var el = elements[i];
      
      // Render the ABC notation as visual sheet music
      var visualObj = ABCJS.renderAbc(el.id + "_rendered", el.textContent, {
        responsive: 'resize'  // Make the notation responsive to container size
      });
      
      // Check if the browser supports Web Audio API for sound playback
      if (ABCJS.synth.supportsAudio()) {
        
        // Create a container div for the audio controls
        var audioDiv = document.createElement('div');
        audioDiv.id = el.id + '_audio';  // Unique ID for each audio control
        
        // Create an activation button (required for browser audio policies)
        var button = document.createElement('button');
        button.textContent = 'Activate Audio';
        
        // Set up the audio activation when button is clicked
        button.onclick = function() {
          
          // Create the audio control widget (play/pause/progress buttons)
          var synthControl = new ABCJS.synth.SynthController();

          synthControl.load('#' + el.id + '_audio', null, {
            displayPlay:     true,  // Show play/pause button
            displayRestart:  true,  // Show restart button
            displayProgress: true,  // Show progress bar
            displayClock:    true,  // Show time display
            displayLoop:     true,  // Show loop toggle
            displayWarp:     true,  // Show tempo multiplier selector
            displayTempo:    true,  // Show tempo (BPM) input
            displayQpm:      true,  // Show QPM toggle
            displayMute:     true,  // Show mute toggle
            displaySlider:   true   // Show tempo adjustment slider
          });


          // Create the audio synthesizer buffer
          var midiBuffer = new ABCJS.synth.CreateSynth();
          
          // Initialize the synthesizer with the rendered music
          midiBuffer.init({ 
            visualObj: visualObj[0]  // Use the first (usually only) tune
          }).then(function() {
            // Once audio is ready, connect it to the control widget
            synthControl.setTune(visualObj[0], true);
          });
        };
        
        // Insert the button and audio controls into the page
        var container = document.getElementById(el.id + "_rendered");
        container.parentNode.insertBefore(button, container.nextSibling);
        container.parentNode.insertBefore(audioDiv, button.nextSibling);
      }
    }
  }
}

// Initialize when page is ready
if (document.readyState === 'loading') {
  // Page still loading - wait for DOMContentLoaded
  document.addEventListener("DOMContentLoaded", initABC);
} else {
  // Page already loaded - run immediately
  initABC();
}
