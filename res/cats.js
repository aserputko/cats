$(function() {
		var Cat = Backbone.Model.extend({
			initialize: function(color, name) {
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
			}
		});
		
		var CatView = Backbone.View.extend({			
			className: "cat",
			
			template: _.template($("#cat-tpl").html()),
			
			render: function() {		
				this.$el.html(this.template({color: this.model.color, name: this.model.name}));				
				return this;	
			}
		});	

		var CatCollectionView = Backbone.View.extend({			
			cats: new CatCollection(),
			
			el: $("#cats"),
		
			cat: new CatView(),
		
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