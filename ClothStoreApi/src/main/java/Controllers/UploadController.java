package Controllers;

import java.io.InputStream;

import org.glassfish.jersey.media.multipart.FormDataParam;

import Models.ClothImageModel;
import Models.ClothModel;
import Repository.ClothImageRepository;
import dbSettings.MySQLConnectionManagerImpl;
import fileManagement.UploadService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Path("/file_upload")
public class UploadController {

	@Context
	private HttpServletRequest servletRequest;

	ClothImageRepository rep = new ClothImageRepository(new MySQLConnectionManagerImpl());

	UploadService upload = new UploadService();

	@POST
	@Consumes(MediaType.MULTIPART_FORM_DATA)
	@Produces(MediaType.TEXT_PLAIN)
	public Response uploadFile(@FormDataParam("file") InputStream data, @FormDataParam("clothReference") int clothID,
			@FormDataParam("imageName") String imageName) {

		ClothImageModel clothImage = new ClothImageModel();
		ClothModel cloth = new ClothModel();

		cloth.setIdCloth(clothID);

		try {
			clothImage.setImageURL(upload.saveFile(data, clothID, imageName, servletRequest));

			rep.createClothImage(clothImage, cloth);

			return Response.status(200).entity(clothImage.getImageURL()).build();

		} catch (Exception e) {
			System.out.println(e);
			return Response.status(500).entity(e).build();
		}

	}
	
	@DELETE
	@Path("/{id}")
	@Produces(MediaType.TEXT_PLAIN)
	public Response deleteFiles(@PathParam("id") int id) {
	    try {
            
	        rep.deleteClothImages(id);
	        upload.deleteFiles(id, servletRequest);
	        
	        return Response.status(200).build();
	        
        } catch (Exception e) {
            System.out.println(e);
            return Response.status(500).build();
        }
	}
	
	
}
