import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import javax.imageio.ImageIO;

public class Count {
    public static void main (String [] args)
    {
        int images = 35;
        System.out.print("var sizes=[");
        for(int i=0;i<=images;i++)
        {
            File file = new File("cards/"+i+".png");
            BufferedImage image = null;
            try
            {
                image = ImageIO.read(file);
            }
            catch (IOException e)
            {
                e.printStackTrace();
            }
            int redCount = 0;
            int greenCount = 0;
            int blueCount = 0;
            int yellowCount = 0;
            for(int x=0;x<250;x++)
            {
                for(int y=0;y<350;y++)
                {
                    int color = image.getRGB(x, y);
                    if(color == -16711936)
                    {
                        greenCount++;
                    }
                    else if(color == -16776961)
                    {
                        blueCount++;
                    }
                    else if(color == -65536)
                    {
                        redCount++;
                    }
                    else if(color == -4096)
                    {
                        yellowCount++;
                    }
                }
            }
            System.out.print("["+redCount+","+greenCount+","+blueCount+","+yellowCount+"]");
            if(i<images)
            {
                System.out.print(",");
            }
        }
        System.out.println("];");
        for(int i=0;i<=images;i++)
        {
            System.out.println("      <div style=\"background-image: url('cards/"+i+".png');\" class=\"card\"></div>");
        }
    }
}
