var x = function objSrcFn(src){
    AR.logger.activateDebugMode();
    AR.logger.debug('hello');
    AR.logger.debug(src);
}

var World = {
	loaded: false,
	rotating: false,
  objSrc: 'initial-value',

	init: function initFn() {
    AR.logger.activateDebugMode();
    this.createModelAtLocation();
	},

  setObjSrc: function setObjSrcFn(src){
    AR.logger.debug(src);
    this.objSrc = src;
  },

	createModelAtLocation: function createModelAtLocationFn() {
//    AR.logger.activateDebugMode();
		/*
			First a location where the model should be displayed will be defined. This location will be relative to the user.
		*/
		var location = new AR.RelativeLocation(null, 5, 0, 2);
    AR.logger.debug(this.objSrc);

		/*
			Next the model object is loaded.
		*/
		var modelEarth = new AR.Model("assets/earth.wt3", {
			onLoaded: this.worldLoaded,
			scale: {
				x: 1,
				y: 1,
				z: 1
			}
		});

        var indicatorImage = new AR.ImageResource("assets/indi.png");

        var indicatorDrawable = new AR.ImageDrawable(indicatorImage, 0.1, {
            verticalAnchor: AR.CONST.VERTICAL_ANCHOR.TOP
        });

		/*
			Putting it all together the location and 3D model is added to an AR.GeoObject.
		*/
		var obj = new AR.GeoObject(location, {
            drawables: {
               cam: [modelEarth],
               indicator: [indicatorDrawable]
            }
        });
	},

	worldLoaded: function worldLoadedFn() {
		World.loaded = true;
		var e = document.getElementById('loadingMessage');
		e.parentElement.removeChild(e);
	}
};

World.init();
