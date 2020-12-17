package get;
import java.net.*;
import java.io.*;

public class HandleSingleGet extends Thread{
    private Socket socket;
    private String crlf = "\n\r";

    public HandleSingleGet(Socket socket){
        this.socket = socket;
    }

    public String getFileContents(String request) throws FileNotFoundException{
        GetRequestParser parser = new GetRequestParser(request);
        // System.out.println("filepath: " + filepath);
        String filepath = parser.getFilePath();
        System.out.println("filepath: " + filepath);
        FileContents fc = new FileContents(System.getProperty("user.dir") + "/files");
        System.out.println("filepath: " + filepath);
        return fc.getContents(filepath);
    }

    private String get200Response(String request, String filecontents){
        GetRequestParser grp = new GetRequestParser(request);
        String response_header = grp.getResponseHeader();

        filecontents = response_header +
                    "Content-Length: " + filecontents.getBytes().length + crlf +
                    crlf + filecontents + crlf + crlf;
        return filecontents;
    }

    private String get404Response(String request){
        GetRequestParser grp = new GetRequestParser(request);
        String response_header = grp.getFileNotFoundHeader();
        return response_header;
    }

    @Override
    public void run(){
        try{
            // sleep(5000);
            System.out.println("Serving");
            InputStream is = this.socket.getInputStream();
            OutputStream os = this.socket.getOutputStream();
            byte[] buffer = new byte[1024 * 2];
            is.read(buffer);
            String request = new String(buffer);
            // System.out.println("get keep alive: " + socket.getKeepAlive());
            // System.out.println("get local port: " + socket.getLocalPort());
            // System.out.println("get OOB inline: " + socket.getOOBInline());
            // System.out.println("get port: " + socket.getPort());
            // System.out.println("get receive buffer size: " + socket.getReceiveBufferSize());
            // System.out.println("get send buffer size: " + socket.getSendBufferSize());
            // System.out.println("get get so linger: " + socket.getSoLinger());
            // System.out.println("get so timeout: " + socket.getSoTimeout());
            // System.out.println("get traffic class: " + socket.getTrafficClass());
            // System.out.println("get inet address: " + socket.getInetAddress());
            

            System.out.println(request);

            String filecontents = this.getFileContents(request);
            
            String response;
            if(filecontents == null)
                response = this.get404Response(request);
            else response = this.get200Response(request, filecontents);
            os.write(response.getBytes());
            is.close();
            os.close();
            socket.close();
        }
        catch(Exception e){}
    }
}
