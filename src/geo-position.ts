import "linqable.ts";
export class GeoPosition {
    /**
     * Zero value - ocean
     */
    public static Zero: GeoPosition = new GeoPosition(0, 0);
    /**
     * Longitude (λ)
     * 
     * Lines of longitude appear vertical with varying curvature in this projection,
     * but are actually halves of great ellipses, with identical radii at a given latitude.
     */
    public Longitude;
    /**
     * Latitude (φ)
     * 
     * Lines of latitude appear horizontal with varying curvature in this projection;
     * but are actually circular with different radii.
     * All locations with a given latitude are collectively referred to as a circle of latitude.
     */
    public Latitude;

    public constructor(_longitude?: number, _latitude?: number) {
        this.Longitude = _longitude || 0;
        this.Latitude = _latitude || 0;
    }
    /**
     * Calculate distance in meters
     * @param pos Position 2
     */
    public Distance(pos: GeoPosition): number {
        // radius of the sphere (Earth)
        var rad = 6372795;

        // coordinates of two points
        var llat1 = this.Latitude;
        var llong1 = this.Longitude;
        var llat2 = pos.Latitude;
        var llong2 = pos.Longitude;

        // in radians
        var lat1 = llat1 * Math.PI / 180;
        var lat2 = llat2 * Math.PI / 180;
        var long1 = llong1 * Math.PI / 180;
        var long2 = llong2 * Math.PI / 180;

        // cosines and sines of latitudes and longitude differences
        var cl1 = Math.cos(lat1);
        var cl2 = Math.cos(lat2);
        var sl1 = Math.sin(lat1);
        var sl2 = Math.sin(lat2);
        var delta = long2 - long1;
        var cdelta = Math.cos(delta);
        var sdelta = Math.sin(delta);

        // calculating the length of a large circle
        var y = Math.sqrt(Math.pow(cl2 * sdelta, 2) + Math.pow(cl1 * sl2 - sl1 * cl2 * cdelta, 2));
        var x = sl1 * sl2 + cl1 * cl2 * cdelta;
        var ad = Math.atan2(y, x);
        var dist = ad * rad;
        return dist; // in meters
    }
    /**
     * Is zero coordinates?
     */
    public IsZero(): boolean {
        return this.equals(GeoPosition.Zero);
    }

    /**
     * to string this object
     */
    public toString(): string {
        return `[${this.Longitude} (λ), ${this.Latitude}] (φ)`
    }
    /**
     * equals objects
     * @param y second object
     */
    public equals(y: GeoPosition): boolean {
        if (typeof y != typeof this)
            return false;
        if (y === undefined)
            return false;
        return this.Latitude == y.Latitude && this.Longitude == y.Longitude;
    }
    /**
     * get hash code this object
     */
    public hashCode(): number {
        return (this.Longitude * 397) ^ this.Latitude;
    }
    /**
     * Is the current coordinate in the inside area
     * @param area area
     */
    public IsInsideArea(area: Array<GeoPosition>) {
        var i;
        var angle = 0;
        var point1_lat;
        var point1_long;
        var point2_lat;
        var point2_long;
        var n = area.Count();

        for (i = 0; i < n; i++) {
            point1_lat = area[i].Latitude - this.Latitude;
            point1_long = area[i].Longitude - this.Longitude;
            point2_lat = area[(i + 1) % n].Latitude - this.Latitude;
            point2_long = area[(i + 1) % n].Longitude - this.Longitude;
            angle += GeoPosition.Angle2D(point1_lat, point1_long, point2_lat, point2_long);
        }

        if (Math.abs(angle) < Math.PI)
            return false;
        else
            return true;
    }
    /**
     * Calculates center position from section
     * @param secStart section start position
     * @param secEnd section end position
     */
    public static SectionCenterPosition(secStart: GeoPosition, secEnd: GeoPosition) {
        var min, max, longitude, latitude;

        min = Math.min(secStart.Longitude, secEnd.Longitude);
        max = Math.max(secStart.Longitude, secEnd.Longitude);
        longitude = min + (max - min) / 2;
        min = Math.min(secStart.Latitude, secEnd.Latitude);
        max = Math.max(secStart.Latitude, secEnd.Latitude);
        latitude = min + (max - min) / 2;

        return new GeoPosition(longitude, latitude);
    }
    /**
     * Calculates distance to section
     * @param point Point position
     * @param secStart section start position
     * @param secEnd section end position
     */
    public static DistanceToSection(point: GeoPosition, secStart: GeoPosition, secEnd: GeoPosition) {
        var secCenter = GeoPosition.SectionCenterPosition(secStart, secEnd);
        var a = point.Distance(secStart);
        var b = point.Distance(secEnd);
        var c = point.Distance(secCenter);
        var d = Math.min(a, b);
        d = Math.min(d, c);
        return d;
    }
    /**
     * Calculates distance to section (extension version)
     * @param point Point position
     * @param secStart section start position
     * @param secEnd section end position
     */
    public static DistanceToSectionEx(point: GeoPosition, secStart: GeoPosition, secEnd: GeoPosition) {
        var perp = GeoPosition.GetPerp(point, secStart, secEnd);
        if (perp != null)
            return point.Distance(perp);
        return GeoPosition.DistanceToSection(point, secStart, secEnd);
    }
    /**
     * Getting Perpendicular
     * @param point point
     * @param secStart section start position
     * @param secEnd section end position
     */
    public static GetPerp(point: GeoPosition, secStart: GeoPosition, secEnd: GeoPosition) {
        var xx = (secEnd.Longitude - secStart.Longitude);
        var yy = (secEnd.Latitude - secStart.Latitude);

        var shortestLength = ((xx * (point.Longitude - secStart.Longitude))
            + (yy * (point.Latitude - secStart.Latitude)))
            / ((xx * xx) + (yy * yy));

        var perp = new GeoPosition(secStart.Longitude + xx * shortestLength,
            secStart.Latitude + yy * shortestLength);

        if (perp.Longitude < secEnd.Longitude && perp.Longitude > secStart.Longitude &&
            perp.Latitude < secEnd.Latitude && perp.Latitude > secStart.Latitude)
            return perp;

        return null;
    }
    /**
     * Calculate Angle2D
     */
    public static Angle2D(y1: number, x1: number, y2: number, x2: number): number {
        var dtheta, theta1, theta2;

        theta1 = Math.atan2(y1, x1);
        theta2 = Math.atan2(y2, x2);
        dtheta = theta2 - theta1;
        while (dtheta > Math.PI)
            dtheta -= (Math.PI * 2);
        while (dtheta < -Math.PI)
            dtheta += (Math.PI * 2);
        return dtheta;
    }
    /**
     * Validate GSP position
     */
    public static IsValidGpsCoordinate(latitude: number, longitude: number): boolean {
        if (latitude > -90 && latitude < 90 && longitude > -180 && longitude < 180)
            return true;
        return false;
    }

    /**
     * Parse gps position
     */
    public static GetGpsPosition(latitude: string, longitude: string) {
        switch (latitude[0]) {
            case 'N':
                latitude = latitude.replace(longitude.substring(0, 1), "");
                break;
            case 'S':
                latitude = latitude.replace('S', '-');
                break;
            default:
                throw new Error(`Invalid latitude specified: ${latitude}`);
        }

        switch (longitude[0]) {
            case 'E':
                longitude = longitude.replace(longitude.substring(0, 1), "");
                break;
            case 'W':
                longitude = longitude.replace('W', '-');
                break;
            default:
                throw new Error(`Invalid longitude specified: ${longitude}`);
        }
        return new GeoPosition(parseFloat(longitude), parseFloat(latitude));
    }
}