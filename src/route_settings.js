function RouteApp (app) {

}

RouteApp.prototype.Load = function (app) {
    var route = [];

    route['products_routes'] = require ('./routes/Products');
    route['sales_routes']    = require ('./routes/Sales');

    app.use('/products' , route['products_routes']);
    app.use('/sales'    , route['sales_routes']);
   
    return app;
}

module.exports =  RouteApp;