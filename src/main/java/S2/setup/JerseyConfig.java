package S2.setup;

import S2.security.CORSRequestFilter;
import S2.security.CORSResponseFilter;
import jakarta.ws.rs.ApplicationPath;
import org.glassfish.jersey.jackson.JacksonFeature;
import org.glassfish.jersey.server.ResourceConfig;
import org.glassfish.jersey.server.filter.RolesAllowedDynamicFeature;

@ApplicationPath("api")
public class JerseyConfig extends ResourceConfig {
    public JerseyConfig() {
        packages("S2.webservices", "S2.security");
        register(RolesAllowedDynamicFeature.class);
        //for CORS filters
        register(CORSRequestFilter.class);
        register(CORSResponseFilter.class);
        // Register Jackson for JSON serialization
        register(JacksonFeature.class);
        System.out.println("JerseyConfig initialized");
    }
}