package S2.domein;

public class Location {
    private int x;
    private int y;
    private String name;
    private String photoLocation;
    private boolean interacable;

    public Location(int x, int y, String name, String photoLocation, boolean interactable){
        this.x = x;
        this.y = y;
        this. name = name;
        this.photoLocation = photoLocation;
        this.interacable = interactable;
    }

    public int getX() {return x;}
    public int getY() {return y;}
    public String getName() {return name;}
    public String getPhotoLocation() {return photoLocation;}
    public boolean isInteractable() {return interacable;}

    @Override
    public String toString(){
        return String.format("loc: (%s,%s), name: %s", x, y, name);
    }
}


