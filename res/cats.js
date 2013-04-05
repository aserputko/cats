$(function() {
		var Cat = Backbone.Model.extend({
			initialize: function(color, name) {
				// what if will be 100 arguments ?
				// much betted have 1 argument. it should be Object  {color: [string], name: [string]}

				//  much betted defaulst
				// Please look on https://github.com/ASerputko/cats/blob/master/res/cats2.js#L13
				this.color = color;
				this.name = name;
			},
		});

		var CatCollection = Backbone.Collection.extend({
			initialize: function() {
				this.add(new Cat("black", "Barsik"));  
				this.add(new Cat("gray", "Murzik"));
				this.add(new Cat("green", "House M.D."));
				this.add(new Cat("white", "Pushok"));   
				// NOTE: you can add Models during initializing
				// Please look on https://github.com/ASerputko/cats/blob/master/res/cats2.js#L50
			}
		});
		
		var CatView = Backbone.View.extend({			
			className: "cat",
			
			template: _.template($("#cat-tpl").html()),
			
			render: function() {

				// you can also use 
				// this.model.toJSON()
				// or
				// this.model.attributes
				// https://github.com/ASerputko/cats/blob/master/res/cats2.js#L34
				this.$el.html(this.template({color: this.model.color, name: this.model.name}));				
				return this;	
			}
		});	

		var CatCollectionView = Backbone.View.extend({			
			cats: new CatCollection(),  // use initialize for this
			
			el: $("#cats"),
		
			cat: new CatView(),  // use initialize for this
		
			events: {
				"click": "render"
			},
			
			addCat: function(c) {
					var cat = new CatView({model: c});
					this.$el.append(cat.render().el);					
			},
			
			render: function() {			   
				
				this.$el.text("");
									
				this.cats.each(this.addCat, this);	
				
				return this;
			}			
		});
		
		var App = new CatCollectionView();
});