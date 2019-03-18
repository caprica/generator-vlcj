package <%= packageName %>;

import java.awt.*;
import java.awt.event.*;
import javax.swing.*;

import uk.co.caprica.vlcj.factory.MediaPlayerFactory;
import uk.co.caprica.vlcj.player.embedded.EmbeddedMediaPlayer;
import uk.co.caprica.vlcj.player.embedded.videosurface.VideoSurface;

public class <%= mainClassName %> {

    private static MediaPlayerFactory mediaPlayerFactory;

    private static EmbeddedMediaPlayer mediaPlayer;

    public static void main(String[] args) {
        if (args.length != 1) {
            System.err.println("Specify an MRL");
            System.exit(-1);
        }

        mediaPlayerFactory = new MediaPlayerFactory();

        mediaPlayer = mediaPlayerFactory.mediaPlayers().newEmbeddedMediaPlayer();

        Canvas canvas = new Canvas();
        canvas.setBackground(Color.black);

        JPanel contentPane = new JPanel();
        contentPane.setBackground(Color.BLACK);
        contentPane.setLayout(new BorderLayout());
        contentPane.add(canvas, BorderLayout.CENTER);

        VideoSurface videoSurface = mediaPlayerFactory.videoSurfaces().newVideoSurface(canvas);
        mediaPlayer.videoSurface().set(videoSurface);

        JFrame frame = new JFrame("<%= name %>");
        frame.setDefaultCloseOperation(JFrame.DO_NOTHING_ON_CLOSE);
        frame.setSize(new Dimension(1200, 800));
        frame.addWindowListener(new WindowAdapter() {
            @Override
            public void windowClosing(WindowEvent event) {
                mediaPlayer.release();
                mediaPlayerFactory.release();
                System.exit(0);
            }
        });
        frame.setContentPane(contentPane);
        frame.setVisible(true);

        String mrl = args[0];
        mediaPlayer.media().play(mrl);
    }

}