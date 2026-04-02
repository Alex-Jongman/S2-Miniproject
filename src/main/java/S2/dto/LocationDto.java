package S2.dto;

import S2.domein.Location;
import S2.domein.Map;

public class LocationDto {
    public int x, y;
    public LocationMetadata metadata;
    public int[][] deelmatrix;

    public LocationDto(int x, int y, LocationMetadata metadata, int[][] deelmatrix){
        this.x = x;
        this.y = y;
        this. metadata = metadata;
        this.deelmatrix = deelmatrix;
    }

    public static LocationDto getLocationDto(Location location, Map map){
        return getLocationDto(location.getX(), location.getY(), map);
    }

    public static LocationDto getLocationDto(int x, int y, Map map){
        Location location = map.getLocation(x, y);
        if (location != null) {
            LocationMetadata metadata = new LocationMetadata(location.getName(), location.getPhotoLocation());
            return new LocationDto(x, y, metadata, map.calculateDeelMatrix(x, y));
        }
        return null;
    }
}
