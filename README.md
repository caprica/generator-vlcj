# generator-vlcj [![NPM version][npm-image]][npm-url] 
> Create a vlcj project that uses Maven

## Installation

First, install [Yeoman](http://yeoman.io) and generator-vlcj using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-vlcj
```

Then generate your new project:

```bash
yo vlcj
```
## Instructions

Yeoman will ask you a number of questions that will be used to tailor the generated project how you
want it.

The generated project contains an example main class with the bare minimum code necessary to get a
working vlcj media player.

There are two project variations - one uses the vlcj media player "component" framework, the other
uses a media player factory. 

The version that uses the component framework is a bit simpler as the component framework
encapsulates the creation of a media player factory and a video surface.

The version that does not use the component framework shows explicitly creating a media player
factory, a video surface and a media player.

Both approaches are valid and current with vlcj, use whichever one suits you best.

Your generated project can be built the usual way using `mvn install`.

## License

GPL-3.0 © [capricasoftware](capricasoftware.co.uk)


[npm-image]: https://badge.fury.io/js/generator-vlcj.svg
[npm-url]: https://npmjs.org/package/generator-vlcj
