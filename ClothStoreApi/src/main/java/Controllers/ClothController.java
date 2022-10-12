package Controllers;

import java.util.List;

import Models.ClothModel;
import Repository.ClothRepository;
import api.Authentication.Secured;
import dbSettings.MySQLConnectionManagerImpl;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.QueryParam;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Path("/clothes")
public class ClothController {

	ClothRepository rep = new ClothRepository(new MySQLConnectionManagerImpl());

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public List<ClothModel> getClothes() {
		
		return rep.findAll();
	
	}
	
	@GET
	@Path("/query")
	public List<ClothModel> getClothesSingleImage() {
		List<ClothModel> clothes = rep.findAllClothesWithOneImage();
		return clothes;
	}

	@GET
	@Path("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getClothById(@PathParam("id") int id) {
		ClothModel cloth = rep.findClothById(id);

		if (cloth.getIdCloth() == 0) {
			return Response.status(Response.Status.NOT_FOUND).build();
		}

		return Response.status(Response.Status.OK).entity(cloth).build();
	}

	@GET
	@Path("/type/{type}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getClothByType(@PathParam("type") String type) {
		List<ClothModel> clothes = rep.findClothByType(type);

		return Response.status(200).entity(clothes).build();
	}

	@Secured
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response createCloth(ClothModel cloth) {

		if (rep.createCloth(cloth)) {
			return Response.status(Response.Status.CREATED).entity(cloth).build();
		}

		return Response.status(500).build();
	}

	@DELETE
	@Path("/{id}")
	public Response deleteCloth(@PathParam("id") int id) {

		if (rep.deleteCloth(id)) {
			return Response.status(Response.Status.OK).build();
		}

		return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
	}

	@PUT
	@Path("/{id}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response updateCloth(@PathParam("id") int id, ClothModel cloth) {

		if (rep.updateCloth(cloth, id)) {
			return Response.status(Response.Status.OK).entity(cloth).build();
		}

		return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
	}

}
