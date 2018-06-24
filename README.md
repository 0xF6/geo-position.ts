# geo-position.ts 🌎🛰  
Library for working with GeoPosition fot TypeScript   

[![Build Status](https://travis-ci.org/0xF6/geo-position.ts.svg?branch=master)](https://travis-ci.org/0xF6/geo-position.ts)
[![Dev Dependencies](https://img.shields.io/david/dev/0xF6/geo-position.ts.svg)](https://david-dm.org/0xF6/geo-position.ts?type=dev)
[![Dependencies](https://img.shields.io/david/0xF6/geo-position.ts.svg)](https://david-dm.org/0xF6/geo-position.ts)
[![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)
[![codecov](https://codecov.io/gh/0xF6/geo-position.ts/branch/master/graph/badge.svg)](https://codecov.io/gh/0xF6/geo-position.ts)
![npm](https://img.shields.io/npm/dt/geo-position.ts.svg)
        
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

71.317941 //- Longitude (λ)
55.691416 //- Latitude (φ)

```

#### Distance:
```TypeScript
let xPoint = new GeoPosition(71.317941, 55.691416);
let yPoint = new GeoPosition(71.500873, 55.807184);

+x.Distance(y).toFixed(0) // -> 17304 meters
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
GeoPosition.SectionCenterPosition(point, start, end) // 3331 meters
```
