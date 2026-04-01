package S2.setup;

import jakarta.ws.rs.ApplicationPath;
import org.glassfish.jersey.server.ResourceConfig;
import org.glassfish.jersey.server.filter.RolesAllowedDynamicFeature;

@ApplicationPath("api")
public class JerseyConfig extends ResourceConfig {
    public JerseyConfig() {
        packages("S2.webservices", "S2.security");
        register(RolesAllowedDynamicFeature.class);
        System.out.println("JerseyConfig initialized");
    }
}