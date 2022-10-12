package api;

import java.net.URI;

import org.glassfish.jersey.server.ResourceConfig;

import jakarta.ws.rs.ApplicationPath;
import jakarta.ws.rs.core.Application;

@ApplicationPath("rest")
public class RestApi extends ResourceConfig {

	public RestApi() {
		packages(".");
	}
}
