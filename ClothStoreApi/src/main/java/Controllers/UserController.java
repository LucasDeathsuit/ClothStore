package Controllers;

import java.nio.charset.StandardCharsets;
import java.sql.SQLIntegrityConstraintViolationException;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;

import javax.crypto.SecretKey;

import Models.UserModel;
import Repository.UserRepository;
import api.Authentication.Secured;
import dbSettings.MySQLConnectionManagerImpl;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.Application;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;


@Path("/")
public class UserController {

	private final SecretKey KEY = Keys.hmacShaKeyFor(
			"7f-j&CKk=coNzZc0y7_4obMP?#TfcYq%fcD0mDpenW2nc!lfGoZ|d?f&RNbDHUX6".getBytes(StandardCharsets.UTF_8));

	UserRepository rep = new UserRepository(new MySQLConnectionManagerImpl());

	@POST
	@Path("/login")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response login(UserModel user) {
		try {
			UserModel userLogin = rep.doLogin(user);
			if (userLogin.isLoggedIn()) {
				String jwtToken = Jwts.builder().setSubject(userLogin.getUsername()).setIssuer("localhost:8080")
						.setIssuedAt(new Date())
						.setExpiration(Date
								.from(LocalDateTime.now().plusMinutes(15L).atZone(ZoneId.systemDefault()).toInstant()))
						.signWith(KEY, SignatureAlgorithm.HS256).compact();


				userLogin.setToken(jwtToken);
				
				return Response.status(Response.Status.OK).entity(userLogin).build();
			} else {
				return Response.status(Response.Status.UNAUTHORIZED).entity("Usuário e/ou senha inválidos").build();
			}

		} catch (Exception e) {
			System.out.println(e);
			return Response.status(500).entity(e.getMessage()).build();
		}
	}

	@POST
	@Path("/sign-up")
	@Consumes(MediaType.APPLICATION_JSON)
	public Response signUp(UserModel user) {
		try {
			if(rep.createUser(user)) {
				return Response.status(Response.Status.CREATED).entity(user).build();
			};
			return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
		} catch (SQLIntegrityConstraintViolationException e) {
			return Response.status(Response.Status.CONFLICT).entity("Usuário já em uso").build();
		}
		catch (Exception e) {
			return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(e.getMessage()).build();
		}
	}

	@GET
	@Path("/users")
	@Produces(MediaType.APPLICATION_JSON)
	public Response findAllUsers() {
		try {
			List<UserModel> users = rep.findAll();
			return Response.status(200).entity(users).build();
		} catch (Exception e) {
			System.out.println(e);
			return Response.status(500).entity("Error: " + e.getMessage()).build();
		}
	}	
	
	@Secured
	@GET
	@Path("/users/{username}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response findUser(@PathParam("username") String username) {
	    try {
	        UserModel user = rep.findUser(username);
	        
	        return Response.status(200).entity(user).build();
	    } catch (Exception e) {
	        System.out.println(e);
	        return Response.status(500).entity("Error: " + e.getMessage()).build();
	    }
	}
}
