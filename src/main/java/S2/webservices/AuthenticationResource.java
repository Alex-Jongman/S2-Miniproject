package S2.webservices;

import S2.domein.*;
import S2.dto.LogonRequest;
import io.jsonwebtoken.Jwts;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import javax.crypto.SecretKey;
import java.util.Calendar;
import java.util.Map;

@Path("authentication")
public class AuthenticationResource {
    public static final SecretKey key = Jwts.SIG.HS256.key().build(); // Used when signing & parsing the JWT

    private String createToken(String email, String role) {
        var expiration = Calendar.getInstance();
        expiration.add(Calendar.MINUTE, 30);

        return Jwts.builder()
                .subject(email)
                .expiration(expiration.getTime())
                .claim("role", role)
                .signWith(key)
                .compact();
    }

    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response authenticateUser(LogonRequest logonRequest) {
        try {
            User user = MapApplication.getUserByName(logonRequest.username);
            if (user != null && user.validateNameAndPassword(logonRequest.username, logonRequest.password)){
                // Issue a token for the user
                String token = createToken(user.getName(), user.getRole());

                //because we want to return json and Jackson doesn't convert strings we need an Object
                return Response.ok(Map.of("JWT", token)).build();
            } else
                return Response.status(Response.Status.UNAUTHORIZED).build();
        } catch (Exception e) {
            return Response.status(500).entity(Map.of("error", e.getMessage())).build();
        }
    }
}
