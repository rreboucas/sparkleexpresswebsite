var express = require('express'),
helmet = require('helmet'),
http = require('http'), 
request = require('request'),
bodyParser = require('body-parser'),
app = express();
app.use(helmet({
    frameguard: false
  }));

var https = require('https');
var fs = require('fs');

var jsforce = require('jsforce');
var username = 'tso@officespace.com';
var accessToken = 'QoCGf1yUcImWEdP3kV3D7ZJP';
var password = 'Analytics01!' + accessToken;

var xamel = require('xamel');

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
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
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

    var lcdoc;
    var attribArray;

    var conn = new jsforce.Connection({
        // you can change loginUrl to connect to sandbox or prerelease env.
        // loginUrl : 'https://test.salesforce.com'
      });
      conn.login(username, password, function(err, userInfo) {
        if (err) { return console.error(err); }
        // Now you can get the access token and instance URL information.
        // Save them to establish connection next time.
        console.log(conn.accessToken);
        console.log(conn.instanceUrl);
        // logged in user property
        console.log("User ID: " + userInfo.id);
        console.log("Org ID: " + userInfo.organizationId);
        // ...
        
        var bundleId;

        conn.tooling.sobject('AuraDefinitionBundle')
  .find({ DeveloperName: "DynamicSearch" })
  .execute(function(err, records) {
    if (err) { return console.error(err); }
    console.log("fetched : " + records.length);
    for (var i=0; i < records.length; i++) {
      var record = records[i];
      console.log('Id: ' + record.Id);
      console.log('Name: ' + record.DeveloperName);
      bundleId = record.Id;
    }

    if (bundleId){
        conn.tooling.sobject('AuraDefinition')
        .find({ AuraDefinitionBundleId: bundleId })
        .execute(function(err, records) {
          if (err) { return console.error(err); }
          console.log("fetched : " + records.length);
          for (var i=0; i < records.length; i++) {
            var record = records[i];
            var defType =  record.DefType;
            if (defType == "DOCUMENTATION"){
                console.log("documentation : " + record.Source);
                responseXML = record.Source;
                lcdoc = responseXML;
                //xamel.parse(responseXML, { buildPath : 'aura:documentation/aura:description/text()' }, function(err, xml)
                /*xamel.parse(responseXML, { buildPath : 'aura:documentation/aura:description' }, function(err, xml) {
                    if (err !== null) {
                        throw err;
                    }
                    var resultParse = JSON.stringify(xml);
                    console.log(resultParse);
                    lcdoc = resultParse.replace('["', '');
                    lcdoc = lcdoc.replace('"]', '');
                    lcdoc = xml;
                    //res.render('dynamicsearch', { description: lcdoc});
                });*/

                
            }

            if (defType == "COMPONENT"){
                console.log("documentation : " + record.Source);
                responseXML = record.Source;

                
                xamel.parse(responseXML, { buildPath : 'aura:component/aura:attribute' }, function(err, xml) {
                    if (err !== null) {
                        throw err;
                    }
                    console.log(xml);
                    attribArray = xml.children;
                    res.render('dynamicsearch', { description: lcdoc, attributes: attribArray});
                });
                
                
            }
            


          }
          
        });
      }
    
  });

  

        /*
        var fullNames = [ 'FilesViewer', 'DynamicSearch' ];
        conn.metadata.read('AuraDefinitionBundle', fullNames, function(err, metadata) {
          if (err) { console.error(err); }
          for (var i=0; i < metadata.length; i++) {
            var meta = metadata[i];
            console.log("Full Name: " + meta.fullName);
            console.log("Metadata: " + meta);
            var documentation = meta.documentationContent;
            console.log("DocContent:" + documentation);
            if (documentation)
            {
                lcdoc = atob(documentation);
                console.log("lcdoc:" + lcdoc);
            }
          }
        // Point at thehandlebars view
        res.render('dynamicsearch', { doc: lcdoc});  
        });

        */
      });



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