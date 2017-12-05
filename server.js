var express = require('express');

var app = express();

app.disable('x-powered-by');

var handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.engine('handlebars', handlebars.engine);

app.set('view engine', 'handlebars');

// Defines the port to run on
app.set('port', process.env.PORT || 8080);

app.use(express.static(__dirname + '/public'));

// Define some routes. app.get receives a path and a
// function and it defines our routes. The path isn't
// case sensitive and doesn't care about trailing path
// information.
// The req object represents the HTTP request and
// contains the query string, parameters, body, header
// The res object is the response Express sends
// when it receives a request
app.get('/', function(req, res){
    
     // Point at the home.handlebars view
     res.render('home');
   });

app.get('/installation', function(req, res){

    // Point at the home.handlebars view
    res.render('installation');
});

app.get('/architecture', function(req, res){
    
        // Point at the home.handlebars view
        res.render('architecture');
    });

app.get('/help', function(req, res){
    
        // Point at the home.handlebars view
        res.render('help');
    });    

    app.get('/canvasapp', function(req, res){
        
        
        // Point at the home.handlebars view
        res.render('canvasapp');
        });

    app.get('/dynamicsearch', function(req, res){

// Point at the home.handlebars view
res.render('dynamicsearch');
});  

app.get('/filesviewer', function(req, res){

// Point at the home.handlebars view
res.render('filesviewer');
});  

app.get('/historytimeline', function(req, res){

// Point at the home.handlebars view
res.render('historytimeline');
});  

app.get('/listview', function(req, res){

    // Point at the home.handlebars view
    res.render('listview');
});  

app.get('/offerdetailsspa', function(req, res){
    
        // Point at the home.handlebars view
        res.render('offerdetailsspa');
    });  

app.get('/relatedlist', function(req, res){

    // Point at the home.handlebars view
    res.render('relatedlist');
}); 

app.get('/twitterexplorer', function(req, res){
    
        // Point at the home.handlebars view
        res.render('twitterexplorer');
    }); 


app.listen(app.get('port'), function(){
    console.log('Express started on http://localhost:' +
    app.get('port') + '; press Ctrl-C to terminate');
});