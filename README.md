# ABCNotation MediaWiki Extension

This extension enables ABC music notation rendering in MediaWiki using [abcjs](https://abcjs.net).

[![Join the discussion at https://github.com/WolfgangFahl/ABCNotation/discussions](https://img.shields.io/github/discussions/WolfgangFahl/ABCNotation)](https://github.com/WolfgangFahl/ABCNotation/discussions)

[![GitHub issues](https://img.shields.io/github/issues/WolfgangFahl/ABCNotation.svg)](https://github.com/WolfgangFahl/ABCNotation/issues)
[![GitHub closed issues](https://img.shields.io/github/issues-closed/WolfgangFahl/ABCNotation.svg)](https://github.com/WolfgangFahl/ABCNotation/issues/?q=is%3Aissue+is%3Aclosed)
[![License](https://img.shields.io/github/license/WolfgangFahl/ABCNotation.svg)](https://www.apache.org/licenses/LICENSE-2.0)


# Usage

Embed ABC notation using:

    <abc>
    X:1
    T:Test
    M:4/4
    L:1/4
    K:C
    C D E F | G A B c |
    </abc>

# Demo
[Cooley's](https://wiki.bitplan.com/index.php/Cooley%27s)

# Links
https://www.mediawiki.org/wiki/Extension:AbcNotation

# Installation

1. Clone this extension to `extensions/AbcNotation/`

2. Add to `LocalSettings.php`:

    wfLoadExtension("ABCNotation");

3. Purge any affected wiki page:

    ?action=purge
