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

    t.deepEqual(+x.Distance(y).toFixed(1), 17304.4);
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
    t.plan(6);
    let geo = GeoPosition.GetGpsPosition("N71.317941", "E55.691416");
    t.deepEqual(geo.Latitude, 71.317941);
    t.deepEqual(geo.Longitude, 55.691416);
    geo = GeoPosition.GetGpsPosition("N71,317941", "E55,691416");
    t.deepEqual(geo.Latitude, 71.317941);
    t.deepEqual(geo.Longitude, 55.691416);
    geo = GeoPosition.GetGpsPosition("S71,317941", "W55,691416");
    t.deepEqual(geo.Latitude, -71.317941);
    t.deepEqual(geo.Longitude, -55.691416);
})