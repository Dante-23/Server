package get;
import java.net.*;
import java.io.*;

public class HandleGet extends Thread{

    private ServerSocket ss;
    public HandleGet(int port) throws IOException{
        this.ss = new ServerSocket(port);
    }

    @Override
    public void run(){
        int i = 0;
        while(true){
            System.out.println("Receiving request number: " + i);
            try{
                Socket socket = ss.accept();
                // System.out.println("waiting to send response");
                // socket.wait(5);
                HandleSingleGet hsg = new HandleSingleGet(socket);
                hsg.start();
                // socket.close();
            }
            catch(Exception e){}
            i++;
        }
    }
}
