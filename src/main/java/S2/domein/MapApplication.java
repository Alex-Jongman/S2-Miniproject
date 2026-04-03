package S2.domein;

import java.util.ArrayList;
import java.util.List;

public class MapApplication {
    private static Map myHUMap = new Map("HL15HUMap", MapApplication.createHUMatrix());
    private static List<User> users = createUsers();

    private static Location[][] createHUMatrix() {
        Location p1_1 = new Location(1, 1,"Chillcorner", "position_1-1.jpg");
        Location p2_1 = new Location(2, 1,"Bolle Gijs", "position_2-1.jpg");
        Location p3_1 = new Location(3, 1,"pos_3_1", "position_3-1.jpg");
        Location p4_1 = new Location(4, 1,"Villa Volta", "position_4-1.jpg");
        Location p5_1 = new Location(5, 1,"pos_5_1", "position_5-1.jpg");
        Location p6_1 = new Location(6, 1,"pos_6_1", "position_6-1.jpg");
        Location p7_1 = new Location(7, 1,"pos_7_1", "position_7-1.jpg");
        Location p8_1 = new Location(8, 1,"pos_8_1", "position_8-1.jpg");
        Location p9_1 = new Location(9, 1,"pos_9_1", "position_9-1.jpg");

        Location p1_2 = new Location(1, 2,"pos_1_2", "position_1-2.jpg");
        Location p2_2 = new Location(2, 2,"Pagode", "position_2-2.jpg");
        Location p5_2 = new Location(5, 2,"pos_5_2", "position_5-2.jpg");
        Location p6_2 = new Location(6, 2,"pos_6_2", "position_6-2.jpg");
        Location p8_2 = new Location(8, 2,"Koffie-corner", "position_8-2.jpg");
        Location p9_2 = new Location(9, 2,"pos_9_2", "position_9-2.jpg");

        Location p1_3 = new Location(1, 3,"WC", "position_1-3.jpg");
        Location p2_3 = new Location(2, 3,"pos_2_3", "position_2-3.jpg");
        Location p3_3 = new Location(3, 3,"pos_3_3", "position_3-3.jpg");
        Location p4_3 = new Location(4, 3,"pos_4_3", "position_4-3.jpg");
        Location p5_3 = new Location(5, 3,"Kabelbos", "position_5-3.jpg");
        Location p6_3 = new Location(6, 3,"pos_6_3", "position_6-3.jpg");
        Location p7_3 = new Location(7, 3,"pos_7_3", "position_7-3.jpg");
        Location p8_3 = new Location(8, 3,"pos_8_3", "position_8-3.jpg");
        Location p9_3 = new Location(9, 3,"pos_9_3", "position_9-3.jpg");

        return new Location[][]{
                new Location[]{null, null, null, null, null, null, null, null, null, null, null},
                new Location[]{null, p1_1, p2_1, p3_1, p4_1, p5_1, p6_1, p7_1, p8_1, p9_1, null},
                new Location[]{null, p1_2, p2_2, null, null, p5_2, p6_2, null, p8_2, p9_2, null},
                new Location[]{null, p1_3, p2_3, p3_3, p4_3, p5_3, p6_3, p7_3, p8_3, p9_3, null},
                new Location[]{null, null, null, null, null, null, null, null, null, null, null}
        };
    }

    private static List<User> createUsers() {
        ArrayList<User> users = new ArrayList<>();
        users.add(new User("Alex", "Welkom123", "user", myHUMap));
        users.add(new User("Andre", "Welkom123", "user", myHUMap));
        users.add(new User("Jos", "Welkom123", "admin", myHUMap));
        return users;
    }

    public static Map getMyHUMap(){ return myHUMap;}

    public static User getUserByName(String name){
        for (User user : users){
            if (user.getName().equalsIgnoreCase(name))
                return user;
        }
        return null;
    }

}
