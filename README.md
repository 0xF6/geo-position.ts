<!-- Logo -->
<p align="center">
  <a href="#">
    <img height="64" width="64" src="https://github.githubassets.com/images/icons/emoji/unicode/1f6f0.png">
  </a>
</p>


<!-- Name -->
<h1 align="center">
  geo-position.ts 🌎
</h1>
<!-- desc -->
<h4 align="center">
  Library for working with GeoPosition fot TypeScript   
</h4>


<!-- classic badges -->
<p align="center">
  <a href="https://travis-ci.org/0xF6/geo-position.ts">
    <img alt="Build Status" src="https://travis-ci.org/0xF6/geo-position.ts.svg?branch=master">
  </a>
  <a href="https://david-dm.org/0xF6/geo-position.ts">
    <img alt="Dependencies" src="https://img.shields.io/david/0xF6/geo-position.ts.svg">
  </a>
  <a href="https://codecov.io/gh/0xF6/geo-position.ts">
    <img alt="CodeCov" src="https://codecov.io/gh/0xF6/geo-position.ts/branch/master/graph/badge.svg">
  </a>
  <a href="https://www.npmjs.com/package/geo-position.ts">
    <img alt="npm" src="https://img.shields.io/npm/dt/geo-position.ts.svg">
  </a>
</p>

<!-- popup badges -->
<p align="center">
  <a href="#">
    <img src="http://img.shields.io/:license-MIT-blue.svg">
  </a>
  <a href="https://t.me/ivysola">
    <img src="https://img.shields.io/badge/Ask%20Me-Anything-1f425f.svg?style=popout-square&logo=telegram">
  </a>
</p>






<!-- big badges -->
<p align="center">
  <a href="#">
    <img src="https://forthebadge.com/images/badges/contains-cat-gifs.svg">
    <img src="https://forthebadge.com/images/badges/designed-in-ms-paint.svg">
    <img src="https://forthebadge.com/images/badges/ages-18.svg">
    <img src="https://ForTheBadge.com/images/badges/winter-is-coming.svg">
    <img src="https://forthebadge.com/images/badges/made-with-javascript.svg">
  </a>
</p>
        
### Install

`yarn add geo-position.ts`


#### Run test

`yarn test` or `yarn test-nya` and for reports `yarn report-test`
   
![image](https://user-images.githubusercontent.com/13326808/41824817-97fd8e32-781f-11e8-8d0b-4f16d1aa5174.png)
   


### Usage


#### Create GeoPosition from  coordinates   
```TypeScript
import { GeoPosition } from 'geo-position.ts';

/* ... */

new GeoPosition(71.317941, 55.691416);

71.317941 //-  Latitude  (λ)
55.691416 //-  Longitude (φ)

```

#### Distance:
```TypeScript
let xPoint = new GeoPosition(71.317941, 55.691416);
let yPoint = new GeoPosition(71.500873, 55.807184);

+xPoint.Distance(yPoint).toFixed(0) // -> 20844 meters
```

#### Zero check
```TypeScript
new GeoPosition(0, 0).IsZero()         // -> true
new GeoPosition(71.317941, 55.691416)  // -> false
GeoPosition.Zero.IsZero()              // -> true
```

#### Validate Coordinates
```TypeScript
GeoPosition.IsValidGpsCoordinate(71.317941, 55.691416) // true
GeoPosition.IsValidGpsCoordinate(271.317941, 255.691416) // false
```

#### Parse Coordinates
```TypeScript
GeoPosition.GetGpsPosition("N71.317941", "E55.691416"); // -> [71.317941, 55.691416]
GeoPosition.GetGpsPosition("S71,317941", "W55,691416"); // -> [-71.317941, -55.691416]
```

#### Is Inside Area

(this area array coordinates)    
![image](https://user-images.githubusercontent.com/13326808/41824743-458f1ef0-781e-11e8-9ca3-f3396bb26ad5.png)

```TypeScript
let area = [
        new GeoPosition(71.51834193441157, 55.116358997070286),
        new GeoPosition(71.44676509856431, 54.92684483691404),
        new GeoPosition(71.33845776024275, 55.123225452148404),
        new GeoPosition(71.36701875276431, 55.43084263964841),
        new GeoPosition(71.45113719694054, 55.575038196289),
        new GeoPosition(71.5065763194486, 55.40749669238277),
        new GeoPosition(71.51834193441157, 55.116358997070286)
    ]

new GeoPosition(71.436275, 55.220661).IsInsideArea(area) // true
new GeoPosition(0, 0).IsInsideArea(area)                 // false
```
#### SectionCenterPosition
```TypeScript
let pos = new GeoPosition(71.436706, 55.268108);
let pos2 = new GeoPosition(71.473202, 55.857764);

GeoPosition.SectionCenterPosition(pos, pos2) // GeoPosition(71.454954, 55.562936)
```

![image](https://user-images.githubusercontent.com/13326808/41824788-1dd79602-781f-11e8-9fc2-3f8f8f1a4fde.png)

#### DistanceToSection
```TypeScript
let start = new GeoPosition(71.436706, 55.268108);
let end = new GeoPosition(71.473202, 55.857764);
let point = new GeoPosition(71.504361, 55.511926);
GeoPosition.SectionCenterPosition(point, start, end) // 5807 meters
```


<p align="center">
   <a href="https://ko-fi.com/P5P7YFY5">
    <img src="https://www.ko-fi.com/img/githubbutton_sm.svg">
  </a>
</p>
