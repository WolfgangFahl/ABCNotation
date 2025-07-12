# ABCjs MediaWiki Extension

This extension enables ABC music notation rendering in MediaWiki using [abcjs](https://abcjs.net).

## Required JavaScript

Download the runtime file from a trusted CDN:

https://cdnjs.cloudflare.com/ajax/libs/abcjs/6.5.1/abcjs-basic-min.js

Use this command to fetch it:

    wget -O extensions/ABCjs/modules/abcjs/abcjs-basic-min.js \
         https://cdnjs.cloudflare.com/ajax/libs/abcjs/6.5.1/abcjs-basic-min.js

wget -O extensions/ABCjs/modules/abcjs/abcjs-audio.css \
     https://paulrosen.github.io/abcjs/abcjs-audio.css

## Installation

1. Copy this extension to `extensions/ABCjs/`

2. Add to `LocalSettings.php`:

    wfLoadExtension("ABCjs");

3. Purge any affected wiki page:

    ?action=purge

## Usage

Embed ABC notation using:

    <abc>
    X:1
    T:Test
    M:4/4
    L:1/4
    K:C
    C D E F | G A B c |
    </abc>

## Notes

- `abcjs-basic-min.js` must be stored locally.
- Do not use a full URL in `extension.json` — MediaWiki's ResourceLoader does not load external JavaScript files.

