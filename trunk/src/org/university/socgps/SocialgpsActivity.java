package org.university.socgps;

import android.os.Bundle;
import com.phonegap.*;
public class SocialgpsActivity extends DroidGap {
    /** Called when the activity is first created. */
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        this.appView.getSettings().setPluginsEnabled(true); 
        super.loadUrl("file:///android_asset/www/index.html");
    }
}