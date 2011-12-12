# pj_robin.js

Robinson projection library - javascript port of PJ_robin.c from PROJ.4
(v4.7.0).  Use it to make less-stretchified (but bendy around the edges)
global interactive slippy maps :)

## Node.js usage

Install using `npm`.

    npm install pj_robin

Frivolous example code:

    var Robinson = require('pj_robin'),
        pt = Robinson.project(51.507222, -0.1275);
    console.log("London is at x:"+pt.x+" y:"+pt.y);

## Browser usage

Use the minified javascript file (which can be rebuilt using the included
Makefile).

    <script src='pj_robin.min.js'></script>
    <script>
        var pt = Robinson.project(51.507222, -0.1275);
        alert("London is at x:"+pt.x+" y:"+pt.y);
    </script>

## API reference

### Robinson.project(lat, lng) -> Point

Project a latitude / longitude (in degrees).

Returns an object with `x` and `y` properties.

**Note**: this uses a unit spheroid, equivalent to using cs2cs with the
following parameters (note `+a=1` and `+b=1`).

    +proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs +to 
    +proj=robin +lon_0=0 +x_0=0 +y_0=0 +a=1 +b=1 +units=m +no_defs

### Robinson.unproject(x, y) -> LatLng

Unproject an x / y point - the reverse of `Robinson.project`.

Returns an object with lat and lng properties.

### Robinson.remap(pt) -> Point

Re-map a projected point to 0 <= x/y < 1 range.

(useful for operations on square map tiles)
