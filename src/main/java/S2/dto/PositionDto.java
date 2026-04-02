package S2.dto;

import S2.domein.Location;

public class PositionDto {
    public int x, y;

    public PositionDto(int x, int y){
        this.x = x;
        this.y = y;
    }

    public PositionDto(Location location){
        this(location.getX(), location.getY());
    }
}
