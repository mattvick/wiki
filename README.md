<img height="150" src="img/wikijs.png">

[![NPM Version](https://img.shields.io/npm/v/wikijs.svg)](https://www.npmjs.com/package/wikijs)
[![Build Status](https://travis-ci.org/dijs/wiki.svg)](https://travis-ci.org/dijs/wiki)
[![Coverage Status](https://coveralls.io/repos/dijs/wiki/badge.svg)](https://coveralls.io/r/dijs/wiki)
<a href="https://www.buymeacoffee.com/2tmRKi9" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/yellow_img.png" alt="Buy Me A Coffee" style="height: 41px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>

WikiJs is a node.js library which serves as an interface to Wikipedia (or any MediaWiki).

## What can it do?

- Search wiki articles
- Fetch article content
- Find all links/images/categories in a article page
- Get parsed information about articles
- Find articles by geographical location
- and much more!

## Documentation

<https://dijs.github.io/wiki>

## Install

```bash
npm install wikijs
```

## Build yourself

You can run these commands in order to build and test WikiJs:

```bash
git clone git@github.com:dijs/wiki.git
cd wiki
npm install
npm run build
npm test
```

## Usage

```javascript
import wiki from 'wikijs';
// const wiki = require('wikijs').default;

wiki()
	.page('Batman')
	.then(page => page.info('alterEgo'))
	.then(console.log); // Bruce Wayne
```

## Usage with webpack

In order for webpack to build wikijs properly, you must add an option to
your webpack configuration file. [Documentation](https://webpack.js.org/configuration/externals/#externals)

```json
externals: {
  "isomorphic-fetch": "fetch"
}
```

## Usage with other MediaWiki's

You can use the API options configuration:

```js
wiki({
	apiUrl: 'https://awoiaf.westeros.org/api.php',
	origin: null
}).search('Winterfell');
```

## Usage with other languages

You just need to change the API to the proper URL. This is normally just changing the subdomain of wikipedia.

```js
wiki({ apiUrl: 'https://es.wikipedia.org/w/api.php' })
	.page('Cristiano Ronaldo')
	.then(page => page.info())
	.then(console.log);
```

Read more about Cross Domain Requests [here](https://www.mediawiki.org/wiki/API:Main_module)

## Usage with custom headers

If you need to pass authentication headers or anything else.

```js
wiki({
	headers: {
		Cookie: 'name=value; name2=value2; name3=value3'
	}
}).search('Winterfell');
```

## Parsing Wiki Infobox Data

The code Wikipedia uses for infobox data is strange and complex. So I have split the parsing code into another library. You can find it [here](https://github.com/dijs/infobox-parser).
[![NPM Version](https://img.shields.io/npm/v/wikijs.svg)](https://www.npmjs.com/package/infobox-parser)

We not only parse out the information, but also try to transform the data into a convenient structure for data processing.

## Contribute!

I always welcome help. Please just stick to the lint rules and write tests with each feature/fix.

## Artwork

Thanks to [Heather van der Dys](http://heathervanderdys.com/) for the awesome logo!
