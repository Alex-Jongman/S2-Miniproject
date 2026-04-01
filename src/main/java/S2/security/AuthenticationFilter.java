package S2.security;

import S2.webservices.AuthenticationResource;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.Jwts;
import jakarta.annotation.Priority;
import jakarta.ws.rs.Priorities;
import jakarta.ws.rs.container.ContainerRequestContext;
import jakarta.ws.rs.container.ContainerRequestFilter;
import jakarta.ws.rs.core.HttpHeaders;
import jakarta.ws.rs.ext.Provider;

@Provider
@Priority(Priorities.AUTHENTICATION)
public class AuthenticationFilter implements ContainerRequestFilter {

    @Override
    public void filter(ContainerRequestContext requestCtx){
        boolean isSecure = requestCtx.getSecurityContext().isSecure(); //is https or similar used
        MySecurityContext msc = new MySecurityContext(null, null, isSecure); //treat user as guest unless otherwise proved

        String authHeader = requestCtx.getHeaderString(HttpHeaders.AUTHORIZATION); //get the Authorization Header
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring("Bearer".length()).trim();
            try {
                // Validate the token
                JwtParser parser = Jwts.parser()
                        .verifyWith(AuthenticationResource.key)
                        .build();
                Claims claims = parser.parseSignedClaims(token).getPayload();
                String name = claims.getSubject();
                String role = claims.get("role").toString();
                msc = new MySecurityContext(name, role, isSecure);
            } catch (JwtException e) {
                System.out.println("Invalid JWT, processing as guest!");
            }
        }
        requestCtx.setSecurityContext(msc);
    }
}
