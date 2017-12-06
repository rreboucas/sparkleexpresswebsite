var express = require('express'),
http = require('http'), 
request = require('request'),
bodyParser = require('body-parser'),
app = express();

var https = require('https');
var fs = require('fs');

var app = express();

app.disable('x-powered-by');

var handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.engine('handlebars', handlebars.engine);

app.set('view engine', 'handlebars');

// Defines the port to run on
app.set('port', process.env.PORT || 8080);

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json()); 

app.set('port', process.env.PORT || 8080);

/*Allow CORS*/
app.use(function(req, res, next) {
	 
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Response-Time, X-PINGOTHER, X-CSRF-Token,Authorization,X-Authorization'); 
	res.setHeader('Access-Control-Allow-Methods', '*');
	res.setHeader('Access-Control-Expose-Headers', 'X-Api-Version, X-Request-Id, X-Response-Time');
	res.setHeader('Access-Control-Max-Age', '1000');
	  
	next();
});

app.all('/proxy',  function(req, res, next) { 
    
    var url = req.header('SalesforceProxy-Endpoint');  
    request({ url: url, method: req.method, json: req.body, 
                    headers: {'Authorization': req.header('X-Authorization'), 'Content-Type' : 'application/json'}, body:req.body }).pipe(res);    
    
});

// Define some routes. app.get receives a path and a
// function and it defines our routes. The path isn't
// case sensitive and doesn't care about trailing path
// information.
// The req object represents the HTTP request and
// contains the query string, parameters, body, header
// The res object is the response Express sends
// when it receives a request
app.get('/', function(req, res, next){
    
     // Point at the home.handlebars view
     res.render('home');
   });

app.get('/installation', function(req, res, next){

    // Point at the home.handlebars view
    res.render('installation');
});

app.get('/architecture', function(req, res, next){
    
        // Point at the home.handlebars view
        res.render('architecture');
    });

app.get('/help', function(req, res, next){
    
        // Point at the home.handlebars view
        res.render('help');
    });    

    app.get('/canvasapp', function(req, res, next){
        
        
        // Point at the home.handlebars view
        res.render('canvasapp');
        });

    app.get('/dynamicsearch', function(req, res, next){

// Point at the home.handlebars view
res.render('dynamicsearch');
});  

app.get('/filesviewer', function(req, res, next){

// Point at the home.handlebars view
res.render('filesviewer');
});  

app.get('/historytimeline', function(req, res, next){

// Point at the home.handlebars view
res.render('historytimeline');
});  

app.get('/listview', function(req, res, next){

    // Point at the home.handlebars view
    res.render('listview');
});  

app.get('/offerdetailsspa', function(req, res, next){
    
        // Point at the home.handlebars view
        res.render('offerdetailsspa');
    });  

app.get('/relatedlist', function(req, res, next){

    // Point at the home.handlebars view
    res.render('relatedlist');
}); 

app.get('/twitterexplorer', function(req, res, next){
    
        // Point at the home.handlebars view
        res.render('twitterexplorer');
    }); 


app.listen(app.get('port'), function(){
    console.log('Express started on http://localhost:' +
    app.get('port') + '; press Ctrl-C to terminate');
});

var options = {
    key: fs.readFileSync( './localhost.key' ),
    cert: fs.readFileSync( './localhost.cert' ),
    requestCert: false,
    rejectUnauthorized: false
 };
 
 var port = process.env.PORT || 443;
 var server = https.createServer( options, app );
 
 server.listen( port, function () {
     console.log( 'Express server listening on port ' + server.address().port );
 } );