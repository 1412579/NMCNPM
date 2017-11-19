var middleware = {
    isLoggedIn: function (req, res, next) {
        
        // if user is authenticated in the session, carry on
        if (req.isAuthenticated())
            return next();
    
        // if they aren't redirect them to the home page
        res.redirect('/login');
    },
    isLoggedInAdmin: function (req, res, next) {
        
        // if user is authenticated in the session, carry on
        if (req.isAuthenticated())
            return next();
    
        // if they aren't redirect them to the home page
        res.redirect('/admin');
    },
    Logged: function (req, res, next) {
        
        // if user isnt authenticated in the session, carry on
        if (!req.isAuthenticated())
            return next();
    
        // if they are redirect them to the home page
        res.redirect('/');
    },
    
    LoggedAdmin: function (req, res, next) {
    
        // if user isnt authenticated in the session, carry on
        if (!req.isAuthenticated())
            return next();
    
        // if they are redirect them to the home page
        res.redirect('/admin/dashboard');
    },
    
    isAdminAccess: function (req, res, next) {
    
        // if user isnt authenticated in the session, carry on
        if (req.isAuthenticated())
        {
            if (req.user.role_id == 1)
                res.send("401 - Unauthorized: Access is denied due to invalid credentials");
                
        }
        return next();
    },
    isSysAdminAccess: function (req, res, next) {
        
        // if user isnt authenticated in the session, carry on
        if (req.isAuthenticated())
        {
            if (req.user.role_id != 4)
                res.send("401 - Unauthorized: Access is denied due to invalid credentials");
                
        }
        return next();
    },
    isSysAndAdminAccess: function (req, res, next) {
        
            // if user isnt authenticated in the session, carry on
            if (req.isAuthenticated())
            {
                if (req.user.role_id == 1 || req.user.role_id == 2)
                    res.send("401 - Unauthorized: Access is denied due to invalid credentials");
                    
            }
            return next();
        }
};

module.exports = middleware;
    
    