package S2.domein;

import java.util.ArrayList;
import java.util.List;

public class Util {
    public static String getFullMessage(Throwable e) {
        List<String> messages = new ArrayList<>();
        String lastMessage = null;

        while (e != null) {
            String msg = e.getMessage();
            if (msg != null && !msg.equals(lastMessage)) {
                messages.add(e.getMessage());
                lastMessage = msg;
            }
            e = e.getCause();
        }

        return String.join(" -> ", messages);
    }
}
