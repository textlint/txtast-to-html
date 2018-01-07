# @textlint/txtast-to-html

TxtAST to HTML string.

This HTML string aim to be used as [Custom Elements](https://www.w3.org/TR/custom-elements/ "Custom Elements").

## Install

Install with [npm](https://www.npmjs.com/):

    npm install @textlint/txtast-to-html

## Usage

```ts
import { toHTML } from "@textlint/txtast-to-html";
const { parse } = require("markdown-to-ast");
const txtAST = parse(`# Title

text [link](http://example.com).

- list1
- list2

`);
const HTMLString = toHTML(txtAST);
/*
<txtast-document><txtast-header><txtast-str data-metadata="{&quot;value&quot;:&quot;Title&quot;,&quot;loc&quot;:{&quot;start&quot;:{&quot;line&quot;:1,&quot;column&quot;:2},&quot;end&quot;:{&quot;line&quot;:1,&quot;column&quot;:7}},&quot;range&quot;:[2,7]}">Title</txtast-str></txtast-header><txtast-paragraph><txtast-str data-metadata="{&quot;value&quot;:&quot;text &quot;,&quot;loc&quot;:{&quot;start&quot;:{&quot;line&quot;:3,&quot;column&quot;:0},&quot;end&quot;:{&quot;line&quot;:3,&quot;column&quot;:5}},&quot;range&quot;:[17,22]}">text </txtast-str><txtast-link><txtast-str data-metadata="{&quot;value&quot;:&quot;link&quot;,&quot;loc&quot;:{&quot;start&quot;:{&quot;line&quot;:3,&quot;column&quot;:6},&quot;end&quot;:{&quot;line&quot;:3,&quot;column&quot;:10}},&quot;range&quot;:[23,27]}">link</txtast-str></txtast-link><txtast-str data-metadata="{&quot;value&quot;:&quot;.&quot;,&quot;loc&quot;:{&quot;start&quot;:{&quot;line&quot;:3,&quot;column&quot;:31},&quot;end&quot;:{&quot;line&quot;:3,&quot;column&quot;:32}},&quot;range&quot;:[48,49]}">.</txtast-str></txtast-paragraph><txtast-list><txtast-listitem><txtast-paragraph><txtast-str data-metadata="{&quot;value&quot;:&quot;list1&quot;,&quot;loc&quot;:{&quot;start&quot;:{&quot;line&quot;:5,&quot;column&quot;:2},&quot;end&quot;:{&quot;line&quot;:5,&quot;column&quot;:7}},&quot;range&quot;:[53,58]}">list1</txtast-str></txtast-paragraph></txtast-listitem><txtast-listitem><txtast-paragraph><txtast-str data-metadata="{&quot;value&quot;:&quot;list2&quot;,&quot;loc&quot;:{&quot;start&quot;:{&quot;line&quot;:6,&quot;column&quot;:2},&quot;end&quot;:{&quot;line&quot;:6,&quot;column&quot;:7}},&quot;range&quot;:[61,66]}">list2</txtast-str></txtast-paragraph></txtast-listitem></txtast-list></txtast-document>
*/
```

Simplify output:

```html
<txtast-document>
    <txtast-header>
        <txtast-str>Title</txtast-str>
    </txtast-header>
    <txtast-paragraph>
        <txtast-str>text</txtast-str>
        <txtast-link>
            <txtast-str>link</txtast-str>
        </txtast-link>
        <txtast-str>.</txtast-str>
    </txtast-paragraph>
    <txtast-list>
        <txtast-listitem>
            <txtast-paragraph>
                <txtast-str>list1</txtast-str>
            </txtast-paragraph>
        </txtast-listitem>
        <txtast-listitem>
            <txtast-paragraph>
                <txtast-str>list2</txtast-str>
            </txtast-paragraph>
        </txtast-listitem>
    </txtast-list>
</txtast-document>
```

## Changelog

See [Releases page](https://github.com/textlint/txtast-to-html/releases).

## Running tests

Install devDependencies and Run `npm test`:

    npm i -d && npm test

## Contributing

Pull requests and stars are always welcome.

For bugs and feature requests, [please create an issue](https://github.com/textlint/txtast-to-html/issues).

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## Author

- [github/azu](https://github.com/azu)
- [twitter/azu_re](https://twitter.com/azu_re)

## License

MIT © azu
