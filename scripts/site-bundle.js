/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	__webpack_require__(2);
	__webpack_require__(3);
	__webpack_require__(4);
	__webpack_require__(5);
	__webpack_require__(6);
	__webpack_require__(7);
	__webpack_require__(99);
	module.exports = __webpack_require__(100);


/***/ },
/* 1 */
/***/ function(module, exports) {

	if (!Y) {
	  Y = {};
	}
	
	if (!Y.Template) {
	  Y.Template = {};
	}
	
	/**
	 * Run these vanilla Javascript functions as soon as browser-ly possible.
	 */
	Y.Template.noYUI = {
	  init: function() {
	    this.setIndexFullscreenGalleryHeights();
	    this.scrollYPolyfill();
	    this.vCenterTopSectionContent();
	  },
	
	  /**
	   * Fills in the scrollY offset when browsers don't support that property.
	   * @method scrollYPolyfill
	   */
	  scrollYPolyfill: function() {
	    if (!window.scrollY) {
	      window.scrollY = window.pageYOffset || document.documentElement.scrollTop;
	
	      window.addEventListener( 'scroll', function () {
	        window.scrollY = window.pageYOffset || document.documentElement.scrollTop;
	      });
	    }
	  },
	
	  /**
	   * In indexes, especially when the gallery is the first page, there is some
	   * layout jank as the gallery is invoked and the height is calculated. This
	   * method pre sets the gallery height so visually there is no jankiness. This
	   * method should only be called once. After this, it's better to let the
	   * gallery script handle the height calculations.
	   */
	  setIndexFullscreenGalleryHeights: function() {
	    if (!document.querySelectorAll) {
	      return;
	    }
	
	    if (document.body.className.indexOf(' design-grid') > -1) {
	      return;
	    }
	
	    var galleries = document.querySelectorAll(
	      'body.collection-type-index.slideshow-aspect-ratio-fullscreen ' +
	      '.gallery-wrapper');
	
	    if (galleries.length === 0) {
	      return;
	    }
	
	    var viewportHeight = window.innerHeight;
	    for (var i = 0; i < galleries.length; i++) {
	      galleries[i].style.height = viewportHeight + 'px';
	    }
	  },
	
	  /**
	   * The "Transparent Header" tweak option absolutely positions the header
	   * (logo + nav) atop the first index section. If the first index section has
	   * a background image, we need to add some extra top-padding to the section's
	   * content to vertically center it between the bottom of the header and the
	   * top of the next index section.
	   * @method vCenterTopSectionContent
	   */
	  vCenterTopSectionContent: function() {
	    var headerPosition = window.getComputedStyle(document.getElementById('header'), null)
	      .getPropertyValue('position');
	    var $topSection = document.querySelector('.main-content .index-section:first-child');
	
	    if ($topSection) {
	      var isTopSectionWithMainImage = $topSection.querySelectorAll('.has-main-media').length > 0;
	      var isTopSectionWithGallery = $topSection.querySelectorAll('.index-gallery').length > 0;
	
	      if (headerPosition == 'absolute' && isTopSectionWithMainImage && !isTopSectionWithGallery) {
	        var $header = document.querySelector('#header .header-inner');
	        var $headerImage = header.querySelector('.title-logo-wrapper');
	        var $nav = document.querySelector('#mainNavigation');
	        var headerPaddingTop = parseInt(window.getComputedStyle($header, null).paddingTop, 10);
	
	        // by default, the nav wraps around the left/right side of the logo image.
	        // if there's not enough room, it drops below the logo image. in order to
	        // figure out which state it's in...
	        if($nav){
	          // temporarily force the nav into one line and add the width of the
	          // logo image and spacing around it and store the value. this is its
	          // width as if we never let it drop below the logo image.
	          $nav.style.whiteSpace='nowrap';
	          $nav.style.display='inline';
	          var tempNavWidth = $nav.offsetWidth + ($headerImage.offsetWidth*2 - 18);
	
	          // change it back
	          $nav.style.whiteSpace='normal';
	          $nav.style.display='block';
	
	          // compare the header width to the tempNavWidth to see if it would be
	          // too big to fit inside the header. if so, we can safely assume that
	          // it's dropped below the logo image, so we need to add the nav's height
	          // to the extra padding value.
	          var extraPadding = 0;
	          var headerImageHeight = $headerImage.offsetHeight;
	
	          if ($header.offsetWidth < tempNavWidth) {
	            extraPadding = ((headerImageHeight + headerPaddingTop) / 2) + $nav.offsetHeight;
	          } else {
	            extraPadding = ((headerImageHeight + headerPaddingTop) / 2);
	          }
	          $topSection.querySelector('.content-inner').style.paddingTop = extraPadding + 'px';
	
	          // setting an interval to check if the height has change (i.e., the logo
	          // image has leoaded) and then reset the padding. This gets around setting
	          // wrong padding if the logo hasn't loaded yet.
	          var checkHeight = function() {
	            return headerImageHeight === $headerImage.offsetHeight;
	          };
	
	          var logoHeightInterval = function() {
	            nIntervId = setInterval(function() {
	              if (checkHeight() === false) {
	                if ($header.offsetWidth < tempNavWidth) {
	                  extraPadding = (($headerImage.offsetHeight + headerPaddingTop) / 2) + $nav.offsetHeight;
	                } else {
	                  extraPadding = (($headerImage.offsetHeight + headerPaddingTop) / 2);
	                }
	                $topSection.querySelector('.content-inner').style.paddingTop = extraPadding + 'px';
	                clearInterval(nIntervId);
	              }
	            }, 10);
	
	            setTimeout(function() {
	              clearInterval(nIntervId);
	            }, 1000);
	          };
	
	          logoHeightInterval();
	        }
	      }
	    }
	  }
	};
	
	// Invoke the init method before domready.
	Y.Template.noYUI.init();


/***/ },
/* 2 */
/***/ function(module, exports) {

	(function () {
		var css = '.disable-hover:not(.sqs-layout-editing) #siteWrapper, .disable-hover:not(.sqs-layout-editing) #siteWrapper * {' +
			'pointer-events: none !important;' +
		'}';
		var head = document.head || document.getElementsByTagName('head')[0];
		var style = document.createElement('style');
		var body = document.body;
		var timer;
	
		style.type = 'text/css';
	
		if (style.styleSheet){
			style.styleSheet.cssText = css;
		} else {
			style.appendChild(document.createTextNode(css));
		}
	
		head.appendChild(style);
	
		window.addEventListener('scroll', function() {
			clearTimeout(timer);
			if(!body.classList.contains('disable-hover')) {
				body.classList.add('disable-hover');
			}
	
			timer = setTimeout(function(){
				body.classList.remove('disable-hover');
			},200);
		}, false);
	})();


/***/ },
/* 3 */
/***/ function(module, exports) {

	Y.namespace('Template').Lazyload = Class.create({
	
		initialize: function (config) {
	
			this.el = config.el;
			this.mobile = config.mobile || false;
			this.loadEvent = config.loadEvent || 'throttle';
	
			if (typeof this.loadEvent == 'string') {
				this.loadEvent = this.loadEvent.toLowerCase();
			}
	
			if (!this.el) {
				console.error('lazyload.js: You must define an element.');
				return false;
			}
	
			if (this.mobile === false && Y.UA.mobile) {
				Y.all(this.el).each(function (img) {
					ImageLoader.load(img, {
						load: true
					});
				});
				return false;
			}
	
			this.bindUI();
		},
	
		bindUI: function () {
			Y.all('img[data-load="viewport"]').each(function (img) {
				ImageLoader.load(img);
			});
	
			this.loadImages();
	
			if (this.loadEvent == 'debounce') {
				this.mitigate = function () {
					if (this.timeout) {
						this.timeout.cancel();
					}
					this.timeout = Y.later(100, this, this.loadImages);
				};
			} else {
				this.mitigate = Y.throttle(this.loadImages, 200, this);
			}
	
			Y.one(window).on('scroll', this.mitigate, this);
		},
	
		loadImages: function () {
			Y.all(this.el).each(function (img) {
				if (img.getY() < Y.config.win.innerHeight * 1.5 + Y.config.win.scrollY) {
					ImageLoader.load(img, {
						load: true
					});
				}
			});
		},
	
		refresh: function () {
			this.loadImages();
		}
	
	});

/***/ },
/* 4 */
/***/ function(module, exports) {

	Y.namespace('Template').RevealOnScroll = Class.create({
	
		initialize: function (config) {
	
			this.el = config.el;
			this.offsetEl = config.offsetEl;
			this.behavior = config.behavior || 'top';
	
			if (typeof this.behavior == 'string') {
				this.behavior = this.behavior.toLowerCase();
			}
	
			if (!this.el) {
				console.error('sticky.js: You must specify an element.');
				return false;
			}
	
			if (!Y.one(this.el)) {
				return false;
			}
	
			this.bindUI();
	
		},
	
		bindUI: function () {
	
			this.getVariables();
	
			Y.one(window).on('resize', function () {
				this.getVariables();
				this.showOrHide();
			}, this);
	
			this.throttle = Y.throttle(Y.bind(function () {
				this.showOrHide();
			}, this), 200);
	
			this.debounce = function () {
				if (this.timeout) {
					this.timeout.cancel();
				}
				this.timeout = Y.later(100, this, this.showOrHide);
			};
	
			Y.one(window).on('scroll', function () {
				this.throttle();
				this.debounce();
			}, this);
	
			Y.one(window).on('hashchange', this.debounce, this);
	
			this.showOrHide();
	
		},
	
		getVariables: function () {
	
			if (Y.one(this.offsetEl)) {
				if (this.behavior == 'bottom') {
					this.y = Y.one(this.offsetEl).getY() +
						Y.one(this.offsetEl).get('clientHeight') -
						Y.one(this.el).get('clientHeight');
				} else {
					this.y = Y.one(this.offsetEl).getY() -
						Y.one(this.el).get('clientHeight');
				}
			}
	
		},
	
		showOrHide: function () {
	
			var scrollValue = Y.config.win.scrollY;
	
			if (scrollValue >= this.y) {
				Y.one(this.el).addClass('show');
			} else {
				Y.one(this.el).removeClass('show');
			}
	
		}
	
	});


/***/ },
/* 5 */
/***/ function(module, exports) {

	Y.namespace('Template').CenterNav = Class.create({
	
		initialize: function (config) {
	
			// the selector for the individual nav items.
			this.navItems = config.navItems;
			// the element you want to center around. usually the logo/site title.
			this.centerEl = config.centerEl;
			// the wrapper that contains the nav and the element you want to center around.
			this.wrapper = config.wrapper;
			// the wrapper around the nav that you want to pull up and over into place.
			this.innerWrapper = config.innerWrapper;
	
			if (!this.navItems) {
				console.error('centernav.js: You must specify the nav items selector.');
				return false;
			} else if (!this.centerEl) {
				console.error('centernav.js: You must specify an element to center around.');
				return false;
			} else if (!this.wrapper) {
				console.error('centernav.js: You must specify an outer wrapper that contains the nav items and nav wrapper.');
				return false;
			} else if (!this.innerWrapper) {
				console.error('centernav.js: You must specify an inner nav wrapper.');
				return false;
			}
	
			this.bindUI();
	
		},
	
		bindUI: function () {
	
			if (Y.all(this.navItems).size() > 1) {
	
				// the amount of space on either side of the element you're centering around.
				this.CENTER_SPACING = 30;
	
				this.getVariables();
	
				this.navSpace = (this.wrapperWidth - this.centerElWidth) / 2;
	
				// if they have a shop, save room for the cart tag
				if (Y.one('.custom-cart')) {
					this.navSpace = ( 
						((this.wrapperWidth - this.centerElWidth) / 2) 
						- (Y.one('.custom-cart').get('offsetWidth') 
						+ parseInt( Y.Squarespace.Template.getTweakValue('headerPadding'), 10 )) 
					);
				}
	
				this.navItemsSplitPoint = Math.round(Y.all(this.navItems).size() / 2);
				this.splitPointWidth = Y.all(this.navItems).item(this.navItemsSplitPoint - 1).get('offsetWidth');
				this.navItemsLeft = Y.all(this.navItems).slice(0, this.navItemsSplitPoint);
				this.navItemsRight = Y.all(this.navItems).slice(this.navItemsSplitPoint);
	
				// look for odd number of links, then decide where the extra (middle) one goes.
				if (Y.all(this.navItems).size() % 2 !== 0) {
					if ( 
						this.navItemsLeft.get('offsetWidth').reduce(this.sum, 0) 
						- this.splitPointWidth 
						> this.navItemsRight.get('offsetWidth').reduce(this.sum, 0) 
					) {
						this.navItemsSplitPoint = this. navItemsSplitPoint - 1;
						this.navItemsLeft = Y.all(this.navItems).slice(0, this.navItemsSplitPoint);
						this.navItemsRight = Y.all(this.navItems).slice(this.navItemsSplitPoint);
					}
				}
	
				this.calculateWidthDiff();
	
				// the links immediately to the left and right of the split point
				this.leftOfLogo = Y.all(this.navItems).item(this.navItemsSplitPoint - 1);
				this.rightOfLogo = Y.all(this.navItems).item(this.navItemsSplitPoint);
	
				// if either side of the nav is bigger than the space available for it, move it below
				if ( 
					this.navItemsLeft.get('offsetWidth').reduce(this.sum, 0) > (this.navSpace - 12) || 
					this.navItemsRight.get('offsetWidth').reduce(this.sum, 0) > (this.navSpace - 12) 
				) {
	
					this.destroy();
	
					Y.one(this.innerWrapper).setStyles({
						marginLeft: 0,
						marginTop: '10px',
						marginBottom: 0
					});
	
				} else {
	
					this.destroy();
					Y.one(this.leftOfLogo).setStyle('marginRight', this.centerElWidth / 2);
					Y.one(this.rightOfLogo).setStyle('marginLeft', this.centerElWidth / 2);
	
					var navHeight = parseInt(Y.one(this.innerWrapper).getComputedStyle('height'), 10);
					Y.one(this.innerWrapper).setStyles({
						// pulls it to the left or right based on the difference between the 2 sides
						marginLeft: this.widthDiff,
						// and up to vertically align it with the logo/site title
						marginTop: Math.ceil( -1 * ((this.centerElHeight / 2) + (navHeight / 2)) ),
						// this is to cancel out the negative top margin and keep the wrapper the correct height
						marginBottom: Math.ceil( ((this.centerElHeight / 2) + (navHeight / 2)) - navHeight )
					});
					
				}
	
			}
	
			Y.one(this.innerWrapper).addClass('positioned');
	
		},
	
		destroy: function () {
			Y.all(this.navItems).removeAttribute('style');
		},
	
		getVariables: function () {
			this.wrapperWidth = Y.one(this.wrapper).get('offsetWidth') - (2 * parseInt(Y.Squarespace.Template.getTweakValue('headerPadding'), 10));
			this.centerElWidth = Y.one(this.centerEl).get('offsetWidth') + (2 * this.CENTER_SPACING);
			this.centerElHeight = Y.one(this.centerEl).get('offsetHeight');
		},
	
		calculateWidthDiff: function () {
			this.widthDiff = 
			this.navItemsRight.get('offsetWidth').reduce(this.sum, 0) 
			- this.navItemsLeft.get('offsetWidth').reduce(this.sum, 0);
		},
	
		sum: function (el1, el2) {
			if (typeof el1 == 'number' && typeof el2 == 'number') {
				return el1 + el2;
			} else {
				console.warn("centernav.js sum function: can't add non-numbers.");
				return false;
			}
		}
	
	});


/***/ },
/* 6 */
/***/ function(module, exports) {

	Y.namespace('Template').Gallery = Class.create({
	  initialize: function (config) {
	    this.slides = config.slides;
	    this.wrapper = config.wrapper;
	
	    if (!this.slides) {
	      console.error('index-gallery.js: You have to define the slides selector.');
	      return false;
	    }
	
	    if (!this.wrapper) {
	      console.error('index-gallery.js: You have to define the wrapper selector.');
	      return false;
	    }
	
	    if (!Y.one(this.wrapper) || !Y.one(this.slides)) {
	      return false;
	    }
	
	    this.getTweaks();
	    this.bindUI();
	    this.syncUI();
	  },
	
	
	  bindUI: function () {
	    if (this.tweak.design == 'grid') {
	      this.loadGridImages();
	      this.lightboxSet = [];
	
	      Y.one(this.wrapper).all(this.slides).each(function (slide) {
	        var isVideo = slide.one('.sqs-video-wrapper');
	        var content = isVideo ? slide.one('.sqs-video-wrapper') : slide.one('img');
	        var meta = isVideo ? null : slide.one('.slide-meta-content') && slide.one('.slide-meta-content').getHTML();
	
	        this.lightboxSet.push({
	          content: content,
	          meta: meta
	        });
	
	        slide.on('click', function (e) {
	          e.halt();
	
	          if (slide.one('.clickthrough-link')) {
	            e.stopPropagation();
	            window.location = slide.one('.clickthrough-link').getAttribute('href');
	          } else {
	            if (this.gallery) {
	              this.gallery.destroy();
	            }
	
	            this.gallery = new Y.Squarespace.Lightbox2({
	              controls: {
	                previous: true,
	                next: true
	              },
	              currentSetIndex: Y.one(this.wrapper).all(this.slides).indexOf(slide),
	              set: this.lightboxSet
	            });
	
	            this.gallery.render();
	          }
	        }, this);
	      }, this);
	
	    } else {
	      var autoHeight = false;
	      if (this.tweak.aspect == 'auto') {
	        autoHeight = true;
	      }
	
	      var autoPlay = false;
	      if (this.tweak.autoplay === true) {
	        autoPlay = true;
	      }
	
	      if (this.tweak.aspect == 'fullscreen' && this.tweak.design == 'slideshow') {
	        this.fullscreen();
	      }
	
	      this.wrapper.generateID();
	      this.nodeID = '#' + this.wrapper.get('id');
	      this.galleryManager = [];
	      this.gallery = new Y.Squarespace.Gallery2({
	        container: this.wrapper,
	        design: 'stacked',
	        autoplay: autoPlay,
	        designOptions: {
	          autoHeight: autoHeight,
	          clickBehavior: 'auto',
	          transition: this.tweak.transition
	        },
	        elements: {
	          controls: this.nodeID + ' ~ .circles',
	          next:     this.nodeID + ' ~ .next-slide',
	          previous: this.nodeID + ' ~ .previous-slide'
	        },
	        historyHash: false,
	        keyboard: false,
	        lazyLoad: true,
	        loaderOptions: {
	          mode: 'fill'
	        },
	        loop: 'true',
	        refreshOnResize: true,
	        slides: this.slides
	      });
	
	      Y.one(this.wrapper).delegate('click', function (e) {
	        e.halt();
	        e.currentTarget.ancestor(this.slides).toggleClass('hide-meta');
	      }, '.hide-meta-toggle');
	
	      this.galleryManager.push(this.gallery);
	      this.keyboardControls();
	
	    }
	
	  },
	
	
	  syncUI: function () {
	    Y.Template.helper.on('resizeend', function () {
	      if (this.tweak.design == 'grid') {
	        this.loadGridImages();
	      }
	
	      if (!Y.UA.touchEnabled && this.tweak.aspect == 'fullscreen' && this.tweak.design == 'slideshow') {
	        this.fullscreen();
	      }
	    }, this);
	
	    Y.Global.on('tweak:reset', this.refresh, this);
	    Y.Global.on('tweak:change', function (e) {
	      var name = e.getName();
	
	      if (
	        name == 'grid-aspect-ratio' ||
	        name == 'slideshow-aspect-ratio' ||
	        name == 'design' ||
	        name == 'gallery-controls' ||
	        name == 'slideshow-transition' ||
	        name == 'slideshow-autoplay'
	      ) {
	        this.refresh();
	      }
	
	      if (
	        name == 'grid-aspect-ratio' ||
	        name == 'slideshow-aspect-ratio' ||
	        name == 'design' ||
	        name == 'grid-max-columns'
	      ) {
	        Y.one(window).simulate('resize');
	      }
	
	    }, this);
	
	  },
	
	
	  getTweaks: function () {
	    this.tweak = {
	      aspect:       this.getTweakValue('slideshow-aspect-ratio'),
	      design:       this.getTweakValue('design'),
	      nav:          this.getTweakValue('gallery-controls'),
	      transition:   this.getTweakValue('slideshow-transition'),
	      autoplay:     this.getTweakValue('slideshow-autoplay')
	    };
	  },
	
	
	  getTweakValue: function (name) {
	    var value = Y.Squarespace.Template.getTweakValue(name);
	
	    if (Y.Lang.isString(value)) {
	      value = value.toLowerCase();
	    }
	
	    if (value === 'true') {
	      value = true;
	    } else if (value === 'false') {
	      value = false;
	    }
	
	    return value;
	  },
	
	
	  keyboardControls: function () {
	    Y.one(window).on('keyup', function (e) {
	
	      Y.all(this.wrapper).each(function (gallery, i) {
	        if (
	          gallery.inViewportRegion() &&
	          (e.keyCode == 37 || e.keyCode == 39)
	        ) {
	          var direction = 1;
	
	          if (e.keyCode == 37) {
	            direction = -1;
	          }
	
	          this.galleryManager[i].set(
	            'currentIndex',
	            this.galleryManager[i].get('currentIndex') + direction
	          );
	        }
	      }, this);
	    }, this);
	  },
	
	
	  fullscreen: function () {
	    if (Y.one('#header .mobile-nav-toggle-label').getComputedStyle('display') == 'none') {
	      this.mobileNavShowing = false;
	    } else {
	      this.mobileNavShowing = true;
	    }
	
	    Y.all(this.wrapper).each(function (gallery) {
	      if (this.mobileNavShowing) {
	        gallery.setStyle('height', Y.config.win.innerHeight);
	      } else if (Y.one('#siteWrapper #content .index-section.gallery:first-child') && Y.one('#showOnScrollWrapper #mainNavWrapper') ) {
	        gallery.setStyle('height', Y.config.win.innerHeight - Y.one('#showOnScrollWrapper #mainNavWrapper').get('clientHeight'));
	        Y.one('#siteWrapper #content .index-section.gallery:first-child .gallery-wrapper').setStyle('height', Y.config.win.innerHeight);
	      } else if (Y.one('#showOnScrollWrapper #mainNavWrapper')) {
	        gallery.setStyle('height', Y.config.win.innerHeight - Y.one('#showOnScrollWrapper #mainNavWrapper').get('clientHeight'));
	      } else {
	        gallery.setStyle('height', Y.config.win.innerHeight);
	      }
	    }, this);
	  },
	
	
	  loadGridImages: function () {
	    Y.one(this.wrapper).all(this.slides).each(function (slide) {
	      if (slide.one('.sqs-video-wrapper')) {
	        slide.one('.sqs-video-wrapper').plug(Y.Squarespace.VideoLoader, {
	          mode: 'fill'
	        });
	      } else {
	        ImageLoader.load(slide.one('img'), {
	          load: true,
	          mode: 'fill'
	        });
	      }
	    }, this);
	  },
	
	
	  destroy: function () {
	    Y.all(this.wrapper).each(function (wrapper) {
	      wrapper.detachAll();
	      wrapper.removeAttribute('style');
	    }, this);
	
	    Y.all(this.slides).each(function (slide) {
	      slide.detachAll();
	      slide.removeAttribute('style');
	    }, this);
	
	    if (this.gallery) {
	      this.gallery.destroy();
	    }
	  },
	
	  refresh: function () {
	    this.destroy();
	    this.getTweaks();
	    this.bindUI();
	  }
	
	});


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var VideoBackgroundRenderer = __webpack_require__(8).VideoBackground;
	var GetVideoProps = __webpack_require__(8).getVideoProps;
	
	Y.use('node', function (Y) {
	
		Y.namespace('Template').Site = Singleton.create({
	
			ready: function () {
				this.regularHeaderForGridGallery();
	
				Y.on('domready', function () {
					this.init();
				}, this);
			},
	
			init: function() {
	
				this.cartState();
	
				if (Y.one('.index-section .index-section-image')) {
					this.fadeInFirstIndexSectionImageOnLoad();
				}
	
	
				this.transparentHeaderPadding();
	
				this.textShrink('#siteTitle a','#siteTitle');
				this.textShrink('.index-gallery .slide-meta-content .title','.index-gallery .slide-meta-content');
				this.textShrink('.index-section-wrapper.has-main-media .sqs-block-content h1','.index-section-wrapper.has-main-media .sqs-block-content');
				this.textShrink('.banner-thumbnail-wrapper .desc-wrapper h1','.banner-thumbnail-wrapper .desc-wrapper');
				this.textShrink('.quote-block figure','.sqs-block.quote-block');
				this.textShrink('.page-description p','.page-description');
	
	
				this.getVariables();
	
				// Inject the content for the show on scroll script.
				this.wrapper = Y.Node.create('<div class="show-on-scroll-wrapper" id="showOnScrollWrapper"></div>');
				this.injectScrollNavContent();
	
				this.syncUI();
				this.bindUI();
	
				if (Y.one('.always-use-overlay-nav') || Y.config.win.innerWidth <= 768) {
					Y.Template.helper.radioCheckboxes('#mainNavigation');
					Y.Template.helper.radioCheckboxes('#mobileNavigation');
				} else {
					Y.Template.helper.folderRedirect('#headerNav .folder-toggle-label');
					Y.Template.helper.folderRedirect('#footer .folder-toggle-label');
				}
	
				var videoBackgroundNodes = Array.prototype.slice.call(document.body.querySelectorAll('div.sqs-video-background'));
	      var videoBackgrounds = videoBackgroundNodes.map(function(item) {
	        return new VideoBackgroundRenderer(GetVideoProps(item));
	      });
	
			},
	
			fadeInFirstIndexSectionImageOnLoad: function () {
				if (Y.one('.index-section-image img')) {
					var image = Y.one('.index-section-image img');
					var src = image.getAttribute('src');
	
					if (src) {
						var tempImage = new Image();
						tempImage.onload = function() {
							this.addClass('loaded')
						}.bind(image);
						tempImage.src = src;
					} else {
						ImageLoader.load(image.removeAttribute('data-load'));
						image.addClass('loaded');
					}
				}
			},
	
			/**
			 * Sets up an instance of MutationObserver, a DOM API that allows you to react to changes in the DOM.
			 * If MutationObserver is not supported, the callback will pass null arguments and a fallback can be
			 * specified in the callback.
			 *
			 * @method mutationObserver
			 * @param  {Node} 		target 		The node on which to observe DOM mutations
			 * @param  {Object}		options 	Specifies which DOM mutations should be reported
			 * @param  {Function} 	callback	The function which will be called on each DOM mutation. The observer will
			 *                              	call this function with two arguments: (1) an array of objects, each of
			 *                              	type MutationRecord, and (2) the MutationObserver instance.
			 */
			mutationObserver: function (target, options, callback) {
	
				var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
	
				if (MutationObserver) {
	
					var observer = new MutationObserver(callback);
					observer.observe(target, options);
	
					// Stop observing after a while... ?
					var timer = Y.later(15000, this, function(){
						observer.disconnect();
						timer.cancel();
					});
	
				} else {
	
					// Fallback ( < IE10 )
					callback(null, null);
				}
	
			},
	
			bindUI: function () {
				this.mutationObserver(Y.one('#siteWrapper').getDOMNode(),
					{childList: true, subtree: true}, this.mutationCallback);
	
				Y.one(window).on('resize', function(){
					this.getVariables();
					this.syncUI();
					Y.Template.noYUI.vCenterTopSectionContent();
				}, this);
	
				Y.Squarespace.Singletons.ShoppingCart.on('change', Y.Template.Site.cartState);
	
				this.disableScroll();
	
				Y.Template.helper.on('resizeend', function () {
					Y.all('.map-block[data-block-json]').each(function (map) {
						Y.Template.helper.centerMapPin(
					map.one('.page-map'), JSON.parse(map.getData('block-json'))
					);
					});
				});
	
				if (Y.one('.collection-type-index')) {
					Y.all('.index-gallery').each(function (gallery) {
						new Y.Template.Gallery({
							wrapper: gallery.one('.gallery-wrapper'),
							slides: '.slide-wrapper'
						});
					});
	
					if (Y.one('.collection-type-index.homepage')) {
						// Initiate the sticky header.
						new Y.Template.RevealOnScroll({
							el: '#showOnScrollWrapper',
							offsetEl: '.index-section-wrapper',
							behavior: 'bottom'
						});
	
					}
	
				}
	
				if (
					Y.one('.index-section-image img') &&
					Y.all('.index-section-image img').length >= 2
				) {
					if (!this.lazyload) {
						this.lazyload = new Y.Template.Lazyload({
							el: '.index-section-image img',
							mobile: false,
							loadEvent: 'throttle'
						});
					} else {
						this.lazyload.refresh();
					}
				} else {
					Y.all('.index-section-image img').each(function (img) {
						ImageLoader.load(img.removeAttribute('data-load'));
					});
				}
	
				this.scrollNav();
				this.altSections(Y.all('.index-section.no-main-image'));
				Y.Template.helper.scrollAnchors();
	
			},
	
			syncUI: function () {
	
				this.runCenterNav();
				this.overlayNavPadding();
				this.folderEdgeDetection();
	
				Y.Template.helper.on('resizeend', this.scrollNav, this);
				Y.Template.helper.on('resizeend', this.injectScrollNavContent(), this);
	
				if (Y.one('.collection-type-index.homepage')) {
					/*
						Make the Index Links in the Nav Scroll Smoothly.
					*/
	
					this.scrollNavHeight = Y.one('#showOnScrollWrapper #mainNavWrapper') ? Y.one('#showOnScrollWrapper #mainNavWrapper').get('clientHeight') : 0;
	
					Y.all(this.navLinks).each(function (a) {
	
						a.on('click', function (e) {
							window.location.hash && history.pushState('', document.title, window.location.pathname);
							e.halt();
	
							var hash = a.getAttribute('href');
							var scrollPoint;
	
							if (hash.charAt(0) === '/') {
								hash = hash.substr(1);
							}
	
							if (!Y.one(hash)) {
								return;
							}
	
							if (this.mobileNav) {
								scrollPoint = Y.one(hash).getY() + 1;
							} else {
								scrollPoint = Y.one(hash).getY() - this.scrollNavHeight + 1;
							}
	
							if (this.mobileNav) {
								Y.one('#mobileNavToggle').set('checked',false).simulate('change');
	
								Y.later(400, this, function() {
									Y.Template.helper.smoothScrollTo(scrollPoint);
								});
	
							} else {
								Y.Template.helper.smoothScrollTo(scrollPoint);
							}
						}, this);
					}, this);
	
				} else if (this.mobileNav) {
	
					Y.all(this.navLinks).each(function (a) {
	
						a.on('click', function (e) {
	
							Y.one('#mobileNavToggle')
								.set('checked',false)
								.simulate('change');
	
						}, this);
	
					}, this);
	
				}
	
			},
	
			/**
			 * A MutationObserver callback that allows us to make any necessary adjustments if nodes are dynamically loaded into the DOM.
			 *
			 * @method mutationCallback
			 * @param  {Array}				mutations 	An array of MutationRecord objects
			 * @param  {MutationObserver} 	observer 	Our instance of the observer
			 */
			mutationCallback: function (mutations, observer) {
				if (mutations) {
					for (var i = 0; i < mutations.length; i++) {
						if (mutations[i].addedNodes.length) {
							for (var j = 0; j < mutations[i].addedNodes.length; j++) {
								// Refire ImageLoader on index section background images
								var newNode = Y.Node(mutations[i].addedNodes[j]);
								if (newNode.ancestor('.index-section-wrapper.has-main-media')) {
									ImageLoader.load(newNode.ancestor('.index-section-wrapper').one('.index-section-image img'));
								}
	
								// Adjust scroll position
								if(window.location.hash) {
									var hash = window.location.hash;
	
									if (hash.charAt(0) === '/') {
										hash = hash.substr(1);
									}
	
									if (Y.one(hash)) {
										Y.one(window).set('scrollTop', Y.one(hash).getY() + 1);
									}
								}
							}
						}
					}
	
				} else {
					// Fallback ( < IE10 )
					// Refire ImageLoader on index section background images 1200ms after an io:end event.
					Y.on('io:end', function(e){
						var timer = Y.later(1200, this, function(){
							Y.all('.index-section-image img').each(function(img){
								ImageLoader.load(img);
							});
							timer.cancel();
						});
					});
				}
			},
	
			getVariables: function () {
				this.headerHeight = Y.one('#header').get('offsetHeight');
	
				this.mobileNav = Y.one('.always-use-overlay-nav') || Y.config.win.innerWidth <= 768;
				this.navLinks = '.nav-wrapper .index.home a';
	
				if (Y.one('#header .mobile-nav-toggle-label').getComputedStyle('display') == 'none') {
					this.mobileNavShowing = false;
				} else {
					this.mobileNavShowing = true;
				}
			},
	
			scrollNav: function () {
	
				if (Y.one('.collection-type-index.homepage') && Y.one('#header #mainNavWrapper') && Y.one('.index.home')) {
	
					var indexSection = Y.all('.index-section:not(.gallery)');
					var indexNavItems = this.mobileNavShowing ? Y.all('#mobileNavWrapper .index.home') : Y.all('#showOnScrollWrapper #mainNavigation .index.home');
					var current = 0;
					var last = 0;
					var offset = this.mobileNavShowing ? 0 : Y.one('#showOnScrollWrapper #mainNavWrapper').get('clientHeight') + 1;
	
					var throttle = Y.throttle(Y.bind(function () {
	
						indexSection.each(function (section, i) {
							i = i++;
							if (section.getY() < Y.config.win.scrollY + offset) {
								current = i;
							}
						}, this);
	
						if (
							Y.config.win.scrollY + Y.config.win.innerHeight >=
							Y.one('body').get('clientHeight')
						) {
							indexNavItems.item(indexNavItems.size() - 1).addClass('active');
							current = indexNavItems.size() - 1;
						} else {
							indexNavItems.item(current).addClass('active');
						}
	
						if (current != last) {
							indexNavItems.item(last).removeClass('active');
							last = current;
						}
					}, this), 200);
	
					Y.one(window).on('scroll', throttle);
	
					Y.Template.helper.on('scrollend', throttle);
	
				}
	
			},
	
			cartState: function() {
	
				var quant = Y.Squarespace.Singletons.ShoppingCart.get('totalQuantity');
				var cart = Y.one('.custom-cart');
	
				if (cart){
					if (quant && quant > 0){
						cart.removeClass('empty');
					}else{
						if(!cart.hasClass('empty')){
							cart.addClass('empty');
						}
					}
				}
	
			},
	
			disableScroll: function () {
	
				var toggle = Y.one('#mobileNavToggle');
	
				toggle.on('change', function () {
					if (toggle.get('checked') === true) {
						Y.one('body').addClass('disable-scroll');
					} else {
						Y.one('body').removeClass('disable-scroll');
					}
				});
	
				Y.Template.helper.disableScroll('disable-scroll');
	
			},
	
			textShrink: function(element, ancestor) {
				if(Y.one(element) && Y.one(element).ancestor(ancestor)){
					Y.all(element).each(function(item){
						item.plug(Y.Squarespace.TextShrink, {
							parentEl: item.ancestor(ancestor)
						});
					});
				}
			},
	
			regularHeaderForGridGallery: function () {
				if (Y.one('.collection-type-index.design-grid.has-banner-image') && Y.one('#page #content .index-section:first-child .index-section-wrapper .gallery-content')) {
					Y.one('body').removeClass('has-banner-image');
				} else if (Y.one('.collection-type-index.design-slideshow:not(.has-banner-image)') && Y.one('#page #content .index-section:first-child .index-section-wrapper .gallery-content')) {
					Y.one('body').addClass('has-banner-image');
				}
			},
	
			fadeIn: function (el) {
				if (Y.one(el) && Y.one(el).hasClass('tmpl-loading')) {
					Y.all(el).each(function(e) {
						e.removeClass('tmpl-loading').addClass('tmpl-loaded');
					});
				}
			},
	
			runCenterNav: function () {
				if (Y.one('body:not(.always-use-overlay-nav)')) {
					var navSelector = '#header #mainNavigation > div';
					if(Y.one('.index.home')){
						navSelector = '#header #mainNavigation > div:not(.home)';
						if(Y.one('.expand-homepage-index-links')){
							navSelector = '#header #mainNavigation > div:not(.base)';
						}
					}
					new Y.Template.CenterNav({
						navItems: navSelector,
						centerEl: '#header .title-logo-wrapper h1',
						wrapper: '#header',
						innerWrapper: '#header #headerNav'
					});
				}
			},
	
			overlayNavPadding: function () {
	
				if (Y.config.win.innerWidth > 640 && Y.one('#overlayNav #mainNavWrapper')) {
					Y.one('#overlayNav #mobileNavWrapper').setStyles({
						paddingTop: this.headerHeight,
						paddingBottom: this.headerHeight
					});
				}
	
			},
	
			folderEdgeDetection: function () {
	
				Y.all('.subnav').each(function (current) {
					var winWidth = Y.config.win.innerWidth;
					if ( (winWidth - current.getX()) <= current.get('offsetWidth') ) {
						current.addClass('right-align');
					}
				});
	
			},
	
			transparentHeaderPadding: function () {
				var headerPosition = Y.one('#header').getComputedStyle('position');
				var extraPadding = ( Y.one('#header .header-inner h1').get('offsetHeight')
														+ parseInt(Y.one('#header .header-inner').getComputedStyle('paddingTop'), 10) ) / 2;
	
				if (headerPosition == 'absolute' && Y.one('.main-content .index-section:first-child .index-section-wrapper.has-main-media')) {
	
					// re-wrote this in vanilla javascript in no-yui.js so it executes immediately
	
				} else if (headerPosition == 'absolute' && Y.one('body.has-banner-image')) {
	
					Y.one('.banner-thumbnail-wrapper .desc-wrapper') && Y.one('.banner-thumbnail-wrapper .desc-wrapper').setStyle('paddingTop', extraPadding);
					// This setInterval fixes a race condition on mobile where
					// the .banner-thumbnail-wrapper height was recalculated after ImageLoader
					// already loaded the banner image, causing the image to be improperly sized.
					var loadImageInterval = setInterval(function(){
						if(document.querySelector('#thumbnail img') && document.querySelector('#thumbnail img').clientHeight != document.querySelector('#thumbnail').clientHeight ){
							Y.all('.banner-thumbnail-wrapper img[data-load="false"]').each(function (img) {
								ImageLoader.load(img.removeAttribute('data-load'));
							});
						} else {
							clearInterval(loadImageInterval);
						}
					}, 100);
	
				} else {
					Y.all('.banner-thumbnail-wrapper img[data-load="false"]').each(function (img) {
						ImageLoader.load(img.removeAttribute('data-load'));
					});
				}
	
			},
	
			injectScrollNavContent: function () {
	
				if (Y.one('.collection-type-index.homepage') && Y.one('#header #mainNavWrapper')) {
	
					Y.one('#showOnScrollWrapper') && Y.one('#showOnScrollWrapper').empty();
	
					this.fixedEl = this.mobileNav ? '.show-on-scroll-mobile' : '.show-on-scroll';
	
					Y.one('#mobileNavToggle').insert(this.wrapper.setHTML(Y.one(this.fixedEl).get('outerHTML')), 'after');
	
					if (this.fixedEl == '.show-on-scroll') {
						Y.all('#showOnScrollWrapper #mainNavWrapper nav div').removeAttribute('style');
					}
	
				}
	
			},
	
			altSections: function (el) {
				el.each(function(section){
					if(section.get('nextElementSibling')) {
						if(section.get('nextElementSibling').hasClass('index-section.no-main-image') && !(section.hasClass('alt-section')) ) {
							section.get('nextElementSibling').addClass('alt-section');
						}
					}
				});
	
			}
	
		});
	
	});


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var VideoBackground = __webpack_require__(9).VideoBackground;
	var getVideoProps = __webpack_require__(98);
	
	module.exports = {
	  'VideoBackground': VideoBackground,
	  'getVideoProps': getVideoProps
	};


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var VideoBackground = __webpack_require__(10);
	var VideoFilterPropertyValues = __webpack_require__(93).filterProperties;
	
	module.exports = {
	  VideoBackground: VideoBackground,
	  VideoFilterPropertyValues: VideoFilterPropertyValues
	};

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _assign = __webpack_require__(11);
	
	var _assign2 = _interopRequireDefault(_assign);
	
	var _typeof2 = __webpack_require__(48);
	
	var _typeof3 = _interopRequireDefault(_typeof2);
	
	var _classCallCheck2 = __webpack_require__(83);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(84);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	var custEvent = __webpack_require__(88);
	var parseUrl = __webpack_require__(89);
	
	var DEBUG = false;
	
	var DEFAULT_PROPERTY_VALUES = {
	  'container': '.background-wrapper',
	  'url': 'https://www.youtube.com/watch?v=xkEmYQvJ_68',
	  'fitMode': 'fill',
	  'maxLoops': '',
	  'scaleFactor': 1,
	  'playbackSpeed': 1,
	  'filter': 1,
	  'filterStrength': 50,
	  'timeCode': { 'start': 0, 'end': null },
	  'useCustomFallbackImage': false
	};
	
	var FILTER_OPTIONS = __webpack_require__(93).filterOptions;
	var FILTER_PROPERTIES = __webpack_require__(93).filterProperties;
	
	var YOUTUBE_REGEX = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]{11}).*/;
	
	/**
	 * A class which uses the YouTube API to initialize an IFRAME with a YouTube video.
	 * Additional display options and functionality are configured through a set of properties,
	 * superceding default properties.
	 */
	
	var VideoBackground = function () {
	  /**
	   * @param {Object} props - An optional object with configuation.
	   * @param {Object} windowContext - The parent window object (due to .sqs-site-frame).
	   */
	
	  function VideoBackground(props) {
	    var _this = this;
	
	    var windowContext = arguments.length <= 1 || arguments[1] === undefined ? window : arguments[1];
	    (0, _classCallCheck3["default"])(this, VideoBackground);
	
	    this.windowContext = windowContext;
	    this.initializeProperties(props);
	    this.setDisplayEffects();
	    this.setFallbackImage();
	    this.initializeYouTubeAPI();
	    this.bindUI();
	
	    if (DEBUG === true) {
	      window.vdbg = this;
	      this.debugInterval = setInterval(function () {
	        if (_this.player.getCurrentTime) {
	          _this.logger((_this.player.getCurrentTime() / _this.player.getDuration()).toFixed(2));
	        }
	      }, 900);
	    }
	  }
	
	  (0, _createClass3["default"])(VideoBackground, [{
	    key: 'destroy',
	    value: function destroy() {
	      if (this.events) {
	        this.events.forEach(function (evt) {
	          return evt.target.removeEventListener(evt.type, evt.handler, true);
	        });
	      }
	      this.events = null;
	
	      if (this.player && (0, _typeof3["default"])(this.player) === 'object') {
	        try {
	          this.player.getIframe().classList.remove('ready');
	          this.player.destroy();
	          this.player = null;
	        } catch (err) {
	          console.error(err);
	        }
	      }
	
	      if (typeof this.timer === 'number') {
	        clearTimeout(this.timer);
	        this.timer = null;
	      }
	
	      if (typeof this.debugInterval === 'number') {
	        clearInterval(this.debugInterval);
	        this.debugInterval = null;
	      }
	    }
	  }, {
	    key: 'bindUI',
	    value: function bindUI() {
	      var _this2 = this;
	
	      this.events = [];
	
	      var resizeHandler = function resizeHandler() {
	        _this2.windowContext.requestAnimationFrame(function () {
	          _this2.scaleVideo();
	        });
	      };
	      this.events.push({
	        'target': this.windowContext,
	        'type': 'resize',
	        'handler': resizeHandler
	      });
	      this.windowContext.addEventListener('resize', resizeHandler, true);
	    }
	
	    /**
	     * Merge configuration properties with defaults with minimal validation.
	     */
	
	  }, {
	    key: 'initializeProperties',
	    value: function initializeProperties() {
	      var props = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	      props = (0, _assign2["default"])({}, DEFAULT_PROPERTY_VALUES, props);
	      if (props.container.nodeType === 1) {
	        this.container = props.container;
	      } else if (typeof props.container === 'string') {
	        this.container = document.querySelector(props.container);
	      } else {
	        console.error('Container ' + props.container + ' not found');
	        return false;
	      }
	      this.videoId = this.getVideoID(props.url);
	      this.filter = props.filter;
	      this.filterStrength = props.filterStrength;
	      this.useCustomFallbackImage = props.useCustomFallbackImage;
	      this.fitMode = props.fitMode;
	      this.maxLoops = parseInt(props.maxLoops, 10) || null;
	      this.scaleFactor = props.scaleFactor;
	      this.playbackSpeed = parseFloat(props.playbackSpeed) === 0.0 ? 1 : parseFloat(props.playbackSpeed);
	      this.timeCode = {
	        start: this._getStartTime(props.url) || props.timeCode.start,
	        end: props.timeCode.end
	      };
	
	      var ua = window.navigator.userAgent;
	      this.isMobileBrowser = ua.indexOf('AppleWebKit') !== -1 && ua.indexOf('Mobile') !== -1;
	      if (this.isMobileBrowser) {
	        this.container.classList.add('mobile');
	      }
	      this.player = {};
	      this.currentLoop = 0;
	    }
	
	    /**
	     * All diplay related effects should be applied prior to the video loading to
	     * ensure the effects are visible on the fallback image while loading.
	     */
	
	  }, {
	    key: 'setDisplayEffects',
	    value: function setDisplayEffects() {
	      this.setFilter();
	    }
	
	    /**
	     * A default fallback image element will be create from the YouTube API unless the
	     * custom fallback image exists.
	     */
	
	  }, {
	    key: 'setFallbackImage',
	    value: function setFallbackImage() {
	      var _this3 = this;
	
	      if (this.useCustomFallbackImage) {
	        (function () {
	          var customFallbackImage = _this3.container.querySelector('.custom-fallback-image');
	          var tempImage = document.createElement('img');
	          tempImage.src = customFallbackImage.src;
	          tempImage.addEventListener('load', function () {
	            customFallbackImage.classList.add('loaded');
	          });
	        })();
	      }
	
	      var fallback = this.container.querySelector('.default-fallback-image');
	      if (fallback) {
	        fallback.parentNode.removeChild(fallback);
	      }
	
	      if (this.isMobileBrowser) {
	        return;
	      }
	
	      var getBestQuality = function getBestQuality(evt) {
	        // Prefer the HD-quality image if present. If not, load the default thumbnail.
	        var defaultFallbackImage = evt.currentTarget;
	        if (defaultFallbackImage.width < 480 && defaultFallbackImage.src.indexOf('0.jpg') === -1) {
	          defaultFallbackImage.src = 'https://img.youtube.com/vi/' + _this3.videoId + '/0.jpg';
	          return;
	        }
	        // Only display a real thumbnail image, not the small YouTube gray box.
	        if (defaultFallbackImage.width >= 480) {
	          _this3.container.insertBefore(defaultFallbackImage, _this3.container.querySelector('#player'));
	          defaultFallbackImage.classList.add('loaded');
	        }
	        _this3.setDisplayEffects();
	        defaultFallbackImage.removeEventListener('load', getBestQuality);
	      };
	
	      var imageURL = 'https://img.youtube.com/vi/' + this.videoId + '/maxresdefault.jpg';
	      var defaultFallbackImage = document.createElement('img');
	      defaultFallbackImage.src = this.fallbackImageURL || imageURL;
	      defaultFallbackImage.classList.add('default-fallback-image');
	      defaultFallbackImage.classList.add('buffering');
	      defaultFallbackImage.addEventListener('load', getBestQuality);
	    }
	
	    /**
	     * Call YouTube API per their guidelines.
	     */
	
	  }, {
	    key: 'initializeYouTubeAPI',
	    value: function initializeYouTubeAPI() {
	      var _this4 = this;
	
	      if (this.isMobileBrowser) {
	        return;
	      }
	
	      if (this.windowContext.document.documentElement.querySelector('script[src*="www.youtube.com/iframe_api"].loaded')) {
	        this.setVideoPlayer();
	        return;
	      }
	
	      this.player.ready = false;
	      var tag = this.windowContext.document.createElement('script');
	      tag.src = 'https://www.youtube.com/iframe_api';
	      var firstScriptTag = this.windowContext.document.getElementsByTagName('script')[0];
	      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
	      tag.addEventListener('load', function (evt) {
	        evt.currentTarget.classList.add('loaded');
	        _this4.setVideoPlayer();
	      }, true);
	    }
	
	    /**
	     * The ID is the only unique property need to use in the YouTube API.
	     */
	
	  }, {
	    key: 'getVideoID',
	    value: function getVideoID(value) {
	      if (!value) {
	        value = DEFAULT_PROPERTY_VALUES.url;
	      }
	
	      var match = value.match(YOUTUBE_REGEX);
	      if (match && match[2].length) {
	        return match[2];
	      }
	
	      return '';
	    }
	
	    /**
	     * Initialize a YouTube video player and register its callbacks.
	     */
	
	  }, {
	    key: 'setVideoPlayer',
	    value: function setVideoPlayer() {
	      var _this5 = this;
	
	      if (this.player.ready) {
	        try {
	          this.player.destroy();
	        } catch (e) {
	          // nothing to destroy
	        }
	      }
	
	      // Poll until the API is ready.
	      if (this.windowContext.YT.loaded !== 1) {
	        setTimeout(this.setVideoPlayer.bind(this), 100);
	        return false;
	      }
	
	      this.player = new this.windowContext.YT.Player(this.container.querySelector('#player'), {
	        height: '315',
	        width: '560',
	        videoId: this.videoId,
	        playerVars: {
	          'autohide': 1,
	          'autoplay': 0,
	          'controls': 0,
	          'enablejsapi': 1,
	          'iv_load_policy': 3,
	          'loop': 0,
	          'modestbranding': 1,
	          'playsinline': 1,
	          'rel': 0,
	          'showinfo': 0,
	          'wmode': 'opaque'
	        },
	        events: {
	          'onReady': function onReady(event) {
	            _this5.onPlayerReady(event);
	          },
	          'onStateChange': function onStateChange(event) {
	            _this5.onPlayerStateChange(event);
	          }
	        }
	      });
	    }
	
	    /**
	     * YouTube event handler. Add the proper class to the player element and set
	     * player properties.
	     */
	
	  }, {
	    key: 'onPlayerReady',
	    value: function onPlayerReady(event) {
	      this.player.getIframe().classList.add('background-video');
	      this.syncPlayer();
	      this.player.mute();
	      if (typeof window.CustomEvent !== 'function') {
	        custEvent();
	      }
	      var readyEvent = new CustomEvent('ready');
	      this.container.dispatchEvent(readyEvent);
	      document.body.classList.add('ready');
	      this.player.ready = true;
	      if (this.isMobileBrowser) {
	        return;
	      }
	      this.player.seekTo(this.timeCode.start);
	      this.player.playVideo();
	    }
	
	    /**
	     * YouTube event handler. Determine whether or not to loop the video.
	     */
	
	  }, {
	    key: 'onPlayerStateChange',
	    value: function onPlayerStateChange(event) {
	      var _this6 = this;
	
	      var playerIframe = this.player.getIframe();
	      var defaultImage = this.container.querySelector('.default-fallback-image');
	      var duration = (this.player.getDuration() - this.timeCode.start) / this.playbackSpeed;
	
	      if (event.data === this.windowContext.YT.PlayerState.BUFFERING && this.player.getVideoLoadedFraction() !== 1 && (this.player.getCurrentTime() === 0 || this.player.getCurrentTime() > duration - -0.1)) {
	        this.logger('BUFFERING');
	        defaultImage && defaultImage.classList.add('buffering');
	      } else if (event.data === this.windowContext.YT.PlayerState.PLAYING) {
	        this.logger('PLAYING');
	        playerIframe.classList.add('ready');
	        defaultImage && defaultImage.classList.remove('buffering');
	
	        if (this.player.getCurrentTime() === this.timeCode.start) {
	          clearTimeout(this.timer);
	
	          if (this.maxLoops) {
	            this.currentLoop++;
	            if (this.currentLoop > this.maxLoops) {
	              this.player.pauseVideo();
	              this.currentLoop = 0;
	              return;
	            }
	          }
	
	          this.timer = setTimeout(function () {
	            _this6.player.pauseVideo();
	            _this6.player.seekTo(_this6.timeCode.start);
	          }, duration * 1000 - 100);
	        }
	      } else {
	        this.logger('PAUSED/ENDED: ' + event.data);
	        this.player.playVideo();
	      }
	    }
	
	    /**
	     * The IFRAME will be the entire width and height of its container but the video
	     * may be a completely different size and ratio. Scale up the IFRAME so the inner video
	     * behaves in the proper `fitMode` with optional additional scaling to zoom in.
	     */
	
	  }, {
	    key: 'scaleVideo',
	    value: function scaleVideo(scaleValue) {
	      var scale = scaleValue || this.scaleFactor;
	      var videoDimensions = this._findPlayerDimensions();
	      var playerIframe = this.player.getIframe();
	      var fallbackImg = null;
	      if (!this.useCustomFallbackImage) {
	        fallbackImg = this.container.querySelector('.default-fallback-image');
	      }
	
	      if (this.fitMode !== 'fill') {
	        playerIframe.style.width = '';
	        playerIframe.style.height = '';
	        if (fallbackImg) {
	          fallbackImg.style.width = '';
	          fallbackImg.style.minHeight = '';
	        }
	        return false;
	      }
	
	      var containerWidth = playerIframe.parentNode.clientWidth;
	      var containerHeight = playerIframe.parentNode.clientHeight;
	      var containerRatio = containerWidth / containerHeight;
	      var videoRatio = videoDimensions.width / videoDimensions.height;
	      var pWidth = 0;
	      var pHeight = 0;
	      if (containerRatio > videoRatio) {
	        // at the same width, the video is taller than the window
	        pWidth = containerWidth * scale;
	        pHeight = containerWidth * scale / videoRatio;
	        playerIframe.style.width = pWidth + 'px';
	        playerIframe.style.height = pHeight + 'px';
	      } else if (videoRatio > containerRatio) {
	        // at the same width, the video is shorter than the window
	        pWidth = containerHeight * scale * videoRatio;
	        pHeight = containerHeight * scale;
	        playerIframe.style.width = pWidth + 'px';
	        playerIframe.style.height = pHeight + 'px';
	      } else {
	        // the window and video ratios match
	        pWidth = containerWidth * scale;
	        pHeight = containerHeight * scale;
	        playerIframe.style.width = pWidth + 'px';
	        playerIframe.style.height = pHeight + 'px';
	      }
	      playerIframe.style.left = 0 - (pWidth - containerWidth) / 2 + 'px';
	      playerIframe.style.top = 0 - (pHeight - containerHeight) / 2 + 'px';
	
	      if (fallbackImg) {
	        if (containerRatio > videoRatio) {
	          // at the same width, the video is taller than the window
	          fallbackImg.style.width = containerWidth * scale + 'px';
	          fallbackImg.style.height = containerWidth * scale / videoRatio + 'px';
	        } else if (videoRatio > containerRatio) {
	          // at the same width, the video is shorter than the window
	          fallbackImg.style.width = containerHeight * scale * videoRatio + 'px';
	          fallbackImg.style.height = containerHeight * scale + 'px';
	        } else {
	          // the window and video ratios match
	          fallbackImg.style.width = containerWidth * scale + 'px';
	          fallbackImg.style.height = containerHeight * scale + 'px';
	        }
	      }
	    }
	
	    /**
	     * Play back speed options based on the YouTube API options.
	     */
	
	  }, {
	    key: 'setSpeed',
	    value: function setSpeed(speedValue) {
	      this.playbackSpeed = parseFloat(this.playbackSpeed);
	      this.player.setPlaybackRate(this.playbackSpeed);
	    }
	
	    /**
	     * Apply filter with values based on filterStrength.
	     */
	
	  }, {
	    key: 'setFilter',
	    value: function setFilter() {
	      var containerStyle = this.container.style;
	      var filter = FILTER_OPTIONS[this.filter - 1];
	      var filterStyle = '';
	      if (filter !== 'none') {
	        filterStyle = this.getFilterStyle(filter, this.filterStrength);
	      }
	
	      // To prevent the blur effect from displaying the background at the edges as
	      // part of the blur, the filer needs to be applied to the player and fallback image,
	      // and those elements need to be scaled slightly.
	      // No other combination of filter target and scaling seems to work.
	      if (filter === 'blur') {
	        containerStyle.webkitFilter = '';
	        containerStyle.filter = '';
	        this.container.classList.add('filter-blur');
	
	        Array.prototype.slice.call(this.container.children).forEach(function (el) {
	          el.style.webkitFilter = filterStyle;
	          el.style.filter = filterStyle;
	        });
	      } else {
	        containerStyle.webkitFilter = filterStyle;
	        containerStyle.filter = filterStyle;
	        this.container.classList.remove('filter-blur');
	
	        Array.prototype.slice.call(this.container.children).forEach(function (el) {
	          el.style.webkitFilter = '';
	          el.style.filter = '';
	        });
	      }
	    }
	
	    /**
	     * Construct the style based on the filter strength and `FILTER_PROPERTIES`.
	     */
	
	  }, {
	    key: 'getFilterStyle',
	    value: function getFilterStyle(filter, strength) {
	      return filter + '(' + (FILTER_PROPERTIES[filter].modifier(strength) + FILTER_PROPERTIES[filter].unit) + ')';
	    }
	
	    /**
	     * The YouTube API seemingly does not expose the actual width and height dimensions
	     * of the video itself. The video's dimensions and ratio may be completely different
	     * than the IFRAME's. This hack finds those values inside some private objects.
	     * Since this is not part of the pbulic API the dimensions will fall back to the
	     * container width and height in case YouTube changes the internals unexpectedly.
	     */
	
	  }, {
	    key: '_findPlayerDimensions',
	    value: function _findPlayerDimensions() {
	      var w = this.container.clientWidth;
	      var h = this.container.clientHeight;
	      var hasDimensions = false;
	      var playerObjs = [];
	      var player = this.player;
	      for (var o in player) {
	        if ((0, _typeof3["default"])(player[o]) === 'object') {
	          playerObjs.push(player[o]);
	        }
	      }
	      playerObjs.forEach(function (obj) {
	        for (var p in obj) {
	          if (hasDimensions) {
	            break;
	          }
	          try {
	            if ((0, _typeof3["default"])(obj[p]) === 'object' && !!obj[p].host) {
	              if (obj[p].width && obj[p].height) {
	                w = obj[p].width;
	                h = obj[p].height;
	                hasDimensions = true;
	              }
	            }
	          } catch (err) {
	            // console.error(err);
	          }
	        }
	      });
	      return {
	        'width': w,
	        'height': h
	      };
	    }
	  }, {
	    key: '_getStartTime',
	    value: function _getStartTime(url) {
	      var parsedUrl = new parseUrl(url, true);
	
	      if (!parsedUrl.query || !parsedUrl.query.t) {
	        return false;
	      }
	
	      var timeParam = parsedUrl.query.t;
	      var m = (timeParam.match(/\d+(?=m)/g) ? timeParam.match(/\d+(?=m)/g)[0] : 0) * 60;
	      var s = timeParam.match(/\d+(?=s)/g) ? timeParam.match(/\d+(?=s)/g)[0] : timeParam;
	      return parseInt(m, 10) + parseInt(s, 10);
	    }
	
	    /**
	      * Apply the purely vidual effects.
	      */
	
	  }, {
	    key: 'syncPlayer',
	    value: function syncPlayer() {
	      this.setDisplayEffects();
	      this.setSpeed();
	      this.scaleVideo();
	    }
	  }, {
	    key: 'logger',
	    value: function logger(msg) {
	      if (!DEBUG) {
	        return;
	      }
	
	      console.log(msg);
	    }
	  }]);
	  return VideoBackground;
	}();
	
	module.exports = VideoBackground;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(12), __esModule: true };

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(13);
	module.exports = __webpack_require__(16).Object.assign;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.1 Object.assign(target, source)
	var $export = __webpack_require__(14);
	
	$export($export.S + $export.F, 'Object', {assign: __webpack_require__(29)});

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(15)
	  , core      = __webpack_require__(16)
	  , ctx       = __webpack_require__(17)
	  , hide      = __webpack_require__(19)
	  , PROTOTYPE = 'prototype';
	
	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , IS_WRAP   = type & $export.W
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , expProto  = exports[PROTOTYPE]
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
	    , key, own, out;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function(C){
	      var F = function(a, b, c){
	        if(this instanceof C){
	          switch(arguments.length){
	            case 0: return new C;
	            case 1: return new C(a);
	            case 2: return new C(a, b);
	          } return new C(a, b, c);
	        } return C.apply(this, arguments);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
	    if(IS_PROTO){
	      (exports.virtual || (exports.virtual = {}))[key] = out;
	      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
	      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
	    }
	  }
	};
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library` 
	module.exports = $export;

/***/ },
/* 15 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 16 */
/***/ function(module, exports) {

	var core = module.exports = {version: '2.4.0'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(18);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 18 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var dP         = __webpack_require__(20)
	  , createDesc = __webpack_require__(28);
	module.exports = __webpack_require__(24) ? function(object, key, value){
	  return dP.f(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var anObject       = __webpack_require__(21)
	  , IE8_DOM_DEFINE = __webpack_require__(23)
	  , toPrimitive    = __webpack_require__(27)
	  , dP             = Object.defineProperty;
	
	exports.f = __webpack_require__(24) ? Object.defineProperty : function defineProperty(O, P, Attributes){
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if(IE8_DOM_DEFINE)try {
	    return dP(O, P, Attributes);
	  } catch(e){ /* empty */ }
	  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
	  if('value' in Attributes)O[P] = Attributes.value;
	  return O;
	};

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(22);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 22 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = !__webpack_require__(24) && !__webpack_require__(25)(function(){
	  return Object.defineProperty(__webpack_require__(26)('div'), 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(25)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 25 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(22)
	  , document = __webpack_require__(15).document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(22);
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	module.exports = function(it, S){
	  if(!isObject(it))return it;
	  var fn, val;
	  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  throw TypeError("Can't convert object to primitive value");
	};

/***/ },
/* 28 */
/***/ function(module, exports) {

	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 19.1.2.1 Object.assign(target, source, ...)
	var getKeys  = __webpack_require__(30)
	  , gOPS     = __webpack_require__(45)
	  , pIE      = __webpack_require__(46)
	  , toObject = __webpack_require__(47)
	  , IObject  = __webpack_require__(34)
	  , $assign  = Object.assign;
	
	// should work with symbols and should have deterministic property order (V8 bug)
	module.exports = !$assign || __webpack_require__(25)(function(){
	  var A = {}
	    , B = {}
	    , S = Symbol()
	    , K = 'abcdefghijklmnopqrst';
	  A[S] = 7;
	  K.split('').forEach(function(k){ B[k] = k; });
	  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
	}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
	  var T     = toObject(target)
	    , aLen  = arguments.length
	    , index = 1
	    , getSymbols = gOPS.f
	    , isEnum     = pIE.f;
	  while(aLen > index){
	    var S      = IObject(arguments[index++])
	      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
	      , length = keys.length
	      , j      = 0
	      , key;
	    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
	  } return T;
	} : $assign;

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys       = __webpack_require__(31)
	  , enumBugKeys = __webpack_require__(44);
	
	module.exports = Object.keys || function keys(O){
	  return $keys(O, enumBugKeys);
	};

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	var has          = __webpack_require__(32)
	  , toIObject    = __webpack_require__(33)
	  , arrayIndexOf = __webpack_require__(37)(false)
	  , IE_PROTO     = __webpack_require__(41)('IE_PROTO');
	
	module.exports = function(object, names){
	  var O      = toIObject(object)
	    , i      = 0
	    , result = []
	    , key;
	  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while(names.length > i)if(has(O, key = names[i++])){
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};

/***/ },
/* 32 */
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(34)
	  , defined = __webpack_require__(36);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(35);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 35 */
/***/ function(module, exports) {

	var toString = {}.toString;
	
	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 36 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(33)
	  , toLength  = __webpack_require__(38)
	  , toIndex   = __webpack_require__(40);
	module.exports = function(IS_INCLUDES){
	  return function($this, el, fromIndex){
	    var O      = toIObject($this)
	      , length = toLength(O.length)
	      , index  = toIndex(fromIndex, length)
	      , value;
	    // Array#includes uses SameValueZero equality algorithm
	    if(IS_INCLUDES && el != el)while(length > index){
	      value = O[index++];
	      if(value != value)return true;
	    // Array#toIndex ignores holes, Array#includes - not
	    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
	      if(O[index] === el)return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(39)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 39 */
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(39)
	  , max       = Math.max
	  , min       = Math.min;
	module.exports = function(index, length){
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	var shared = __webpack_require__(42)('keys')
	  , uid    = __webpack_require__(43);
	module.exports = function(key){
	  return shared[key] || (shared[key] = uid(key));
	};

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(15)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 43 */
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 44 */
/***/ function(module, exports) {

	// IE 8- don't enum bug keys
	module.exports = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

/***/ },
/* 45 */
/***/ function(module, exports) {

	exports.f = Object.getOwnPropertySymbols;

/***/ },
/* 46 */
/***/ function(module, exports) {

	exports.f = {}.propertyIsEnumerable;

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(36);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _iterator = __webpack_require__(49);
	
	var _iterator2 = _interopRequireDefault(_iterator);
	
	var _symbol = __webpack_require__(69);
	
	var _symbol2 = _interopRequireDefault(_symbol);
	
	var _typeof = typeof _symbol2["default"] === "function" && typeof _iterator2["default"] === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2["default"] === "function" && obj.constructor === _symbol2["default"] ? "symbol" : typeof obj; };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	exports["default"] = typeof _symbol2["default"] === "function" && _typeof(_iterator2["default"]) === "symbol" ? function (obj) {
	  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
	} : function (obj) {
	  return obj && typeof _symbol2["default"] === "function" && obj.constructor === _symbol2["default"] ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
	};

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(50), __esModule: true };

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(51);
	__webpack_require__(64);
	module.exports = __webpack_require__(68).f('iterator');

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $at  = __webpack_require__(52)(true);
	
	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(53)(String, 'String', function(iterated){
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , index = this._i
	    , point;
	  if(index >= O.length)return {value: undefined, done: true};
	  point = $at(O, index);
	  this._i += point.length;
	  return {value: point, done: false};
	});

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(39)
	  , defined   = __webpack_require__(36);
	// true  -> String#at
	// false -> String#codePointAt
	module.exports = function(TO_STRING){
	  return function(that, pos){
	    var s = String(defined(that))
	      , i = toInteger(pos)
	      , l = s.length
	      , a, b;
	    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY        = __webpack_require__(54)
	  , $export        = __webpack_require__(14)
	  , redefine       = __webpack_require__(55)
	  , hide           = __webpack_require__(19)
	  , has            = __webpack_require__(32)
	  , Iterators      = __webpack_require__(56)
	  , $iterCreate    = __webpack_require__(57)
	  , setToStringTag = __webpack_require__(61)
	  , getPrototypeOf = __webpack_require__(63)
	  , ITERATOR       = __webpack_require__(62)('iterator')
	  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
	  , FF_ITERATOR    = '@@iterator'
	  , KEYS           = 'keys'
	  , VALUES         = 'values';
	
	var returnThis = function(){ return this; };
	
	module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
	  $iterCreate(Constructor, NAME, next);
	  var getMethod = function(kind){
	    if(!BUGGY && kind in proto)return proto[kind];
	    switch(kind){
	      case KEYS: return function keys(){ return new Constructor(this, kind); };
	      case VALUES: return function values(){ return new Constructor(this, kind); };
	    } return function entries(){ return new Constructor(this, kind); };
	  };
	  var TAG        = NAME + ' Iterator'
	    , DEF_VALUES = DEFAULT == VALUES
	    , VALUES_BUG = false
	    , proto      = Base.prototype
	    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
	    , $default   = $native || getMethod(DEFAULT)
	    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
	    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
	    , methods, key, IteratorPrototype;
	  // Fix native
	  if($anyNative){
	    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
	    if(IteratorPrototype !== Object.prototype){
	      // Set @@toStringTag to native iterators
	      setToStringTag(IteratorPrototype, TAG, true);
	      // fix for some old engines
	      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
	    }
	  }
	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if(DEF_VALUES && $native && $native.name !== VALUES){
	    VALUES_BUG = true;
	    $default = function values(){ return $native.call(this); };
	  }
	  // Define iterator
	  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
	    hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  Iterators[NAME] = $default;
	  Iterators[TAG]  = returnThis;
	  if(DEFAULT){
	    methods = {
	      values:  DEF_VALUES ? $default : getMethod(VALUES),
	      keys:    IS_SET     ? $default : getMethod(KEYS),
	      entries: $entries
	    };
	    if(FORCED)for(key in methods){
	      if(!(key in proto))redefine(proto, key, methods[key]);
	    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

/***/ },
/* 54 */
/***/ function(module, exports) {

	module.exports = true;

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(19);

/***/ },
/* 56 */
/***/ function(module, exports) {

	module.exports = {};

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var create         = __webpack_require__(58)
	  , descriptor     = __webpack_require__(28)
	  , setToStringTag = __webpack_require__(61)
	  , IteratorPrototype = {};
	
	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(19)(IteratorPrototype, __webpack_require__(62)('iterator'), function(){ return this; });
	
	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	var anObject    = __webpack_require__(21)
	  , dPs         = __webpack_require__(59)
	  , enumBugKeys = __webpack_require__(44)
	  , IE_PROTO    = __webpack_require__(41)('IE_PROTO')
	  , Empty       = function(){ /* empty */ }
	  , PROTOTYPE   = 'prototype';
	
	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function(){
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = __webpack_require__(26)('iframe')
	    , i      = enumBugKeys.length
	    , gt     = '>'
	    , iframeDocument;
	  iframe.style.display = 'none';
	  __webpack_require__(60).appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write('<script>document.F=Object</script' + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
	  return createDict();
	};
	
	module.exports = Object.create || function create(O, Properties){
	  var result;
	  if(O !== null){
	    Empty[PROTOTYPE] = anObject(O);
	    result = new Empty;
	    Empty[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO] = O;
	  } else result = createDict();
	  return Properties === undefined ? result : dPs(result, Properties);
	};

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	var dP       = __webpack_require__(20)
	  , anObject = __webpack_require__(21)
	  , getKeys  = __webpack_require__(30);
	
	module.exports = __webpack_require__(24) ? Object.defineProperties : function defineProperties(O, Properties){
	  anObject(O);
	  var keys   = getKeys(Properties)
	    , length = keys.length
	    , i = 0
	    , P;
	  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
	  return O;
	};

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(15).document && document.documentElement;

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	var def = __webpack_require__(20).f
	  , has = __webpack_require__(32)
	  , TAG = __webpack_require__(62)('toStringTag');
	
	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	var store      = __webpack_require__(42)('wks')
	  , uid        = __webpack_require__(43)
	  , Symbol     = __webpack_require__(15).Symbol
	  , USE_SYMBOL = typeof Symbol == 'function';
	
	var $exports = module.exports = function(name){
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
	};
	
	$exports.store = store;

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
	var has         = __webpack_require__(32)
	  , toObject    = __webpack_require__(47)
	  , IE_PROTO    = __webpack_require__(41)('IE_PROTO')
	  , ObjectProto = Object.prototype;
	
	module.exports = Object.getPrototypeOf || function(O){
	  O = toObject(O);
	  if(has(O, IE_PROTO))return O[IE_PROTO];
	  if(typeof O.constructor == 'function' && O instanceof O.constructor){
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto : null;
	};

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(65);
	var global        = __webpack_require__(15)
	  , hide          = __webpack_require__(19)
	  , Iterators     = __webpack_require__(56)
	  , TO_STRING_TAG = __webpack_require__(62)('toStringTag');
	
	for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
	  var NAME       = collections[i]
	    , Collection = global[NAME]
	    , proto      = Collection && Collection.prototype;
	  if(proto && !proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
	  Iterators[NAME] = Iterators.Array;
	}

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var addToUnscopables = __webpack_require__(66)
	  , step             = __webpack_require__(67)
	  , Iterators        = __webpack_require__(56)
	  , toIObject        = __webpack_require__(33);
	
	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(53)(Array, 'Array', function(iterated, kind){
	  this._t = toIObject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , kind  = this._k
	    , index = this._i++;
	  if(!O || index >= O.length){
	    this._t = undefined;
	    return step(1);
	  }
	  if(kind == 'keys'  )return step(0, index);
	  if(kind == 'values')return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');
	
	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;
	
	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

/***/ },
/* 66 */
/***/ function(module, exports) {

	module.exports = function(){ /* empty */ };

/***/ },
/* 67 */
/***/ function(module, exports) {

	module.exports = function(done, value){
	  return {value: value, done: !!done};
	};

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	exports.f = __webpack_require__(62);

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(70), __esModule: true };

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(71);
	__webpack_require__(80);
	__webpack_require__(81);
	__webpack_require__(82);
	module.exports = __webpack_require__(16).Symbol;

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// ECMAScript 6 symbols shim
	var global         = __webpack_require__(15)
	  , has            = __webpack_require__(32)
	  , DESCRIPTORS    = __webpack_require__(24)
	  , $export        = __webpack_require__(14)
	  , redefine       = __webpack_require__(55)
	  , META           = __webpack_require__(72).KEY
	  , $fails         = __webpack_require__(25)
	  , shared         = __webpack_require__(42)
	  , setToStringTag = __webpack_require__(61)
	  , uid            = __webpack_require__(43)
	  , wks            = __webpack_require__(62)
	  , wksExt         = __webpack_require__(68)
	  , wksDefine      = __webpack_require__(73)
	  , keyOf          = __webpack_require__(74)
	  , enumKeys       = __webpack_require__(75)
	  , isArray        = __webpack_require__(76)
	  , anObject       = __webpack_require__(21)
	  , toIObject      = __webpack_require__(33)
	  , toPrimitive    = __webpack_require__(27)
	  , createDesc     = __webpack_require__(28)
	  , _create        = __webpack_require__(58)
	  , gOPNExt        = __webpack_require__(77)
	  , $GOPD          = __webpack_require__(79)
	  , $DP            = __webpack_require__(20)
	  , $keys          = __webpack_require__(30)
	  , gOPD           = $GOPD.f
	  , dP             = $DP.f
	  , gOPN           = gOPNExt.f
	  , $Symbol        = global.Symbol
	  , $JSON          = global.JSON
	  , _stringify     = $JSON && $JSON.stringify
	  , PROTOTYPE      = 'prototype'
	  , HIDDEN         = wks('_hidden')
	  , TO_PRIMITIVE   = wks('toPrimitive')
	  , isEnum         = {}.propertyIsEnumerable
	  , SymbolRegistry = shared('symbol-registry')
	  , AllSymbols     = shared('symbols')
	  , OPSymbols      = shared('op-symbols')
	  , ObjectProto    = Object[PROTOTYPE]
	  , USE_NATIVE     = typeof $Symbol == 'function'
	  , QObject        = global.QObject;
	// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
	var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;
	
	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDesc = DESCRIPTORS && $fails(function(){
	  return _create(dP({}, 'a', {
	    get: function(){ return dP(this, 'a', {value: 7}).a; }
	  })).a != 7;
	}) ? function(it, key, D){
	  var protoDesc = gOPD(ObjectProto, key);
	  if(protoDesc)delete ObjectProto[key];
	  dP(it, key, D);
	  if(protoDesc && it !== ObjectProto)dP(ObjectProto, key, protoDesc);
	} : dP;
	
	var wrap = function(tag){
	  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
	  sym._k = tag;
	  return sym;
	};
	
	var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function(it){
	  return typeof it == 'symbol';
	} : function(it){
	  return it instanceof $Symbol;
	};
	
	var $defineProperty = function defineProperty(it, key, D){
	  if(it === ObjectProto)$defineProperty(OPSymbols, key, D);
	  anObject(it);
	  key = toPrimitive(key, true);
	  anObject(D);
	  if(has(AllSymbols, key)){
	    if(!D.enumerable){
	      if(!has(it, HIDDEN))dP(it, HIDDEN, createDesc(1, {}));
	      it[HIDDEN][key] = true;
	    } else {
	      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
	      D = _create(D, {enumerable: createDesc(0, false)});
	    } return setSymbolDesc(it, key, D);
	  } return dP(it, key, D);
	};
	var $defineProperties = function defineProperties(it, P){
	  anObject(it);
	  var keys = enumKeys(P = toIObject(P))
	    , i    = 0
	    , l = keys.length
	    , key;
	  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
	  return it;
	};
	var $create = function create(it, P){
	  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
	};
	var $propertyIsEnumerable = function propertyIsEnumerable(key){
	  var E = isEnum.call(this, key = toPrimitive(key, true));
	  if(this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return false;
	  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
	};
	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
	  it  = toIObject(it);
	  key = toPrimitive(key, true);
	  if(it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return;
	  var D = gOPD(it, key);
	  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
	  return D;
	};
	var $getOwnPropertyNames = function getOwnPropertyNames(it){
	  var names  = gOPN(toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i){
	    if(!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META)result.push(key);
	  } return result;
	};
	var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
	  var IS_OP  = it === ObjectProto
	    , names  = gOPN(IS_OP ? OPSymbols : toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i){
	    if(has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true))result.push(AllSymbols[key]);
	  } return result;
	};
	
	// 19.4.1.1 Symbol([description])
	if(!USE_NATIVE){
	  $Symbol = function Symbol(){
	    if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor!');
	    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
	    var $set = function(value){
	      if(this === ObjectProto)$set.call(OPSymbols, value);
	      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
	      setSymbolDesc(this, tag, createDesc(1, value));
	    };
	    if(DESCRIPTORS && setter)setSymbolDesc(ObjectProto, tag, {configurable: true, set: $set});
	    return wrap(tag);
	  };
	  redefine($Symbol[PROTOTYPE], 'toString', function toString(){
	    return this._k;
	  });
	
	  $GOPD.f = $getOwnPropertyDescriptor;
	  $DP.f   = $defineProperty;
	  __webpack_require__(78).f = gOPNExt.f = $getOwnPropertyNames;
	  __webpack_require__(46).f  = $propertyIsEnumerable;
	  __webpack_require__(45).f = $getOwnPropertySymbols;
	
	  if(DESCRIPTORS && !__webpack_require__(54)){
	    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
	  }
	
	  wksExt.f = function(name){
	    return wrap(wks(name));
	  }
	}
	
	$export($export.G + $export.W + $export.F * !USE_NATIVE, {Symbol: $Symbol});
	
	for(var symbols = (
	  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
	  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
	).split(','), i = 0; symbols.length > i; )wks(symbols[i++]);
	
	for(var symbols = $keys(wks.store), i = 0; symbols.length > i; )wksDefine(symbols[i++]);
	
	$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function(key){
	    return has(SymbolRegistry, key += '')
	      ? SymbolRegistry[key]
	      : SymbolRegistry[key] = $Symbol(key);
	  },
	  // 19.4.2.5 Symbol.keyFor(sym)
	  keyFor: function keyFor(key){
	    if(isSymbol(key))return keyOf(SymbolRegistry, key);
	    throw TypeError(key + ' is not a symbol!');
	  },
	  useSetter: function(){ setter = true; },
	  useSimple: function(){ setter = false; }
	});
	
	$export($export.S + $export.F * !USE_NATIVE, 'Object', {
	  // 19.1.2.2 Object.create(O [, Properties])
	  create: $create,
	  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
	  defineProperty: $defineProperty,
	  // 19.1.2.3 Object.defineProperties(O, Properties)
	  defineProperties: $defineProperties,
	  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
	  // 19.1.2.7 Object.getOwnPropertyNames(O)
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // 19.1.2.8 Object.getOwnPropertySymbols(O)
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});
	
	// 24.3.2 JSON.stringify(value [, replacer [, space]])
	$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function(){
	  var S = $Symbol();
	  // MS Edge converts symbol values to JSON as {}
	  // WebKit converts symbol values to JSON as null
	  // V8 throws on boxed symbols
	  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
	})), 'JSON', {
	  stringify: function stringify(it){
	    if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
	    var args = [it]
	      , i    = 1
	      , replacer, $replacer;
	    while(arguments.length > i)args.push(arguments[i++]);
	    replacer = args[1];
	    if(typeof replacer == 'function')$replacer = replacer;
	    if($replacer || !isArray(replacer))replacer = function(key, value){
	      if($replacer)value = $replacer.call(this, key, value);
	      if(!isSymbol(value))return value;
	    };
	    args[1] = replacer;
	    return _stringify.apply($JSON, args);
	  }
	});
	
	// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
	$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(19)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	setToStringTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	setToStringTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	setToStringTag(global.JSON, 'JSON', true);

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	var META     = __webpack_require__(43)('meta')
	  , isObject = __webpack_require__(22)
	  , has      = __webpack_require__(32)
	  , setDesc  = __webpack_require__(20).f
	  , id       = 0;
	var isExtensible = Object.isExtensible || function(){
	  return true;
	};
	var FREEZE = !__webpack_require__(25)(function(){
	  return isExtensible(Object.preventExtensions({}));
	});
	var setMeta = function(it){
	  setDesc(it, META, {value: {
	    i: 'O' + ++id, // object ID
	    w: {}          // weak collections IDs
	  }});
	};
	var fastKey = function(it, create){
	  // return primitive with prefix
	  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
	  if(!has(it, META)){
	    // can't set metadata to uncaught frozen object
	    if(!isExtensible(it))return 'F';
	    // not necessary to add metadata
	    if(!create)return 'E';
	    // add missing metadata
	    setMeta(it);
	  // return object ID
	  } return it[META].i;
	};
	var getWeak = function(it, create){
	  if(!has(it, META)){
	    // can't set metadata to uncaught frozen object
	    if(!isExtensible(it))return true;
	    // not necessary to add metadata
	    if(!create)return false;
	    // add missing metadata
	    setMeta(it);
	  // return hash weak collections IDs
	  } return it[META].w;
	};
	// add metadata on freeze-family methods calling
	var onFreeze = function(it){
	  if(FREEZE && meta.NEED && isExtensible(it) && !has(it, META))setMeta(it);
	  return it;
	};
	var meta = module.exports = {
	  KEY:      META,
	  NEED:     false,
	  fastKey:  fastKey,
	  getWeak:  getWeak,
	  onFreeze: onFreeze
	};

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	var global         = __webpack_require__(15)
	  , core           = __webpack_require__(16)
	  , LIBRARY        = __webpack_require__(54)
	  , wksExt         = __webpack_require__(68)
	  , defineProperty = __webpack_require__(20).f;
	module.exports = function(name){
	  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
	  if(name.charAt(0) != '_' && !(name in $Symbol))defineProperty($Symbol, name, {value: wksExt.f(name)});
	};

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	var getKeys   = __webpack_require__(30)
	  , toIObject = __webpack_require__(33);
	module.exports = function(object, el){
	  var O      = toIObject(object)
	    , keys   = getKeys(O)
	    , length = keys.length
	    , index  = 0
	    , key;
	  while(length > index)if(O[key = keys[index++]] === el)return key;
	};

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	// all enumerable object keys, includes symbols
	var getKeys = __webpack_require__(30)
	  , gOPS    = __webpack_require__(45)
	  , pIE     = __webpack_require__(46);
	module.exports = function(it){
	  var result     = getKeys(it)
	    , getSymbols = gOPS.f;
	  if(getSymbols){
	    var symbols = getSymbols(it)
	      , isEnum  = pIE.f
	      , i       = 0
	      , key;
	    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))result.push(key);
	  } return result;
	};

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	// 7.2.2 IsArray(argument)
	var cof = __webpack_require__(35);
	module.exports = Array.isArray || function isArray(arg){
	  return cof(arg) == 'Array';
	};

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var toIObject = __webpack_require__(33)
	  , gOPN      = __webpack_require__(78).f
	  , toString  = {}.toString;
	
	var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];
	
	var getWindowNames = function(it){
	  try {
	    return gOPN(it);
	  } catch(e){
	    return windowNames.slice();
	  }
	};
	
	module.exports.f = function getOwnPropertyNames(it){
	  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
	};


/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
	var $keys      = __webpack_require__(31)
	  , hiddenKeys = __webpack_require__(44).concat('length', 'prototype');
	
	exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
	  return $keys(O, hiddenKeys);
	};

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	var pIE            = __webpack_require__(46)
	  , createDesc     = __webpack_require__(28)
	  , toIObject      = __webpack_require__(33)
	  , toPrimitive    = __webpack_require__(27)
	  , has            = __webpack_require__(32)
	  , IE8_DOM_DEFINE = __webpack_require__(23)
	  , gOPD           = Object.getOwnPropertyDescriptor;
	
	exports.f = __webpack_require__(24) ? gOPD : function getOwnPropertyDescriptor(O, P){
	  O = toIObject(O);
	  P = toPrimitive(P, true);
	  if(IE8_DOM_DEFINE)try {
	    return gOPD(O, P);
	  } catch(e){ /* empty */ }
	  if(has(O, P))return createDesc(!pIE.f.call(O, P), O[P]);
	};

/***/ },
/* 80 */
/***/ function(module, exports) {



/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(73)('asyncIterator');

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(73)('observable');

/***/ },
/* 83 */
/***/ function(module, exports) {

	"use strict";
	
	exports.__esModule = true;
	
	exports["default"] = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _defineProperty = __webpack_require__(85);
	
	var _defineProperty2 = _interopRequireDefault(_defineProperty);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	exports["default"] = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];
	      descriptor.enumerable = descriptor.enumerable || false;
	      descriptor.configurable = true;
	      if ("value" in descriptor) descriptor.writable = true;
	      (0, _defineProperty2["default"])(target, descriptor.key, descriptor);
	    }
	  }
	
	  return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);
	    if (staticProps) defineProperties(Constructor, staticProps);
	    return Constructor;
	  };
	}();

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(86), __esModule: true };

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(87);
	var $Object = __webpack_require__(16).Object;
	module.exports = function defineProperty(it, key, desc){
	  return $Object.defineProperty(it, key, desc);
	};

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(14);
	// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
	$export($export.S + $export.F * !__webpack_require__(24), 'Object', {defineProperty: __webpack_require__(20).f});

/***/ },
/* 88 */
/***/ function(module, exports) {

	'use strict';
	
	/**
	 * CustomEvent polyfill for Internet Explorer versions >= 9
	 * Polyfill from
	 *   https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent
	 */
	var custEvent = function custEvent() {
	  (function () {
	
	    function CustomEvent(event, params) {
	      params = params || { bubbles: false, cancelable: false, detail: undefined };
	      var evt = document.createEvent('CustomEvent');
	      evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
	      return evt;
	    }
	
	    CustomEvent.prototype = window.Event.prototype;
	
	    window.CustomEvent = CustomEvent;
	  })();
	};
	
	module.exports = custEvent;

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var required = __webpack_require__(90)
	  , lolcation = __webpack_require__(91)
	  , qs = __webpack_require__(92)
	  , relativere = /^\/(?!\/)/
	  , protocolre = /^([a-z0-9.+-]+:)?(\/\/)?(.*)$/i; // actual protocol is first match
	
	/**
	 * These are the parse instructions for the URL parsers, it informs the parser
	 * about:
	 *
	 * 0. The char it Needs to parse, if it's a string it should be done using
	 *    indexOf, RegExp using exec and NaN means set as current value.
	 * 1. The property we should set when parsing this value.
	 * 2. Indication if it's backwards or forward parsing, when set as number it's
	 *    the value of extra chars that should be split off.
	 * 3. Inherit from location if non existing in the parser.
	 * 4. `toLowerCase` the resulting value.
	 */
	var instructions = [
	  ['#', 'hash'],                        // Extract from the back.
	  ['?', 'query'],                       // Extract from the back.
	  ['/', 'pathname'],                    // Extract from the back.
	  ['@', 'auth', 1],                     // Extract from the front.
	  [NaN, 'host', undefined, 1, 1],       // Set left over value.
	  [/\:(\d+)$/, 'port'],                 // RegExp the back.
	  [NaN, 'hostname', undefined, 1, 1]    // Set left over.
	];
	
	 /**
	 * @typedef ProtocolExtract
	 * @type Object
	 * @property {String} protocol Protocol matched in the URL, in lowercase
	 * @property {Boolean} slashes Indicates whether the protocol is followed by double slash ("//")
	 * @property {String} rest     Rest of the URL that is not part of the protocol
	 */
	
	 /**
	  * Extract protocol information from a URL with/without double slash ("//")
	  *
	  * @param  {String} address   URL we want to extract from.
	  * @return {ProtocolExtract}  Extracted information
	  * @private
	  */
	function extractProtocol(address) {
	  var match = protocolre.exec(address);
	  return {
	    protocol: match[1] ? match[1].toLowerCase() : '',
	    slashes: !!match[2],
	    rest: match[3] ? match[3] : ''
	  };
	}
	
	/**
	 * The actual URL instance. Instead of returning an object we've opted-in to
	 * create an actual constructor as it's much more memory efficient and
	 * faster and it pleases my CDO.
	 *
	 * @constructor
	 * @param {String} address URL we want to parse.
	 * @param {Object|String} location Location defaults for relative paths.
	 * @param {Boolean|Function} parser Parser for the query string.
	 * @api public
	 */
	function URL(address, location, parser) {
	  if (!(this instanceof URL)) {
	    return new URL(address, location, parser);
	  }
	
	  var relative = relativere.test(address)
	    , parse, instruction, index, key
	    , type = typeof location
	    , url = this
	    , i = 0;
	
	  //
	  // The following if statements allows this module two have compatibility with
	  // 2 different API:
	  //
	  // 1. Node.js's `url.parse` api which accepts a URL, boolean as arguments
	  //    where the boolean indicates that the query string should also be parsed.
	  //
	  // 2. The `URL` interface of the browser which accepts a URL, object as
	  //    arguments. The supplied object will be used as default values / fall-back
	  //    for relative paths.
	  //
	  if ('object' !== type && 'string' !== type) {
	    parser = location;
	    location = null;
	  }
	
	  if (parser && 'function' !== typeof parser) {
	    parser = qs.parse;
	  }
	
	  location = lolcation(location);
	
	  // extract protocol information before running the instructions
	  var extracted = extractProtocol(address);
	  url.protocol = extracted.protocol || location.protocol || '';
	  url.slashes = extracted.slashes || location.slashes;
	  address = extracted.rest;
	
	  for (; i < instructions.length; i++) {
	    instruction = instructions[i];
	    parse = instruction[0];
	    key = instruction[1];
	
	    if (parse !== parse) {
	      url[key] = address;
	    } else if ('string' === typeof parse) {
	      if (~(index = address.indexOf(parse))) {
	        if ('number' === typeof instruction[2]) {
	          url[key] = address.slice(0, index);
	          address = address.slice(index + instruction[2]);
	        } else {
	          url[key] = address.slice(index);
	          address = address.slice(0, index);
	        }
	      }
	    } else if (index = parse.exec(address)) {
	      url[key] = index[1];
	      address = address.slice(0, address.length - index[0].length);
	    }
	
	    url[key] = url[key] || (instruction[3] || ('port' === key && relative) ? location[key] || '' : '');
	
	    //
	    // Hostname, host and protocol should be lowercased so they can be used to
	    // create a proper `origin`.
	    //
	    if (instruction[4]) {
	      url[key] = url[key].toLowerCase();
	    }
	  }
	
	  //
	  // Also parse the supplied query string in to an object. If we're supplied
	  // with a custom parser as function use that instead of the default build-in
	  // parser.
	  //
	  if (parser) url.query = parser(url.query);
	
	  //
	  // We should not add port numbers if they are already the default port number
	  // for a given protocol. As the host also contains the port number we're going
	  // override it with the hostname which contains no port number.
	  //
	  if (!required(url.port, url.protocol)) {
	    url.host = url.hostname;
	    url.port = '';
	  }
	
	  //
	  // Parse down the `auth` for the username and password.
	  //
	  url.username = url.password = '';
	  if (url.auth) {
	    instruction = url.auth.split(':');
	    url.username = instruction[0] || '';
	    url.password = instruction[1] || '';
	  }
	
	  //
	  // The href is just the compiled result.
	  //
	  url.href = url.toString();
	}
	
	/**
	 * This is convenience method for changing properties in the URL instance to
	 * insure that they all propagate correctly.
	 *
	 * @param {String} prop          Property we need to adjust.
	 * @param {Mixed} value          The newly assigned value.
	 * @param {Boolean|Function} fn  When setting the query, it will be the function used to parse
	 *                               the query.
	 *                               When setting the protocol, double slash will be removed from
	 *                               the final url if it is true.
	 * @returns {URL}
	 * @api public
	 */
	URL.prototype.set = function set(part, value, fn) {
	  var url = this;
	
	  if ('query' === part) {
	    if ('string' === typeof value && value.length) {
	      value = (fn || qs.parse)(value);
	    }
	
	    url[part] = value;
	  } else if ('port' === part) {
	    url[part] = value;
	
	    if (!required(value, url.protocol)) {
	      url.host = url.hostname;
	      url[part] = '';
	    } else if (value) {
	      url.host = url.hostname +':'+ value;
	    }
	  } else if ('hostname' === part) {
	    url[part] = value;
	
	    if (url.port) value += ':'+ url.port;
	    url.host = value;
	  } else if ('host' === part) {
	    url[part] = value;
	
	    if (/\:\d+/.test(value)) {
	      value = value.split(':');
	      url.hostname = value[0];
	      url.port = value[1];
	    }
	  } else if ('protocol' === part) {
	    url.protocol = value;
	    url.slashes = !fn;
	  } else {
	    url[part] = value;
	  }
	
	  url.href = url.toString();
	  return url;
	};
	
	/**
	 * Transform the properties back in to a valid and full URL string.
	 *
	 * @param {Function} stringify Optional query stringify function.
	 * @returns {String}
	 * @api public
	 */
	URL.prototype.toString = function toString(stringify) {
	  if (!stringify || 'function' !== typeof stringify) stringify = qs.stringify;
	
	  var query
	    , url = this
	    , protocol = url.protocol;
	
	  if (protocol && protocol.charAt(protocol.length - 1) !== ':') protocol += ':';
	
	  var result = protocol + (url.slashes ? '//' : '');
	
	  if (url.username) {
	    result += url.username;
	    if (url.password) result += ':'+ url.password;
	    result += '@';
	  }
	
	  result += url.hostname;
	  if (url.port) result += ':'+ url.port;
	
	  result += url.pathname;
	
	  query = 'object' === typeof url.query ? stringify(url.query) : url.query;
	  if (query) result += '?' !== query.charAt(0) ? '?'+ query : query;
	
	  if (url.hash) result += url.hash;
	
	  return result;
	};
	
	//
	// Expose the URL parser and some additional properties that might be useful for
	// others.
	//
	URL.qs = qs;
	URL.location = lolcation;
	module.exports = URL;


/***/ },
/* 90 */
/***/ function(module, exports) {

	'use strict';
	
	/**
	 * Check if we're required to add a port number.
	 *
	 * @see https://url.spec.whatwg.org/#default-port
	 * @param {Number|String} port Port number we need to check
	 * @param {String} protocol Protocol we need to check against.
	 * @returns {Boolean} Is it a default port for the given protocol
	 * @api private
	 */
	module.exports = function required(port, protocol) {
	  protocol = protocol.split(':')[0];
	  port = +port;
	
	  if (!port) return false;
	
	  switch (protocol) {
	    case 'http':
	    case 'ws':
	    return port !== 80;
	
	    case 'https':
	    case 'wss':
	    return port !== 443;
	
	    case 'ftp':
	    return port !== 21;
	
	    case 'gopher':
	    return port !== 70;
	
	    case 'file':
	    return false;
	  }
	
	  return port !== 0;
	};


/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	var slashes = /^[A-Za-z][A-Za-z0-9+-.]*:\/\//;
	
	/**
	 * These properties should not be copied or inherited from. This is only needed
	 * for all non blob URL's as a blob URL does not include a hash, only the
	 * origin.
	 *
	 * @type {Object}
	 * @private
	 */
	var ignore = { hash: 1, query: 1 }
	  , URL;
	
	/**
	 * The location object differs when your code is loaded through a normal page,
	 * Worker or through a worker using a blob. And with the blobble begins the
	 * trouble as the location object will contain the URL of the blob, not the
	 * location of the page where our code is loaded in. The actual origin is
	 * encoded in the `pathname` so we can thankfully generate a good "default"
	 * location from it so we can generate proper relative URL's again.
	 *
	 * @param {Object|String} loc Optional default location object.
	 * @returns {Object} lolcation object.
	 * @api public
	 */
	module.exports = function lolcation(loc) {
	  loc = loc || global.location || {};
	  URL = URL || __webpack_require__(89);
	
	  var finaldestination = {}
	    , type = typeof loc
	    , key;
	
	  if ('blob:' === loc.protocol) {
	    finaldestination = new URL(unescape(loc.pathname), {});
	  } else if ('string' === type) {
	    finaldestination = new URL(loc, {});
	    for (key in ignore) delete finaldestination[key];
	  } else if ('object' === type) {
	    for (key in loc) {
	      if (key in ignore) continue;
	      finaldestination[key] = loc[key];
	    }
	
	    if (finaldestination.slashes === undefined) {
	      finaldestination.slashes = slashes.test(loc.href);
	    }
	  }
	
	  return finaldestination;
	};
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 92 */
/***/ function(module, exports) {

	'use strict';
	
	var has = Object.prototype.hasOwnProperty;
	
	/**
	 * Simple query string parser.
	 *
	 * @param {String} query The query string that needs to be parsed.
	 * @returns {Object}
	 * @api public
	 */
	function querystring(query) {
	  var parser = /([^=?&]+)=([^&]*)/g
	    , result = {}
	    , part;
	
	  //
	  // Little nifty parsing hack, leverage the fact that RegExp.exec increments
	  // the lastIndex property so we can continue executing this loop until we've
	  // parsed all results.
	  //
	  for (;
	    part = parser.exec(query);
	    result[decodeURIComponent(part[1])] = decodeURIComponent(part[2])
	  );
	
	  return result;
	}
	
	/**
	 * Transform a query string to an object.
	 *
	 * @param {Object} obj Object that should be transformed.
	 * @param {String} prefix Optional prefix.
	 * @returns {String}
	 * @api public
	 */
	function querystringify(obj, prefix) {
	  prefix = prefix || '';
	
	  var pairs = [];
	
	  //
	  // Optionally prefix with a '?' if needed
	  //
	  if ('string' !== typeof prefix) prefix = '?';
	
	  for (var key in obj) {
	    if (has.call(obj, key)) {
	      pairs.push(encodeURIComponent(key) +'='+ encodeURIComponent(obj[key]));
	    }
	  }
	
	  return pairs.length ? prefix + pairs.join('&') : '';
	}
	
	//
	// Expose the module.
	//
	exports.stringify = querystringify;
	exports.parse = querystring;


/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _freeze = __webpack_require__(94);
	
	var _freeze2 = _interopRequireDefault(_freeze);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	var filterOptions = ['none', 'blur', 'brightness', 'contrast', 'invert', 'opacity', 'saturate', 'sepia', 'drop-shadow', 'grayscale', 'hue-rotate'];
	
	(0, _freeze2["default"])(filterOptions);
	
	/**
	 * Each filter style needs to adjust the strength value (1 - 100) by a `modifier`
	 * function and a unit, as appropriate. The `modifier` is purely subjective.
	 */
	var filterProperties = {
	  blur: {
	    modifier: function modifier(value) {
	      return value * 0.3;
	    },
	    unit: 'px'
	  },
	  brightness: {
	    modifier: function modifier(value) {
	      return value * 0.009 + 0.1;
	    },
	    unit: ''
	  },
	  contrast: {
	    modifier: function modifier(value) {
	      return value * 0.4 + 80;
	    },
	    unit: '%'
	  },
	  grayscale: {
	    modifier: function modifier(value) {
	      return value;
	    },
	    unit: '%'
	  },
	  'hue-rotate': {
	    modifier: function modifier(value) {
	      return value * 3.6;
	    },
	    unit: 'deg'
	  },
	  invert: {
	    modifier: function modifier(value) {
	      return 1;
	    },
	    unit: ''
	  },
	  opacity: {
	    modifier: function modifier(value) {
	      return value;
	    },
	    unit: '%'
	  },
	  saturate: {
	    modifier: function modifier(value) {
	      return value * 2;
	    },
	    unit: '%'
	  },
	  sepia: {
	    modifier: function modifier(value) {
	      return value;
	    },
	    unit: '%'
	  }
	};
	
	(0, _freeze2["default"])(filterProperties);
	
	module.exports = {
	  filterOptions: filterOptions,
	  filterProperties: filterProperties
	};

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(95), __esModule: true };

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(96);
	module.exports = __webpack_require__(16).Object.freeze;

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.5 Object.freeze(O)
	var isObject = __webpack_require__(22)
	  , meta     = __webpack_require__(72).onFreeze;
	
	__webpack_require__(97)('freeze', function($freeze){
	  return function freeze(it){
	    return $freeze && isObject(it) ? $freeze(meta(it)) : it;
	  };
	});

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	// most Object methods by ES6 should accept primitives
	var $export = __webpack_require__(14)
	  , core    = __webpack_require__(16)
	  , fails   = __webpack_require__(25);
	module.exports = function(KEY, exec){
	  var fn  = (core.Object || {})[KEY] || Object[KEY]
	    , exp = {};
	  exp[KEY] = exec(fn);
	  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
	};

/***/ },
/* 98 */
/***/ function(module, exports) {

	var getPropsFromNode = function(node) {
	  var props = {
	    'container': node
	  };
	
	  if (node.getAttribute('data-config-url')) {
	    props.url = node.getAttribute('data-config-url');
	  }
	
	  if (node.getAttribute('data-config-playback-speed')) {
	    props.playbackSpeed = node.getAttribute('data-config-playback-speed');
	  }
	
	  if (node.getAttribute('data-config-filter')) {
	    props.filter = node.getAttribute('data-config-filter');
	  }
	
	  if (node.getAttribute('data-config-filter-strength')) {
	    props.filterStrength = node.getAttribute('data-config-filter-strength');
	  }
	
	  return props;
	};
	
	module.exports = getPropsFromNode;


/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	var URL = __webpack_require__(89);
	
	
	Y.use('node', 'event-custom', function () {
		Y.namespace('Template').helper = Singleton.create({
	
			ready: function() {
	
				Y.on('domready', function() {
					this.bindUI();
				}, this);
	
				// This is for registering custom event handlers.
				Y.augment(this, Y.EventTarget, true, null, {
					emitFacade: true
				});
	
			},
	
	
			bindUI: function() {
	
				this.dataToggleBody();
				this.dataToggleEl();
				this.dataLightbox();
	
				/*
					Below: Event handlers for debounced resize and scroll.
	
	        Y.Template.helper.on('resizeend', function (e) {
	          // Callback here.
	        });
				*/
	
				Y.one(window).on('resize', function () {
					this._resize && this._resize.cancel();
					this._resize = Y.later(150, this, function () {
						this.fire('resizeend');
					});
	
					this.syncUI();
				}, this);
	
	
	      /*
	        Y.Template.helper.on('scrollend', function (e) {
	          // Callback here.
	        });
	      */
	
				Y.one(window).on('scroll', function () {
					this._scroll && this._scroll.cancel();
					this._scroll = Y.later(150, this, function () {
						this.fire('scrollend');
					});
				}, this);
	
			},
	
	
			syncUI: function () {
	
				if (Y.one('.touch-styles')) {
					Y.one(window).on('orientationchange', function () {
						this.imgLoad();
					}, this);
				} else {
					Y.Template.helper.on('resizeend', function () {
						this.imgLoad();
					});
				}
	
			},
	
	
			radioCheckboxes: function (wrapper, checkbox, label) {
	
				/*
					Makes a group of checkboxes behave more
					like radios.
	
					Only the wrapper param is required.
					Checkbox and label default to the most
					generic selectors possible, but you can
					make them more specific.
	
					helper.radioCheckboxes('#nav', '.folder-checkbox', '.folder-label');
				*/
	
				if (!wrapper) {
					console.warn('radioCheckboxes: Must define a wrapper.');
					return;
				}
	
				if (!Y.one(wrapper)) {
					console.warn('radioCheckboxes: No wrapper found on page.');
					return;
				}
	
				checkbox = checkbox || '[type="checkbox"]';
				label = label || 'label[for]';
	
				if (Y.one(wrapper).all(checkbox).size() > 1) {
					Y.one(wrapper).delegate('click', function (e) {
						e.preventDefault();
						var currentCheck = Y.one('#' + e.currentTarget.getAttribute('for'));
						if (currentCheck.get('checked') === false) {
							Y.one(wrapper).all(checkbox).each(function (current) {
								current.set('checked', false);
							});
							currentCheck.set('checked', true);
						} else {
							currentCheck.set('checked', false);
						}
					}, label);
				}
	
			},
	
	
			folderRedirect: function (folder, wrapper) {
	
				/*
					Redirects the main folder link to the first
					page in the folder. Relies on a data attribute
					in the markup.
	
					<label for="{id}" data-href="{urlId}">Folder</label>
				*/
	
				folder = folder || 'label[for]';
				wrapper = wrapper || 'body';
	
				if (Y.one(folder) && !Y.one('.touch-styles')) {
					Y.one(wrapper).delegate('click', function (e) {
						e.preventDefault();
						var link = e.currentTarget.getData('href');
						if (link) {
							window.location = link;
						} else {
							console.warn('folderRedirect: You must add a data-href attribute to the label.')
						}
					}, folder);
				}
	
			},
	
	
			dataLightbox: function() {
	
				/*
					Creates a lightbox when you click on any image/video.
					To initialize, add a data attribute to any img or video tag
	
					<img data-lightbox="set-name"/>
				*/
	
				var lightboxSets = {};
	
				Y.all('[data-lightbox]').each(function(elem) {
					var name = elem.getAttribute('data-lightbox');
					lightboxSets[name] = lightboxSets[name] || new Array();
	
					lightboxSets[name].push({
						content: elem,
						meta: elem.getAttribute('alt')
					});
	
					elem.on('click', function(e) {
						e.halt();
	
						new Y.Squarespace.Lightbox2({
							set: lightboxSets[name],
							currentSetIndex: Y.all('[data-lightbox]').indexOf(elem),
							controls: { previous: true, next: true }
						}).render();
					});
				});
	
			},
	
	
			dataToggleBody: function() {
	
				/*
					Toggles a class on the body when you click an
					element. To initialize, add a data attribute to
					any element, like so.
	
					<div class="shibe" data-toggle-body="doge"></div>
				*/
	
				Y.one('body').delegate('click', function(e) {
					Y.one('body').toggleClass(e.currentTarget.getData('toggle-body'));
				}, '[data-toggle-body]');
	
			},
	
	
			dataToggleEl: function() {
	
				/*
					Toggles a class on any element when you click on
					it. To initialize, add a data attribute to any
					element, like so.
	
					<div class="shibe" data-toggle="doge"></div>
				*/
	
				Y.one('body').delegate('click', function(e) {
					var current = e.currentTarget;
					current.toggleClass(current.getData('toggle'));
				}, '[data-toggle]');
	
			},
	
	
			debounce: function(callback, timer, context) {
	
				/*
					This function takes an event that executes
					continuously - like scroll or resize - and
					fires only one event when the continuous
					events are finished.
	
					helpers.debounce(function () {
						// do stuff here.
					});
				*/
	
				timer = timer || 100;
				context = context || Y.Template.Site;
	
				if (callback) {
					this._timeout && this._timeout.cancel();
					this._timeout = Y.later(timer, context, callback);
				}
	
			},
	
	
			imgLoad: function (el) {
	
				/*
					Pass an image selector to this function and
					Squarespace will load up the proper image
					size.
	
					ex: this.imgLoad('img[data-src]');
				*/
	
				el = el || 'img[data-src]';
	
				Y.all(el).each(function (img) {
					ImageLoader.load(img);
				});
	
			},
	
	
			scrollAnchors: function () {
	
				/*
					Makes anchor links scroll smoothly instead of jumping
					down the page. The "el" argument is optional. By
					default, invoking this function will create the smooth
					scrolling behavior on every hash link.
	
					Y.Template.helper.scrollAnchors();
				*/
	
				if (!history.pushState) {
					return false;
				}
	
				var anchors = 'a[href*="#"]';
	
				Y.one('body').delegate('click', function (e) {
	
					var href = e.currentTarget.get('href');
					var hash = this._getSamePageHash(href);
	
					if (hash && Y.one(hash)) {
	
						e.halt();
	
						// Close overlay nav
						if (Y.Template.Site.mobileNav) {
							Y.one('#mobileNavToggle')
								.set('checked',false)
								.simulate('change');
						}
	
						this.smoothScrollTo(Y.one(hash).getY());
						history.pushState({}, hash, hash);
	
					}
				}, anchors, this);
	
			},
	
	
			_getSamePageHash: function(url) {
	
				/*
					Checks to see if given url is a hash link to a location
					on the same page. If so, returns the hash link. If not,
					returns null.
				*/
	
				var url = new URL(url);
				var loc = new URL(window.location.href);
	
				if (url.host !== loc.host || url.pathname !== loc.pathname || url.hash === '') {
					return null;
				}
	
				return url.hash;
	
			},
	
	
			smoothScrollTo: function (point) {
	
				/*
					Scrolls to some point on the Y axis of a page.
					Accepts a number as an argument.
				*/
	
				if (parseInt(point) == NaN) {
					console.warn('helpers.js: smoothScrollTo must have a scroll point passed to it.')
					return false;
				}
	
				if (!Y.Lang.isNumber(point)) {
					try {
						point = parseInt(point);
					} catch (e) {
						console.warn('helpers.js: scrollTo was passed an invalid argument.');
						return false;
					}
				}
	
				if (Y.UA.mobile) {
					window.scroll(0, point);
				} else {
					var a = new Y.Anim({
						node: Y.one(Y.UA.gecko || Y.UA.ie || !!navigator.userAgent.match(/Trident.*rv.11\./) ? 'html' : 'body'),
						to: {
							scrollTop : point
						},
						duration: 0.4,
						easing: 'easeOut'
					});
	
					a.run();
	
					a.on('end', function () {
						a.destroy();
					});
				}
	
			},
	
	
			disableScroll: function (bodyClass) {
	
				if (!Y.Lang.isString(bodyClass)) {
					console.warn('helpers.js: disableScroll arg must be a string.');
					return false;
				}
	
				var lastScroll = Y.config.win.scrollY;
	
				Y.one(window).on('scroll', function () {
					if (Y.one('body').hasClass(bodyClass)) {
						window.scrollTo(0, lastScroll);
					} else {
						lastScroll = Y.config.win.scrollY;
					}
				}, this);
	
			},
	
	
			centerMapPin: function (mapEl, locationData) {
	
				/*
					Pass the Y node and location JSON
					to this method. Ex:
	
					Y.all('.sqs-block-map').each(function (map) {
						Y.Template.helper.centerMapPin(
							map,
							map.getData('block-json')
						);
					});
				*/
	
		    var map = mapEl._node.__map;
	
				if (!map) {
					console.error('helpers.js: Invalid argument passed to centerMapPin method.');
					return false;
				}
	
		    var center = map.getCenter();
	
		    center.d = locationData.location.mapLat;
		    center.e = locationData.location.mapLng;
	
		    google.maps.event.trigger(map, 'resize');
		    map.setCenter(center);
	
			}
	
	
		});
	});


/***/ },
/* 100 */
/***/ function(module, exports) {

	// every tweak event that's available
		// tweak:close
		// tweak:discard
		// tweak:aftershow
		// tweak:afterclose
		// tweak:reset
		// tweak:presetcreated
		// tweak:save
		// tweak:change
		// tweak:afterpreset
	
	Y.use('node', function (Y) {
		Y.namespace('Template').Authenticated = Singleton.create({
	
			ready: function () {
				this.bindUI();
			},
	
			bindUI: function () {
	
				Y.Global.on('tweak:beforeopen', function (f) {
					setTimeout(function () {
						Y.one(window).simulate('resize');
					}, 500);
				});
	
				Y.Global.on(['tweak:save', 'tweak:discard', 'tweak:beforeopen'], function (f) {
					if (Y.one('.always-use-overlay-nav')) {
		        		Y.one('#mobileNavToggle').set('checked',false).simulate('change');
			    	}
				});
	
				Y.Global.on('tweak:discard', function (f) {
	
				});
	
				Y.Global.on('tweak:close', function (f) {
					setTimeout(function () {
						Y.one(window).simulate('resize');
					}, 500);
					if (Y.one('#header.tweaking')) {
						Y.one('#header.tweaking').removeClass('tweaking');
					}
				});
	
				Y.Global.on('tweak:aftershow', function (f) {
					Y.Template.noYUI.vCenterTopSectionContent();
					Y.Template.Site.runCenterNav();
				}, this);
	
				Y.Global.on('tweak:change', function (f) {
					var name = f.getName();
					var value = f.getValue();
	
	
					if (typeof value == 'string') {
						value = value.toLowerCase();
						value = value.replace(' ', '-');
					}
	
					if(name == 'siteTitleContainerWidth' || name == 'logoWidth'){
						Y.one('#header').addClass('tweaking');
						Y.Template.helper.debounce(function () {
							Y.one('#header').removeClass('tweaking');
						},500);
					}
	
					if ( name == 'design' ) {
						Y.Template.Site.regularHeaderForGridGallery();
					}
	
					if (Y.one('.always-use-overlay-nav')) {
						if (
						name == 'nav-font' ||
						name == 'navColor' ||
						name == 'navActiveColor' ||
						name == 'expand-homepage-index-links'
						) {
							Y.one('#mobileNavToggle').set('checked',true).simulate('change');
						}
					}
	
					if ( name == 'always-use-overlay-nav' ) {
						Y.Template.Site.injectScrollNavContent();
						Y.Template.noYUI.vCenterTopSectionContent();
						Y.Template.Site.runCenterNav();
					}
	
					if (
					name == 'siteTitleContainerWidth' ||
					name == 'logoWidth' ||
					name == 'nav-font' ||
					name == 'expand-homepage-index-links'
					) {
						Y.later(140, this, function() {
							Y.Template.noYUI.vCenterTopSectionContent();
							Y.Template.Site.runCenterNav();
						});
					}
	
					if(name == 'transparent-header'){
						Y.Template.helper.debounce(function () {
							Y.Template.helper.imgLoad();
						});
					}
	
				});
	
			}
	
		});
	});


/***/ }
/******/ ]);