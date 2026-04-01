package S2.domein;

public class User {
    private String name;
    private String password;
    private String role;

    public User(String name, String password, String role){
        this.name = name;
        this.password = password;
        this.role = role;
    }

    public String getName(){return name;}
    public String getRole(){return role;}

    public boolean validateNameAndPassword(String name, String password){
        if (this.name.equalsIgnoreCase(name) && this.password.equals(password))
            return true;
        return false;
    }
}
