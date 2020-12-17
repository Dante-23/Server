package get;
import java.util.HashMap;

public class GetRequestParser{
    private final String request;
    private final HashMap<String, String> hmap = new HashMap<>();
    private final String crlf = "\n\r";

    public GetRequestParser(String request){
        this.request = request;
        this.hmap.put(".css", "text/css");
        this.hmap.put(".js", "text/javascript");
        this.hmap.put(".html", "text/html");
    }

    public String getFilePath(){
        int ssp = this.request.indexOf(' ', 4);
        return this.request.substring(5, ssp);
    }

    private String getExtension(){
        String filepath = this.getFilePath();
        int dotindex = filepath.lastIndexOf(".");
        return filepath.substring(dotindex, filepath.length());
    }

    public String getResponseHeader(){
        String fileextension = this.getExtension();
        if(!this.hmap.containsKey(fileextension)) return null;
        String content_type = this.hmap.get(fileextension);
        String response_header = "HTTP/1.1 200 OK" + crlf + 
                                    "Server: Custom Java" + crlf + 
                                    "Content-type: " + content_type + crlf;
        return response_header;
    }

    public String getFileNotFoundHeader(){
        String header = "HTTP/1.1 404 Not Found" + crlf +
                            "Server: Custom Java" + crlf + crlf;
        return header;
    }
}
