/*
* MIXITUP - A CSS3 and JQuery Filter & Sort Plugin
* Version: 1.5.4
* License: Creative Commons Attribution-NoDerivs 3.0 Unported - CC BY-ND 3.0
* http://creativecommons.org/licenses/by-nd/3.0/
* This software may be used freely on commercial and non-commercial projects with attribution to the author/copyright holder.
* Author: Patrick Kunka
* Copyright 2012-2013 Patrick Kunka, Barrel LLC, All Rights Reserved
* 
* http://mixitup.io
*/

(function($){
	
	// DECLARE methods1
 
	var methods1 = {

		// "INIT" METHOD
	
	    init: function(settings1){

			return this.each(function(){
				
				// BUILD config1 OBJECT

				var config1 = {
					
					// PUBLIC PROPERTIES
					
					targetSelector : '.mix1',
					filterSelector : '.filter1',
					sortSelector : '.sort',
					buttonEvent: 'click',
					effects : ['fade', 'scale'],
					listEffects : null,
					easing : 'smooth',
					layoutMode: 'grid',
					targetDisplayGrid : 'inline-block',
					targetDisplayList: 'block',
					listClass : '',
					gridClass : '',
					transitionSpeed : 600,
					showOnLoad : 'all',
					sortOnLoad : false,
					multiFilter : false,
					filterLogic : 'or',
					resizeContainer : true,
					minHeight : 0,
					failClass : 'fail',
					perspectiveDistance : '3000',
					perspectiveOrigin : '50% 50%',
					animateGridList : true,
					onMixLoad: null,
					onMixStart : null,
					onMixEnd : null,

					// MISC

					container : null,
					origOrder : [],
					startOrder : [],
					newOrder : [],
					origSort: [],
					checkSort: [],
					filter : '',
					mixing : false,
					origDisplay : '',
					origLayout: '',
					origHeight : 0, 
					newHeight : 0,
					isTouch : false,
					resetDelay : 0,
					failsafe : null,

					// CSS
					
					prefix : '',
					easingFallback : 'ease-in-out',
					transition : {}, 
					perspective : {}, 
					clean : {},
					fade : '1',
					scale : '',
					rotateX : '',
					rotateY : '',
					rotateZ : '',
					blur : '',
					grayscale : ''
				};
				
				if(settings1){
					$.extend(config1, settings1);
				};

				// ADD config1 OBJECT TO CONTAINER OBJECT PER INSTANTIATION
				
				this.config1 = config1;
				
				// DETECT TOUCH
				
				$.support.touch = 'ontouchend' in document;

				if ($.support.touch) {
					config1.isTouch = true;
					config1.resetDelay = 350;
				};
				
				// LOCALIZE CONTAINER
	
				config1.container = $(this);
				var $cont = config1.container;
				
				// GET VENDOR PREFIX
				
				config1.prefix = prefix($cont[0]);
				config1.prefix = config1.prefix ? '-'+config1.prefix.toLowerCase()+'-' : '';
				
				// CACHE 'DEFAULT' SORTING ORDER
			
				$cont.find(config1.targetSelector).each(function(){
					config1.origOrder.push($(this));
				});
				
				// PERFORM SORT ON LOAD 
				
				if(config1.sortOnLoad){
					var sortby, order;
					if($.isArray(config1.sortOnLoad)){
						sortby = config1.sortOnLoad[0], order = config1.sortOnLoad[1];
						$(config1.sortSelector+'[data-sort='+config1.sortOnLoad[0]+'][data-order='+config1.sortOnLoad[1]+']').addClass('active');
					} else {
						$(config1.sortSelector+'[data-sort='+config1.sortOnLoad+']').addClass('active');
						sortby = config1.sortOnLoad, config1.sortOnLoad = 'desc';
					};
					sort(sortby, order, $cont, config1);
				};
				
				// BUILD TRANSITION AND PERSPECTIVE OBJECTS
				
				for(var i = 0; i<2; i++){
					var a = i==0 ? a = config1.prefix : '';
					config1.transition[a+'transition'] = 'all '+config1.transitionSpeed+'ms ease-in-out';
					config1.perspective[a+'perspective'] = config1.perspectiveDistance+'px';
					config1.perspective[a+'perspective-origin'] = config1.perspectiveOrigin;
				};
				
				// BUILD TRANSITION CLEANER
				
				for(var i = 0; i<2; i++){
					var a = i==0 ? a = config1.prefix : '';
					config1.clean[a+'transition'] = 'none';
				};
	
				// CHOOSE GRID OR LIST
	
				if(config1.layoutMode == 'list'){
					$cont.addClass(config1.listClass);
					config1.origDisplay = config1.targetDisplayList;
				} else {
					$cont.addClass(config1.gridClass);
					config1.origDisplay = config1.targetDisplayGrid;
				};
				config1.origLayout = config1.layoutMode;
				
				// PARSE 'SHOWONLOAD'
				
				var showOnLoadArray = config1.showOnLoad.split(' ');
				
				// GIVE ACTIVE FILTER ACTIVE CLASS
				
				$.each(showOnLoadArray, function(){
					$(config1.filterSelector+'[data-filter="'+this+'"]').addClass('active');
				});
				
				// RENAME "ALL" CATEGORY TO "MIX_ALL"
	
				$cont.find(config1.targetSelector).addClass('mix_all1');
				if(showOnLoadArray[0]  == 'all'){
					showOnLoadArray[0] = 'mix_all1',
					config1.showOnLoad = 'mix_all1';
				};
				
				// FADE IN 'SHOWONLOAD'
				
				var $showOnLoad = $();
				$.each(showOnLoadArray, function(){
					$showOnLoad = $showOnLoad.add($('.'+this))
				});
				
				$showOnLoad.each(function(){
					var $t = $(this);
					if(config1.layoutMode == 'list'){
						$t.css('display',config1.targetDisplayList);
					} else {
						$t.css('display',config1.targetDisplayGrid);
					};
					$t.css(config1.transition);
				});
				
				// WRAP FADE-IN TO PREVENT RACE CONDITION
				
				var delay = setTimeout(function(){
					
					config1.mixing = true;
					
					$showOnLoad.css('opacity','1');
					
					// CLEAN UP
					
					var reset = setTimeout(function(){
						if(config1.layoutMode == 'list'){
							$showOnLoad.removeStyle(config1.prefix+'transition, transition').css({
								display: config1.targetDisplayList,
								opacity: 1
							});
						} else {
							$showOnLoad.removeStyle(config1.prefix+'transition, transition').css({
								display: config1.targetDisplayGrid,
								opacity: 1
							});
						};
						
						// FIRE "ONMIXLOAD" CALLBACK
						
						config1.mixing = false;

						if(typeof config1.onMixLoad == 'function') {
							var output = config1.onMixLoad.call(this, config1);

							// UPDATE config1 IF DATA RETURNED

							config1 = output ? output : config1;
						};
						
					},config1.transitionSpeed);
				},10);
				
				// PRESET ACTIVE FILTER
				
				config1.filter = config1.showOnLoad;
			
				// BIND SORT CLICK HANDLERS
			
				$(config1.sortSelector).bind(config1.buttonEvent,function(){
					
					if(!config1.mixing){
						
						// PARSE SORT ARGUMENTS FROM BUTTON CLASSES
						
						var $t = $(this),
						sortby = $t.attr('data-sort'),
						order = $t.attr('data-order');
						
						if(!$t.hasClass('active')){
							$(config1.sortSelector).removeClass('active');
							$t.addClass('active');
						} else {
							if(sortby != 'random')return false;
						};
						
						$cont.find(config1.targetSelector).each(function(){
							config1.startOrder.push($(this));
						});
				
						goMix(config1.filter,sortby,order,$cont, config1);
				
					};
				
				});

				// BIND FILTER CLICK HANDLERS

				$(config1.filterSelector).bind(config1.buttonEvent,function(){
				
					if(!config1.mixing){
						
						var $t = $(this);
						
						// PARSE FILTER ARGUMENTS FROM BUTTON CLASSES
		
						if(config1.multiFilter == false){
							
							// SINGLE ACTIVE BUTTON
							
							$(config1.filterSelector).removeClass('active');
							$t.addClass('active');
						
							config1.filter = $t.attr('data-filter');
						
							$(config1.filterSelector+'[data-filter="'+config1.filter+'"]').addClass('active');

						} else {
						
							// MULTIPLE ACTIVE BUTTONS
							
							var thisFilter = $t.attr('data-filter'); 
						
							if($t.hasClass('active')){
								$t.removeClass('active');
								
								// REMOVE FILTER FROM SPACE-SEPERATED STRING
								
								var re = new RegExp('(\\s|^)'+thisFilter);
								config1.filter = config1.filter.replace(re,'');
							} else {
								
								// ADD FILTER TO SPACE-SEPERATED STRING
								
								$t.addClass('active');
								config1.filter = config1.filter+' '+thisFilter;
								
							};
						};
						
						// GO MIX
						
						goMix(config1.filter, null, null, $cont, config1);

					};
				
				});
					
			});
		},
	
		// "TOGRID" METHOD
	
		toGrid: function(){
			return this.each(function(){
				var config1 = this.config1;
				if(config1.layoutMode != 'grid'){
					config1.layoutMode = 'grid';
					goMix(config1.filter, null, null, $(this), config1);
				};
			});
		},
	
		// "TOLIST" METHOD
	
		toList: function(){
			return this.each(function(){
				var config1 = this.config1;
				if(config1.layoutMode != 'list'){
					config1.layoutMode = 'list';
					goMix(config1.filter, null, null, $(this), config1);
				};
			});
		},
	
		// "FILTER" METHOD
	
		filter: function(arg){
			return this.each(function(){
				var config1 = this.config1;
				if(!config1.mixing){	
					$(config1.filterSelector).removeClass('active');
					$(config1.filterSelector+'[data-filter="'+arg+'"]').addClass('active');
					goMix(arg, null, null, $(this), config1);
				};
			});	
		},
	
		// "SORT" METHOD
	
		sort: function(args){
			return this.each(function(){
				var config1 = this.config1,
					$t = $(this);
				if(!config1.mixing){
					$(config1.sortSelector).removeClass('active');
					if($.isArray(args)){
						var sortby = args[0], order = args[1];
						$(config1.sortSelector+'[data-sort="'+args[0]+'"][data-order="'+args[1]+'"]').addClass('active');
					} else {
						$(config1.sortSelector+'[data-sort="'+args+'"]').addClass('active');
						var sortby = args, order = 'desc';
					};
					$t.find(config1.targetSelector).each(function(){
						config1.startOrder.push($(this));
					});
					
					goMix(config1.filter,sortby,order, $t, config1);
				
				};
			});
		},
		
		// "MULTIMIX" METHOD
		
		multimix: function(args){
			return this.each(function(){
				var config1 = this.config1,
					$t = $(this);
					multiOut = {
						filter: config1.filter,
						sort: null,
						order: 'desc',
						layoutMode: config1.layoutMode
					};
				$.extend(multiOut, args);
				if(!config1.mixing){
					$(config1.filterSelector).add(config1.sortSelector).removeClass('active');
					$(config1.filterSelector+'[data-filter="'+multiOut.filter+'"]').addClass('active');
					if(typeof multiOut.sort !== 'undefined'){
						$(config1.sortSelector+'[data-sort="'+multiOut.sort+'"][data-order="'+multiOut.order+'"]').addClass('active');
						$t.find(config1.targetSelector).each(function(){
							config1.startOrder.push($(this));
						});
					};
					config1.layoutMode = multiOut.layoutMode;
					goMix(multiOut.filter,multiOut.sort,multiOut.order, $t, config1);
				};
			});
		},
		
		// "REMIX" METHOD

		remix: function(arg){
			return this.each(function(){
				var config1 = this.config1,
					$t = $(this);	
				config1.origOrder = [];
				$t.find(config1.targetSelector).each(function(){
					var $th = $(this);
					$th.addClass('mix_all1'); 
				    config1.origOrder.push($th);
				});
				if(!config1.mixing && typeof arg !== 'undefined'){
					$(config1.filterSelector).removeClass('active');
					$(config1.filterSelector+'[data-filter="'+arg+'"]').addClass('active');
					goMix(arg, null, null, $t, config1);
				};
			});
		}
	};
	
	// DECLARE PLUGIN

	$.fn.mixitup1 = function(method, arg){
		if (methods1[method]) {
			return methods1[method].apply( this, Array.prototype.slice.call(arguments,1));
		} else if (typeof method === 'object' || ! method){
			return methods1.init.apply( this, arguments );
		};
	};
	
	/* ==== THE MAGIC ==== */
	
	function goMix(filter, sortby, order, $cont, config1){
		
		// WE ARE NOW MIXING

		clearInterval(config1.failsafe);
		config1.mixing = true;	
		
		// APPLY ARGS TO config1
		
		config1.filter = filter;
		
		// FIRE "ONMIXSTART" CALLBACK
		
		if(typeof config1.onMixStart == 'function') {
			var output = config1.onMixStart.call(this, config1);
			
			// UPDATE config1 IF DATA RETURNED
			
			config1 = output ? output : config1;
		};
		
		// SHORT LOCAL VARS
		
		var speed = config1.transitionSpeed;
		
		// REBUILD TRANSITION AND PERSPECTIVE OBJECTS
		
		for(var i = 0; i<2; i++){
			var a = i==0 ? a = config1.prefix : '';
			config1.transition[a+'transition'] = 'all '+speed+'ms linear';
			config1.transition[a+'transform'] = a+'translate3d(0,0,0)';
			config1.perspective[a+'perspective'] = config1.perspectiveDistance+'px';
			config1.perspective[a+'perspective-origin'] = config1.perspectiveOrigin;
		};
		
		// CACHE TARGET ELEMENTS FOR QUICK ACCESS
		
		var mixSelector = config1.targetSelector,
		$targets = $cont.find(mixSelector);
		
		// ADD DATA OBJECT TO EACH TARGET
		
		$targets.each(function(){
			this.data = {};
		});
		
		// RE-DEFINE CONTAINER INCASE NOT IMMEDIATE PARENT OF TARGET ELEMENTS 
		
		var $par = $targets.parent();
	
		// ADD PERSPECTIVE TO CONTAINER 
		
		$par.css(config1.perspective);
		
		// SETUP EASING

		config1.easingFallback = 'ease-in-out';
		if(config1.easing == 'smooth')config1.easing = 'cubic-bezier(0.25, 0.46, 0.45, 0.94)';
		if(config1.easing == 'snap')config1.easing = 'cubic-bezier(0.77, 0, 0.175, 1)';
		if(config1.easing == 'windback'){
			config1.easing = 'cubic-bezier(0.175, 0.885, 0.320, 1.275)',
			config1.easingFallback = 'cubic-bezier(0.175, 0.885, 0.320, 1)'; // Fall-back for old webkit, with no values > 1 or < 1
		};
		if(config1.easing == 'windup'){
			config1.easing = 'cubic-bezier(0.6, -0.28, 0.735, 0.045)',
			config1.easingFallback = 'cubic-bezier(0.6, 0.28, 0.735, 0.045)';
		};
		
		// USE LIST SPECIFIC EFFECTS IF DECLARED
		
		var effectsOut = config1.layoutMode == 'list' && config1.listEffects != null ? config1.listEffects : config1.effects;
	
		// BUILD EFFECTS STRINGS & SKIP IF IE8
	
		if (Array.prototype.indexOf){
			config1.fade = effectsOut.indexOf('fade') > -1 ? '0' : '';
			config1.scale = effectsOut.indexOf('scale') > -1 ? 'scale(.01)' : '';
			config1.rotateZ = effectsOut.indexOf('rotateZ') > -1 ? 'rotate(180deg)' : '';
			config1.rotateY = effectsOut.indexOf('rotateY') > -1 ? 'rotateY(90deg)' : '';
			config1.rotateX = effectsOut.indexOf('rotateX') > -1 ? 'rotateX(90deg)' : '';
			config1.blur = effectsOut.indexOf('blur') > -1 ? 'blur(8px)' : '';
			config1.grayscale = effectsOut.indexOf('grayscale') > -1 ? 'grayscale(100%)' : '';
		};
		
		// DECLARE NEW JQUERY OBJECTS FOR GROUPING
		
		var $show = $(), 
		$hide = $(),
		filterArray = [],
		multiDimensional = false;
		
		// BUILD FILTER ARRAY(S)
		
		if(typeof filter === 'string'){
			
			// SINGLE DIMENSIONAL FILTERING
			
			filterArray = buildFilterArray(filter);
			
		} else {
			
			// MULTI DIMENSIONAL FILTERING
			
			multiDimensional = true;
			
			$.each(filter,function(i){
				filterArray[i] = buildFilterArray(this);
			});
		};

		// "OR" LOGIC (DEFAULT)
		
		if(config1.filterLogic == 'or'){
			
			if(filterArray[0] == '') filterArray.shift(); // IF FIRST ITEM IN ARRAY IS AN EMPTY SPACE, DELETE
			
			// IF NO ELEMENTS ARE DESIRED THEN HIDE ALL VISIBLE ELEMENTS
		
			if(filterArray.length < 1){
				
				$hide = $hide.add($cont.find(mixSelector+':visible'));
				
			} else {

			// ELSE CHECK EACH TARGET ELEMENT FOR ANY FILTER CATEGORY:
			
				$targets.each(function(){
					var $t = $(this);
					if(!multiDimensional){
						// IF HAS ANY FILTER, ADD TO "SHOW" OBJECT
						if($t.is('.'+filterArray.join(', .'))){
							$show = $show.add($t);
						// ELSE IF HAS NO FILTERS, ADD TO "HIDE" OBJECT
						} else {
							$hide = $hide.add($t);
						};
					} else {
						
						var pass = 0;
						// FOR EACH DIMENSION
						
						$.each(filterArray,function(i){
							if(this.length){
								if($t.is('.'+this.join(', .'))){
									pass++
								};
							} else if(pass > 0){
								pass++;
							};
						});
						// IF PASSES ALL DIMENSIONS, SHOW
						if(pass == filterArray.length){
							$show = $show.add($t);
						// ELSE HIDE
						} else {
							$hide = $hide.add($t);
						};
					};
				});
			
			};
	
		} else {
			
		// "AND" LOGIC
			
			// ADD "MIX_SHOW" CLASS TO ELEMENTS THAT HAVE ALL FILTERS
			
			$show = $show.add($par.find(mixSelector+'.'+filterArray.join('.')));
			
			// ADD "MIX_HIDE" CLASS TO EVERYTHING ELSE
			
			$hide = $hide.add($par.find(mixSelector+':not(.'+filterArray.join('.')+'):visible'));
		};
		
		// GET TOTAL NUMBER OF ELEMENTS TO SHOW
		
		var total = $show.length;
		
		// DECLARE NEW JQUERY OBJECTS

		var $tohide = $(),
		$toshow = $(),
		$pre = $();
		
		// FOR ELEMENTS TO BE HIDDEN, IF NOT ALREADY HIDDEN THEN ADD TO OBJECTS "TOHIDE" AND "PRE" 
		// TO INDICATE PRE-EXISTING ELEMENTS TO BE HIDDEN
		
		$hide.each(function(){
			var $t = $(this);
			if($t.css('display') != 'none'){
				$tohide = $tohide.add($t);
				$pre = $pre.add($t);
			};
		});
		
		// IF ALL ELEMENTS ARE ALREADY SHOWN AND THERE IS NOTHING TO HIDE, AND NOT PERFORMING A LAYOUT CHANGE OR SORT:
		
		if($show.filter(':visible').length == total && !$tohide.length && !sortby){
			
			if(config1.origLayout == config1.layoutMode){
				
				// THEN CLEAN UP AND GO HOME

				resetFilter();
				return false;
			} else {
				
				// IF ONLY ONE ITEM AND CHANGING FORM GRID TO LIST, MOST LIKELY POSITION WILL NOT CHANGE SO WE'RE DONE
			
				if($show.length == 1){ 
					
					if(config1.layoutMode == 'list'){ 
						$cont.addClass(config1.listClass);
						$cont.removeClass(config1.gridClass);
						$pre.css('display',config1.targetDisplayList);
					} else {
						$cont.addClass(config1.gridClass);
						$cont.removeClass(config1.listClass);
						$pre.css('display',config1.targetDisplayGrid);
					};
					
					// THEN CLEAN UP AND GO HOME

					resetFilter();
					return false;
				}
			};
		};
		
		// GET CONTAINER'S STARTING HEIGHT

		config1.origHeight = $par.height();
		
		// IF THERE IS SOMETHING TO BE SHOWN:

		if($show.length){
			
			// REMOVE "FAIL CLASS" FROM CONTAINER IF EXISTS
			
			$cont.removeClass(config1.failClass);
			
			
			// FOR ELEMENTS TO BE SHOWN, IF NOT ALREADY SHOWN THEN ADD TO OBJECTS "TOSHOW" ELSE ADD CLASS "MIX_PRE"
			// TO INDICATE PRE-EXISTING ELEMENT

			$show.each(function(){ 
				var $t = $(this);
				if($t.css('display') == 'none'){
					$toshow = $toshow.add($t)
				} else {
					$pre = $pre.add($t);
				};
			});
	
			// IF NON-ANIMATED LAYOUT MODE TRANSITION:
		
			if((config1.origLayout != config1.layoutMode) && config1.animateGridList == false){ 
			
				// ADD NEW DISPLAY TYPES, CLEAN UP AND GO HOME
				
				if(config1.layoutMode == 'list'){ 
					$cont.addClass(config1.listClass);
					$cont.removeClass(config1.gridClass);
					$pre.css('display',config1.targetDisplayList);
				} else {
					$cont.addClass(config1.gridClass);
					$cont.removeClass(config1.listClass);
					$pre.css('display',config1.targetDisplayGrid);
				};
				
				resetFilter();
				return false;
			};
			
			// IF IE, FUCK OFF, AND THEN CLEAN UP AND GO HOME
		
			if(!window.atob){
				resetFilter();
				return false;
			};
			
			// OVERRIDE ANY EXISTING TRANSITION TIMING FOR CALCULATIONS
			
			$targets.css(config1.clean);
			
			// FOR EACH PRE-EXISTING ELEMENT, ADD STARTING POSITION TO 'ORIGPOS' ARRAY
			
			$pre.each(function(){
				this.data.origPos = $(this).offset();
			});
	
			// TEMPORARILY SHOW ALL ELEMENTS TO SHOW (THAT ARE NOT ALREADY SHOWN), WITHOUT HIDING ELEMENTS TO HIDE
			// AND ADD/REMOVE GRID AND LIST CLASSES FROM CONTAINER
	
			if(config1.layoutMode == 'list'){
				$cont.addClass(config1.listClass);
				$cont.removeClass(config1.gridClass);
				$toshow.css('display',config1.targetDisplayList);
			} else {
				$cont.addClass(config1.gridClass);
				$cont.removeClass(config1.listClass);
				$toshow.css('display',config1.targetDisplayGrid);
			};
			
			// FOR EACH ELEMENT NOW SHOWN, ADD ITS INTERMEDIATE POSITION TO 'SHOWINTERPOS' ARRAY
	
			$toshow.each(function(){
				this.data.showInterPos = $(this).offset();
			});
			
			// FOR EACH ELEMENT TO BE HIDDEN, BUT NOT YET HIDDEN, AND NOW MOVED DUE TO SHOWN ELEMENTS,
			// ADD ITS INTERMEDIATE POSITION TO 'HIDEINTERPOS' ARRAY

			$tohide.each(function(){
				this.data.hideInterPos = $(this).offset();
			});
			
			// FOR EACH PRE-EXISTING ELEMENT, NOW MOVED DUE TO SHOWN ELEMENTS, ADD ITS POSITION TO 'PREINTERPOS' ARRAY
	
			$pre.each(function(){
				this.data.preInterPos = $(this).offset();
			});
			
			// SET DISPLAY PROPERTY OF PRE-EXISTING ELEMENTS INCASE WE ARE CHANGING LAYOUT MODE
	
			if(config1.layoutMode == 'list'){
				$pre.css('display',config1.targetDisplayList);
			} else {
				$pre.css('display',config1.targetDisplayGrid);
			};
			
			// IF A SORT ARGUMENT HAS BEEN SENT, RUN SORT FUNCTION SO OBJECTS WILL MOVE TO THEIR FINAL ORDER
			
			if(sortby){
				sort(sortby, order, $cont, config1);	
			};
			
			// IF VISIBLE SORT ORDER IS THE SAME (WHICH WOULD NOT TRIGGER A TRANSITION EVENT)
		
			if(sortby && compareArr(config1.origSort, config1.checkSort)){
				
				// THEN CLEAN UP AND GO HOME
				resetFilter();
				return false;
			};
			
			// TEMPORARILY HIDE ALL SHOWN ELEMENTS TO HIDE

			$tohide.hide();
			
			// FOR EACH ELEMENT TO SHOW, AND NOW MOVED DUE TO HIDDEN ELEMENTS BEING REMOVED, 
			// ADD ITS POSITION TO 'FINALPOS' ARRAY
			
			$toshow.each(function(i){
				this.data.finalPos = $(this).offset();
			});
			
			// FOR EACH PRE-EXISTING ELEMENT NOW MOVED DUE TO HIDDEN ELEMENTS BEING REMOVED,
			// ADD ITS POSITION TO 'FINALPREPOS' ARRAY
	
			$pre.each(function(){
				this.data.finalPrePos = $(this).offset();
			});
			
			// SINCE WE ARE IN OUT FINAL STATE, GET NEW HEIGHT OF CONTAINER
	
			config1.newHeight = $par.height();
			
			// IF A SORT ARGUMENT AS BEEN SENT, RUN SORT FUNCTION 'RESET' TO MOVE ELEMENTS BACK TO THEIR STARTING ORDER
			
			if(sortby){
				sort('reset', null, $cont, config1);
			};
			
			// RE-HIDE ALL ELEMENTS TEMPORARILY SHOWN
			
			$toshow.hide();
			
			// SET DISPLAY PROPERTY OF PRE-EXISTING ELEMENTS BACK TO THEIR 
			// ORIGINAL PROPERTY, INCASE WE ARE CHANGING LAYOUT MODE
			
			$pre.css('display',config1.origDisplay);
			
			// ADD/REMOVE GRID AND LIST CLASSES FROM CONTAINER
	
			if(config1.origDisplay == 'block'){
				$cont.addClass(config1.listClass);
				$toshow.css('display', config1.targetDisplayList);
			} else {
				$cont.removeClass(config1.listClass);
				$toshow.css('display', config1.targetDisplayGrid);
			};
			
			// IF WE ARE ANIMATING CONTAINER, RESET IT TO ITS STARTING HEIGHT
		
			if(config1.resizeContainer)$par.css('height', config1.origHeight+'px');
	
			// ADD TRANSFORMS TO ALL ELEMENTS TO SHOW
			
			var toShowCSS = {};
			
			for(var i = 0; i<2; i++){
				var a = i==0 ? a = config1.prefix : '';
				toShowCSS[a+'transform'] = config1.scale+' '+config1.rotateX+' '+config1.rotateY+' '+config1.rotateZ;
				toShowCSS[a+'filter'] = config1.blur+' '+config1.grayscale;
			};
			
			$toshow.css(toShowCSS);
	
			// FOR EACH PRE-EXISTING ELEMENT, SUBTRACT ITS INTERMEDIATE POSITION FROM ITS ORIGINAL POSITION 
			// TO GET ITS STARTING OFFSET
	
			$pre.each(function(){
				var data = this.data,
				$t = $(this);
				
				if ($t.hasClass('mix_tohide')){
					data.preTX = data.origPos.left - data.hideInterPos.left;
					data.preTY = data.origPos.top - data.hideInterPos.top;
				} else {
					data.preTX = data.origPos.left - data.preInterPos.left;
					data.preTY = data.origPos.top - data.preInterPos.top;
				};
				var preCSS = {};
				for(var i = 0; i<2; i++){
					var a = i==0 ? a = config1.prefix : '';
					preCSS[a+'transform'] = 'translate('+data.preTX+'px,'+data.preTY+'px)';
				};
				
				$t.css(preCSS);	
			});
			
			// ADD/REMOVE GRID AND LIST CLASSES FROM CONTAINER
	
			if(config1.layoutMode == 'list'){
				$cont.addClass(config1.listClass);
				$cont.removeClass(config1.gridClass);
			} else {
				$cont.addClass(config1.gridClass);
				$cont.removeClass(config1.listClass);
			};
			
			// WRAP ANIMATION FUNCTIONS IN 10ms TIMEOUT TO PREVENT RACE CONDITION
			
			var delay = setTimeout(function(){
		
				// APPLY TRANSITION TIMING TO CONTAINER, AND BEGIN ANIMATION TO NEW HEIGHT
				
				if(config1.resizeContainer){
					var containerCSS = {};
					for(var i = 0; i<2; i++){
						var a = i==0 ? a = config1.prefix : '';
						containerCSS[a+'transition'] = 'all '+speed+'ms ease-in-out';
						containerCSS['height'] = config1.newHeight+'px';
					};
					$par.css(containerCSS);
				};
	
				// BEGIN FADING IN/OUT OF ALL ELEMENTS TO SHOW/HIDE
				$tohide.css('opacity',config1.fade);
				$toshow.css('opacity',1);
	
				// FOR EACH ELEMENT BEING SHOWN, CALCULATE ITS TRAJECTORY BY SUBTRACTING
				// ITS INTERMEDIATE POSITION FROM ITS FINAL POSITION.
				// ALSO ADD SPEED AND EASING
				
				$toshow.each(function(){
					var data = this.data;
					data.tX = data.finalPos.left - data.showInterPos.left;
					data.tY = data.finalPos.top - data.showInterPos.top;
					
					var toShowCSS = {};
					for(var i = 0; i<2; i++){
						var a = i==0 ? a = config1.prefix : '';
						toShowCSS[a+'transition-property'] = a+'transform, '+a+'filter, opacity';
						toShowCSS[a+'transition-timing-function'] = config1.easing+', linear, linear';
						toShowCSS[a+'transition-duration'] = speed+'ms';
						toShowCSS[a+'transition-delay'] = '0';
						toShowCSS[a+'transform'] = 'translate('+data.tX+'px,'+data.tY+'px)';
						toShowCSS[a+'filter'] = 'none';
					};
					
					$(this).css('-webkit-transition', 'all '+speed+'ms '+config1.easingFallback).css(toShowCSS);
				});
				
				// FOR EACH PRE-EXISTING ELEMENT, IF IT HAS A FINAL POSITION, CALCULATE 
				// ITS TRAJETORY BY SUBTRACTING ITS INTERMEDIATE POSITION FROM ITS FINAL POSITION.
				// ALSO ADD SPEED AND EASING
				
				$pre.each(function(){
					var data = this.data
					data.tX = data.finalPrePos.left != 0 ? data.finalPrePos.left - data.preInterPos.left : 0;
					data.tY = data.finalPrePos.left != 0 ? data.finalPrePos.top - data.preInterPos.top : 0;
					
					var preCSS = {};
					for(var i = 0; i<2; i++){
						var a = i==0 ? a = config1.prefix : '';
						preCSS[a+'transition'] = 'all '+speed+'ms '+config1.easing;
						preCSS[a+'transform'] = 'translate('+data.tX+'px,'+data.tY+'px)';
					};
					
					$(this).css('-webkit-transition', 'all '+speed+'ms '+config1.easingFallback).css(preCSS);
				});
		
				// BEGIN TRANSFORMS ON ALL ELEMENTS TO BE HIDDEN
				
				var toHideCSS = {};
				for(var i = 0; i<2; i++){
					var a = i==0 ? a = config1.prefix : '';
					toHideCSS[a+'transition'] = 'all '+speed+'ms '+config1.easing+', '+a+'filter '+speed+'ms linear, opacity '+speed+'ms linear';
					toHideCSS[a+'transform'] = config1.scale+' '+config1.rotateX+' '+config1.rotateY+' '+config1.rotateZ;
					toHideCSS[a+'filter'] = config1.blur+' '+config1.grayscale;
					toHideCSS['opacity'] = config1.fade;
				};
				
				$tohide.css(toHideCSS);
				
				// ALL ANIMATIONS HAVE NOW BEEN STARTED, NOW LISTEN FOR TRANSITION END:
				
				$par.bind('webkitTransitionEnd transitionend otransitionend oTransitionEnd',function(e){
					
					if (e.originalEvent.propertyName.indexOf('transform') > -1 || e.originalEvent.propertyName.indexOf('opacity') > -1){
						
						if(mixSelector.indexOf('.') > -1){
						
						// IF MIXSELECTOR IS A CLASS NAME
						
							if($(e.target).hasClass(mixSelector.replace('.',''))){
								resetFilter();
							};
						
						} else {
							
						// IF MIXSELECTOR IS A TAG
						
							if($(e.target).is(mixSelector)){
								resetFilter();
							};
							
						};
						
					};
				});	
	
			},10);
			
			// LAST RESORT EMERGENCY FAILSAFE
			
			config1.failsafe = setTimeout(function(){
				if(config1.mixing){
					resetFilter();
				};
			}, speed + 400);
	
		} else {
			
		// ELSE IF NOTHING TO SHOW, AND EVERYTHING TO BE HIDDEN
		
			// IF WE ARE RESIZING CONTAINER, SET ITS STARTING HEIGHT
	
			if(config1.resizeContainer)$par.css('height', config1.origHeight+'px');
			
			// IF IE, FUCK OFF, AND THEN GO HOME
			
			if(!window.atob){
				resetFilter();
				return false;
			};
			
			// GROUP ALL ELEMENTS TO HIDE INTO JQUERY OBJECT
			
			$tohide = $hide;
			
			// WRAP ANIMATION FUNCTIONS IN A 10ms DELAY TO PREVENT RACE CONDITION
	
			var delay = setTimeout(function(){
				
				// APPLY PERSPECTIVE TO CONTAINER
	
				$par.css(config1.perspective);
				
				// APPLY TRANSITION TIMING TO CONTAINER, AND BEGIN ANIMATION TO NEW HEIGHT
		
				if(config1.resizeContainer){
					var containerCSS = {};
					for(var i = 0; i<2; i++){
						var a = i==0 ? a = config1.prefix : '';
						containerCSS[a+'transition'] = 'height '+speed+'ms ease-in-out';
						containerCSS['height'] = config1.minHeight+'px';
					};
					$par.css(containerCSS);
				};
	
				// APPLY TRANSITION TIMING TO ALL TARGET ELEMENTS
				
				$targets.css(config1.transition);
				
				// GET TOTAL NUMBER OF ELEMENTS TO HIDE
	
				var totalHide = $hide.length;
				
				// IF SOMETHING TO HIDE:
	
				if(totalHide){
					
					// BEGIN TRANSFORMS ON ALL ELEMENTS TO BE HIDDEN

					var toHideCSS = {};
					for(var i = 0; i<2; i++){
						var a = i==0 ? a = config1.prefix : '';
						toHideCSS[a+'transform'] = config1.scale+' '+config1.rotateX+' '+config1.rotateY+' '+config1.rotateZ;
						toHideCSS[a+'filter'] = config1.blur+' '+config1.grayscale;
						toHideCSS['opacity'] = config1.fade;
					};

					$tohide.css(toHideCSS);
					
					// ALL ANIMATIONS HAVE NOW BEEN STARTED, NOW LISTEN FOR TRANSITION END:

					$par.bind('webkitTransitionEnd transitionend otransitionend oTransitionEnd',function(e){
						if (e.originalEvent.propertyName.indexOf('transform') > -1 || e.originalEvent.propertyName.indexOf('opacity') > -1){
							$cont.addClass(config1.failClass);
							resetFilter();
						};
					});
		
				} else {
					
				// ELSE, WE'RE DONE MIXING
				 	
					config1.mixing = false;
				};
	
			}, 10);
		}; 
		
		// CLEAN UP AND RESET FUNCTION

		function resetFilter(){
			
			// UNBIND TRANSITION END EVENTS FROM CONTAINER
			
			$par.unbind('webkitTransitionEnd transitionend otransitionend oTransitionEnd');
			
			// IF A SORT ARGUMENT HAS BEEN SENT, SORT ELEMENTS TO THEIR FINAL ORDER
			
			if(sortby){
				sort(sortby, order, $cont, config1);
			};
			
			// EMPTY SORTING ARRAYS
		
			config1.startOrder = [], config1.newOrder = [], config1.origSort = [], config1.checkSort = [];
		
			// REMOVE INLINE STYLES FROM ALL TARGET ELEMENTS AND SLAM THE BRAKES ON
			
			$targets.removeStyle(
				config1.prefix+'filter, filter, '+config1.prefix+'transform, transform, opacity, display'
			).css(config1.clean).removeAttr('data-checksum');
			
			// BECAUSE IE SUCKS
			
			if(!window.atob){
				$targets.css({
					display: 'none',
					opacity: '0'
				});
			};
			
			// REMOVE HEIGHT FROM CONTAINER ONLY IF RESIZING
			
			var remH = config1.resizeContainer ? 'height' : '';
			
			// REMOVE INLINE STYLES FROM CONTAINER
		
			$par.removeStyle(
				config1.prefix+'transition, transition, '+config1.prefix+'perspective, perspective, '+config1.prefix+'perspective-origin, perspective-origin, '+remH
			);
			
			// ADD FINAL DISPLAY PROPERTIES AND OPACITY TO ALL SHOWN ELEMENTS
			// CACHE CURRENT LAYOUT MODE & SORT FOR NEXT MIX
			
			if(config1.layoutMode == 'list'){
				$show.css({display:config1.targetDisplayList, opacity:'1'});
				config1.origDisplay = config1.targetDisplayList;
			} else {
				$show.css({display:config1.targetDisplayGrid, opacity:'1'});
				config1.origDisplay = config1.targetDisplayGrid;
			};
			config1.origLayout = config1.layoutMode;
				
			var wait = setTimeout(function(){
				
				// LET GO OF THE BRAKES
				
				$targets.removeStyle(config1.prefix+'transition, transition');
			
				// WE'RE DONE MIXING
			
				config1.mixing = false;
			
				// FIRE "ONMIXEND" CALLBACK
			
				if(typeof config1.onMixEnd == 'function') {
					var output = config1.onMixEnd.call(this, config1);
				
					// UPDATE config1 IF DATA RETURNED
				
					config1 = output ? output : config1;
				};
			});
		};
	};
	
	// SORT FUNCTION
	
	function sort(sortby, order, $cont, config1){

		// COMPARE BY ATTRIBUTE

		function compare(a,b) {
			var sortAttrA = isNaN(a.attr(sortby) * 1) ? a.attr(sortby).toLowerCase() : a.attr(sortby) * 1,
				sortAttrB = isNaN(b.attr(sortby) * 1) ? b.attr(sortby).toLowerCase() : b.attr(sortby) * 1;
		  	if (sortAttrA < sortAttrB)
		    	return -1;
		  	if (sortAttrA > sortAttrB)
		    	return 1;
		  	return 0;
		};
		
		// REBUILD DOM

		function rebuild(element){
			if(order == 'asc'){
				$sortWrapper.prepend(element).prepend(' ');
			} else {
				$sortWrapper.append(element).append(' ');
			};
		};
		
		// RANDOMIZE ARRAY

		function arrayShuffle(oldArray){
			var newArray = oldArray.slice();
		 	var len = newArray.length;
			var i = len;
			while (i--){
			 	var p = parseInt(Math.random()*len);
				var t = newArray[i];
		  		newArray[i] = newArray[p];
			  	newArray[p] = t;
		 	};
			return newArray; 
		};
		
		// SORT
		
		$cont.find(config1.targetSelector).wrapAll('<div class="mix_sorter"/>');
		
		var $sortWrapper = $cont.find('.mix_sorter');
		
		if(!config1.origSort.length){
			$sortWrapper.find(config1.targetSelector+':visible').each(function(){
				$(this).wrap('<s/>');
				config1.origSort.push($(this).parent().html().replace(/\s+/g, ''));
				$(this).unwrap();
			});
		};
		
		
		
		$sortWrapper.empty();
		
		if(sortby == 'reset'){
			$.each(config1.startOrder,function(){
				$sortWrapper.append(this).append(' ');
			});
		} else if(sortby == 'default'){
			$.each(config1.origOrder,function(){
				rebuild(this);
			});
		} else if(sortby == 'random'){
			if(!config1.newOrder.length){
				config1.newOrder = arrayShuffle(config1.startOrder);
			};
			$.each(config1.newOrder,function(){
				$sortWrapper.append(this).append(' ');
			});	
		} else if(sortby == 'custom'){
			$.each(order, function(){
				rebuild(this);
			});
		} else { 
			// SORT BY ATTRIBUTE
			
			if(typeof config1.origOrder[0].attr(sortby) === 'undefined'){
				console.log('No such attribute found. Terminating');
				return false;
			};
			
			if(!config1.newOrder.length){
				$.each(config1.origOrder,function(){
					config1.newOrder.push($(this));
				});
				config1.newOrder.sort(compare);
			};
			$.each(config1.newOrder,function(){
				rebuild(this);
			});
			
		};
		config1.checkSort = [];
		$sortWrapper.find(config1.targetSelector+':visible').each(function(i){
			var $t = $(this);
			if(i == 0){
				
				// PREVENT COMPARE RETURNING FALSE POSITIVES ON ELEMENTS WITH NO CLASS/ATTRIBUTES
				
				$t.attr('data-checksum','1');
			};
			$t.wrap('<s/>');
			config1.checkSort.push($t.parent().html().replace(/\s+/g, ''));
			$t.unwrap();
		});
		
		$cont.find(config1.targetSelector).unwrap();
	};
	
	// FIND VENDOR PREFIX

	function prefix(el) {
	    var prefixes = ["Webkit", "Moz", "O", "ms"];
	    for (var i = 0; i < prefixes.length; i++){
	        if (prefixes[i] + "Transition" in el.style){
	            return prefixes[i];
	        };
	    };
	    return "transition" in el.style ? "" : false;
	};
	
	// REMOVE SPECIFIC STYLES
	
	$.fn.removeStyle = function(style){
		return this.each(function(){
			var obj = $(this);
			style = style.replace(/\s+/g, '');
			var styles = style.split(',');
			$.each(styles,function(){
				
				var search = new RegExp(this.toString() + '[^;]+;?', 'g');
				obj.attr('style', function(i, style){
					if(style) return style.replace(search, '');
			    });
			});
		});
    };

	// COMPARE ARRAYS 
	
	function compareArr(a,b){
	    if (a.length != b.length) return false;
	    for (var i = 0; i < b.length; i++){
	        if (a[i].compare) { 
	            if (!a[i].compare(b[i])) return false;
	        };
	        if (a[i] !== b[i]) return false;
	    };
	    return true;
	};
	
	// BUILD FILTER ARRAY(S)
	
	function buildFilterArray(str){
		// CLEAN FILTER STRING
		str = str.replace(/\s{2,}/g, ' ');
		// FOR EACH PEROID SEPERATED CLASS NAME, ADD STRING TO FILTER ARRAY
		var arr = str.split(' ');
		// IF ALL, REPLACE WITH MIX_ALL
		$.each(arr,function(i){
			if(this == 'all')arr[i] = 'mix_all1';
		});
		if(arr[0] == "")arr.shift(); 
		return arr;
	};

	
})(jQuery);