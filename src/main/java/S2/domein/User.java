package S2.domein;

public class User {
    private String name;
    private String password;
    private String role;
    private Map map;
    private Location location;

    public User(String name, String password, String role, Map map){
        this.name = name;
        this.password = password;
        this.role = role;
        this.map = map;
        if (map != null){
            this.location = map.getLocation(1,1);
        }
    }

    public String getName(){return name;}
    public String getRole(){return role;}
    public Location getLocation(){return location;}
    public Map getMap(){return map;}

    public Location changeLocation(int x, int y){
        if (map != null){
            this.location = map.getLocation(x, y);
        }
        return this.location;
    }

    public boolean validateNameAndPassword(String name, String password){
        if (this.name.equalsIgnoreCase(name) && this.password.equals(password))
            return true;
        return false;
    }
}
