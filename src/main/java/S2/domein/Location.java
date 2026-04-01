package S2.domein;

public class Location {
    private int x;
    private int y;
    private String name;
    private String photoLocation;

    public Location(int x, int y, String name, String photoLocation){
        this.x = x;
        this.y = y;
        this. name = name;
        this.photoLocation = photoLocation;
    }

    public int getX() {return x;}
    public int getY() {return y;}
    public String getName() {return name;}
    public String getPhotoLocation() {return photoLocation;}

    @Override
    public String toString(){
        return String.format("loc: (%s,%s), name: %s", x, y, name);
    }
}


