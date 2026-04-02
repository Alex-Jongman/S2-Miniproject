package S2.webservices;

import S2.domein.*;
import S2.dto.LocationDto;
import S2.dto.PositionDto;
import jakarta.annotation.security.RolesAllowed;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.SecurityContext;

@Path("map")
public class MapResource {

    @GET
    @Path("{x}/{y}")
    @Produces("application/json")
    @RolesAllowed({"user", "admin"})
    public Response getLocationData(@PathParam("x") int x, @PathParam("y") int y){
        try {
            Map huMap = MapApplication.getMyHUMap();
            LocationDto dto = LocationDto.getLocationDto(x, y, huMap);
            if (dto == null) {
                return Response.status(400).entity(java.util.Map.of("error", "location not accessible")).build();
            }
            return Response.status(200).entity(dto).build();
        }
        catch (IndexOutOfBoundsException e){
            return Response.status(404).build();
        }
        catch(Exception e) {
            return Response.status(500).entity(java.util.Map.of("error", Util.getFullMessage(e))).build();
        }
    }

    @GET
    @Path("current_position")
    @Produces("application/json")
    @RolesAllowed({"user", "admin"})
    public Response getCurrentPosition(@Context SecurityContext secCtx){
        try {
            String userName = secCtx.getUserPrincipal().getName();
            User currentUser = MapApplication.getUserByName(userName);
            if (currentUser != null) {
                Location currentLocation = currentUser.getLocation();
                PositionDto dto = new PositionDto(currentLocation);
                return Response.status(200).entity(dto).build();
            }
            return Response.status(500).entity(java.util.Map.of("error", "user not found")).build();
        }
        catch(Exception e) {
            return Response.status(500).entity(java.util.Map.of("error", Util.getFullMessage(e))).build();
        }
    }

    @PUT
    @Path("{x}/{y}")
    @Produces("application/json")
    @RolesAllowed({"user", "admin"})
    public Response changeLocation(@Context SecurityContext secCtx, @PathParam("x") int x, @PathParam("y") int y){
        try {
            String userName = secCtx.getUserPrincipal().getName();
            User currentUser = MapApplication.getUserByName(userName);
            if (currentUser != null){
                Location currentLocation = currentUser.changeLocation(x, y);
                if (currentLocation != null) {
                    PositionDto dto = new PositionDto(currentLocation);
                    return Response.status(200).entity(dto).build();
                }
                else
                    return Response.status(400).entity(java.util.Map.of("error", "location not accessible")).build();
            }
            return Response.status(500).entity(java.util.Map.of("error", "user not found")).build();
        }
        catch (IndexOutOfBoundsException e){
            return Response.status(404).build();
        }
        catch(Exception e) {
            return Response.status(500).entity(java.util.Map.of("error", Util.getFullMessage(e))).build();
        }
    }

    @GET
    @Produces("application/json")
    public Response getMap(){
        try {
            Map huMap = MapApplication.getMyHUMap();
            return Response.status(200).entity(huMap).build();
        }
        catch(Exception e) {
            return Response.status(500).entity(java.util.Map.of("error", Util.getFullMessage(e))).build();
        }
    }

}
