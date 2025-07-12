<?php

class ABCjsHooks {
  public static function onParserFirstCallInit( Parser $parser ) {
    $parser->setHook( 'abc', [ self::class, 'renderABC' ] );
    return true;
  }

  public static function renderABC( $input, array $args, Parser $parser, PPFrame $frame ) {
    $parser->getOutput()->addModules( [ 'ext.abcjs' ] );
    $id = 'abcjs_' . substr( md5( $input ), 0, 8 );
    $escaped = htmlspecialchars( $input );
    return <<<HTML
<div class="abcjs-container">
  <pre id="$id" class="abcjs-raw" style="display:none;">$escaped</pre>
  <div id="${id}_rendered" class="abcjs-rendered"></div>
</div>
HTML;
  }
}

