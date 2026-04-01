package S2.security;

import jakarta.ws.rs.core.SecurityContext;

import java.security.Principal;

public class MySecurityContext implements SecurityContext{
    private String name;
    private String role;
    private boolean isSecure;

    public MySecurityContext(String name, String role,  boolean isSecure) {
        this.name = name;
        this.role = role;
        this.isSecure = isSecure;
    }

    @Override
    public Principal getUserPrincipal() {
        return () -> name;
    }

    @Override
    public boolean isUserInRole(String role) {
        return role.equals(this.role);
    }

    @Override
    public boolean isSecure() {
        return isSecure;
    }

    @Override
    public String getAuthenticationScheme() {
        return SecurityContext.BASIC_AUTH;
    }

}


