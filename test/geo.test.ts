import test from "ava";
import { GeoPosition } from '../src';


test("create geo pos", (t) => {
    t.notThrows(() => {
        new GeoPosition(71.317941, 55.691416)
    })
})