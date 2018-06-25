import test from "ava";
import { GeoPosition } from '../src';


test("Create geo position", (t) => {
    t.notThrows(() => {
        new GeoPosition(71.317941, 55.691416);
    })
})

test("Calculate distance", (t) => {
    let x = new GeoPosition(71.317941, 55.691416);
    let y = new GeoPosition(71.500873, 55.807184);

    t.deepEqual(+x.Distance(y).toFixed(1), 20844.1);
})


test("Is Zero", (t) => {
    t.plan(3);
    t.false(new GeoPosition(71.317941, 55.691416).IsZero());
    t.true(new GeoPosition(0, 0).IsZero());
    t.true(GeoPosition.Zero.IsZero());
})

test("Validate GPS", (t) => {
    t.plan(2);
    t.true(GeoPosition.IsValidGpsCoordinate(71.317941, 55.691416));
    t.false(GeoPosition.IsValidGpsCoordinate(271.317941, 255.691416));
})

test("Angle2D", (t) => {
    t.deepEqual(+GeoPosition.Angle2D(71.4, 54.4, 55.4, 54.4).toFixed(2), -0.13);
})

test("Parse GPS", (t) => {
    t.plan(8);
    let geo = GeoPosition.GetGpsPosition("N71.317941", "E55.691416");
    t.deepEqual(geo.Latitude, 71.317941);
    t.deepEqual(geo.Longitude, 55.691416);
    geo = GeoPosition.GetGpsPosition("N71,317941", "E55,691416");
    t.deepEqual(geo.Latitude, 71.317941);
    t.deepEqual(geo.Longitude, 55.691416);
    geo = GeoPosition.GetGpsPosition("S71,317941", "W55,691416");
    t.deepEqual(geo.Latitude, -71.317941);
    t.deepEqual(geo.Longitude, -55.691416);

    t.throws(() => {
        geo = GeoPosition.GetGpsPosition("74317941", "Ad4356");
    }, "Invalid latitude specified: 74317941");
    t.throws(() => {
        geo = GeoPosition.GetGpsPosition("S71,317941", "Ad4356");
    }, "Invalid longitude specified: Ad4356");
});

test("toString", (t) => {
    t.deepEqual(new GeoPosition(71.317941, 55.691416).toString(), "[71.317941(φ), 55.691416(λ)]");
});

test("hashCode", (t) => {
    t.deepEqual(new GeoPosition(71.317941, 55.691416).hashCode(), 22042);
});


test("IsInsideArea", (t) => {
    t.plan(2);
    let area = [
        new GeoPosition(71.51834193441157, 55.116358997070286),
        new GeoPosition(71.44676509856431, 54.92684483691404),
        new GeoPosition(71.33845776024275, 55.123225452148404),
        new GeoPosition(71.36701875276431, 55.43084263964841),
        new GeoPosition(71.45113719694054, 55.575038196289),
        new GeoPosition(71.5065763194486, 55.40749669238277),
        new GeoPosition(71.51834193441157, 55.116358997070286)

    ]
    t.true(new GeoPosition(71.436275, 55.220661).IsInsideArea(area));
    t.false(new GeoPosition(0, 0).IsInsideArea(area));
});


test("equals", (t) => {
    t.plan(4);
    let pos = new GeoPosition(71.317941, 55.691416);
    t.true(pos.equals(pos));
    t.false(pos.equals(new GeoPosition(70.317941, 54.691416)));
    t.false(pos.equals(<GeoPosition><any>0));
    t.false(pos.equals(undefined));
});


test("SectionCenterPosition", (t) => {
    let pos = new GeoPosition(71.436706, 55.268108);
    let pos2 = new GeoPosition(71.473202, 55.857764);
    t.deepEqual(GeoPosition.SectionCenterPosition(pos, pos2), new GeoPosition(71.454954, 55.562936));
});

test("DistanceToSection", (t) => {
    let pos = new GeoPosition(71.436706, 55.268108);
    let pos2 = new GeoPosition(71.473202, 55.857764);
    t.deepEqual(+GeoPosition.DistanceToSection(new GeoPosition(71.504361, 55.511926), pos, pos2).toFixed(2), 5807.64);
});
test("DistanceToSectionEx", (t) => {
    let pos = new GeoPosition(71.436706, 55.268108);
    let pos2 = new GeoPosition(71.473202, 55.857764);
    t.deepEqual(+GeoPosition.DistanceToSectionEx(new GeoPosition(71.504361, 55.511926), pos, pos2).toFixed(2), 5849.83);
});