(function() {


    function establishRoutes(app) {
        
        
        app.use(require("express").static("../client"))


        app.get('/welcome', (req, res)=>{
            res.send(`Welcome ${req.query.username} at ${req.query.companyname}`);
        })

        app.post('/welcome', (req, res)=>{
            res.send(`Welcome ${req.body.username} at ${req.body.companyname}`);
        })


        app.get("/",(req,res)=>{
        	res.render("index.html")
        })


    }


    exports.routes = {
        "establishRoutes": establishRoutes,
    }


})();