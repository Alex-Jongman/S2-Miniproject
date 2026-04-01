package S2;

import S2.domein.Map;
import S2.domein.MapApplication;

public class Main {
    public static void main(String[] args) {
        System.out.println("Hello FE Workshop");

        Map myHUMap = MapApplication.getMyHUMap();
        System.out.println(myHUMap);
    }
}
