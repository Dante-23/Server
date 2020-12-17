package get;
import java.util.Scanner;
import java.io.*;

class FileContents{
    private final String directory;

    public FileContents(String directory){
        this.directory = directory;
    }

    private boolean fileExists(String filename){
        File file = new File(this.directory);
        String files[] = file.list();
        for(String str: files){
            if(str.compareTo(filename) == 0) return true;
        }
        return false;
    }

    public String getContents(String filename) throws FileNotFoundException{
        if(!this.fileExists(filename)){
            System.out.println("not found");
            return null;
        }
        Scanner scan = new Scanner(new File(this.directory + "/" + filename));
        String res = "";
        while(scan.hasNextLine()){
            res += scan.nextLine();
        }
        scan.close();
        return res;
    }
}
