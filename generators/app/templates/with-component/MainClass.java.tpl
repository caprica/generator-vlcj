package <%= packageName %>;

import java.awt.*;
import java.awt.event.*;
import javax.swing.*;

import uk.co.caprica.vlcj.player.base.MediaPlayer;
import uk.co.caprica.vlcj.player.component.EmbeddedMediaPlayerComponent;

public class <%= mainClassName %> {

    private static EmbeddedMediaPlayerComponent mediaPlayerComponent;

    public static void main(String[] args) {
        if (args.length != 1) {
            System.err.println("Specify an MRL");
            System.exit(-1);
        }

        mediaPlayerComponent = new EmbeddedMediaPlayerComponent() {
            @Override
            public void finished(MediaPlayer mediaPlayer) {
                System.out.println("Playback finished");
                System.exit(0);
            }

            @Override
            public void error(MediaPlayer mediaPlayer) {
                System.err.println("Error playing media");
                System.exit(-1);
            }
        };

        JFrame frame = new JFrame("<%= name %>");
        frame.setDefaultCloseOperation(JFrame.DO_NOTHING_ON_CLOSE);
        frame.setSize(new Dimension(1200, 800));
        frame.addWindowListener(new WindowAdapter() {
            @Override
            public void windowClosing(WindowEvent event) {
                mediaPlayerComponent.release();
                System.exit(0);
            }
        });
        frame.setContentPane(mediaPlayerComponent);
        frame.setVisible(true);

        String mrl = args[0];
        mediaPlayerComponent.mediaPlayer().media().play(mrl);
    }

}