package S2.webservices;

import S2.domein.MapApplication;
import S2.domein.Util;
import S2.dto.LocationDto;
import jakarta.annotation.security.RolesAllowed;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Response;
import S2.domein.Map;

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
