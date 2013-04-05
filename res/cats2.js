(function(app) {
	
	app.Cat = Backbone.Model.extend({
		defaults: {
			color: "",
			name: ""
		}
	});

	app.Cats = Backbone.Collection.extend({

		// the keys are the same like on Backend
		// in this case we dont need custom model
		// will be enought to remove 24 line and 12-17 lines 
		model: app.Cat
	});

	app.CatView = Backbone.View.extend({

		className: "cat",
		
		template: _.template($("#cat-tpl").html()),
		
		render: function() {		
			this.$el.html(this.template(this.model.attributes));				
			return this;	
		}
	});	

	app.CatsView = Backbone.View.extend({

		events: {
			"click": "addAllCats"
		},

		initialize: function () {
			// good way to use Bootstrapping data 
			// http://ricostacruz.com/backbone-patterns/#bootstrapping_data

			// add Models during initializing
			this.collection = new app.Cats([
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
			var view = new app.CatView({model: model});
			this.$el.append(view.render().el);
		}
	});
})(window);

/**
 * $() abuse
 * Your classes should be ready before the HTML DOM is
 * http://ricostacruz.com/backbone-patterns/#abuse
 */
$(function () {
	var app = new CatsView({el: $("#cats")});
});
