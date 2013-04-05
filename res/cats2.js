(function() {
	
	/**
	 * Single var pattern 
	 */
	var Cat,
		Cats,
		CatView,
		CatsView;  


	Cat = Backbone.Model.extend({
		defaults: {
			color: "",
			name: ""
		}
	});

	Cats = Backbone.Collection.extend({

		// the keys are the same like on Backend
		// in this case we dont need custom model
		// will be enought to remove 24 line and 12-17 lines 
		model: Cat
	});

	CatView = Backbone.View.extend({

		className: "cat",
		
		template: _.template($("#cat-tpl").html()),
		
		render: function() {		
			this.$el.html(this.template(this.model.attributes));				
			return this;	
		}
	});	

	CatsView = Backbone.View.extend({

		events: {
			"click": "addAllCats"
		},

		initialize: function () {
			// good way to use Bootstrapping data 
			// http://ricostacruz.com/backbone-patterns/#bootstrapping_data

			// add Models during initializing
			this.collection = new Cats([
				{color: "black", name: "Barsik"},
				{color: "gray",  name: "Murzik"},
				{color: "green", name: "House M.D."},
				{color: "white", name: "Pushok"}
			]);
		},		

		addAllCats: function () {
			this.$el.html(""); // remove message "Empty...." and other staff if double click
			this.collection.each(this.addOneCat, this);
		},

		addOneCat: function (model) {
			var view = new CatView({model: model});
			this.$el.append(view.render().el);
		}
	});
})();

/**
 * $() abuse
 * Your classes should be ready before the HTML DOM is
 * http://ricostacruz.com/backbone-patterns/#abuse
 */
$(function () {
	var app = new CatsView({el: $("#cats")});
});
