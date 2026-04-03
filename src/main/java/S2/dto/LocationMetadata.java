package S2.dto;

public class LocationMetadata {
    public String name;
    public String photo;
    public boolean interactable;

    public LocationMetadata(String name, String photo, boolean interactable){
        this.name = name;
        this.photo = photo;
        this.interactable = interactable;
    }
}
