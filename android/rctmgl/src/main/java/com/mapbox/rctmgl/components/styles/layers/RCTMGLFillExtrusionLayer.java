package com.mapbox.rctmgl.components.styles.layers;

import android.content.Context;

import com.mapbox.mapboxsdk.style.layers.FillExtrusionLayer;
import com.mapbox.mapboxsdk.style.layers.FillLayer;
import com.mapbox.mapboxsdk.style.layers.Filter;
import com.mapbox.rctmgl.components.mapview.RCTMGLMapView;
import com.mapbox.rctmgl.components.styles.RCTMGLStyle;
import com.mapbox.rctmgl.components.styles.RCTMGLStyleFactory;
import com.mapbox.rctmgl.components.styles.sources.RCTSource;

/**
 * Created by nickitaliano on 9/15/17.
 */

public class RCTMGLFillExtrusionLayer extends RCTLayer<FillExtrusionLayer> {
    private String mSourceLayerID;

    public RCTMGLFillExtrusionLayer(Context context) {
        super(context);
    }

    @Override
    public void addToMap(RCTMGLMapView mapView) {
        mMap = mapView.getMapboxMap();
        mMapView = mapView;
        mLayer = makeLayer();
        insertLayer();
        addStyles();

        Filter.Statement statement = buildFilter();
        if (statement != null) {
            mLayer.setFilter(statement);
        }
    }

    @Override
    public FillExtrusionLayer makeLayer() {
        FillExtrusionLayer layer = new FillExtrusionLayer(mID, mSourceID);

        if (mSourceLayerID != null) {
            layer.setSourceLayer(mSourceLayerID);
        }

        return layer;
    }

    @Override
    public void addStyles() {
        RCTMGLStyleFactory.setFillExtrusionLayerStyle(mLayer, new RCTMGLStyle(mReactStyle, mMap));
    }

    public void setSourceLayerID(String sourceLayerID) {
        mSourceLayerID = sourceLayerID;

        if (mLayer != null) {
            mLayer.setSourceLayer(mSourceLayerID);
        }
    }
}
