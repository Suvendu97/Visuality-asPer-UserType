const User = require('../models/user');

// let's keep it same as before
module.exports.profile = function(req, res){
    console.log("*************************************************************************************",req.user.type);
    User.findById(req.params.id, function(err, user){
        if(req.user.type =="A") {
            return res.render('typeA', {
                title: 'User Profile',
                profile_user: user
            });
        }
        else if(req.user.type =="B") {
            return res.render('typeB', {
                title: 'User Profile',
                profile_user: user
            });
        }
        else if(req.user.type =="C") {
            return res.render('typeC', {
                title: 'User Profile',
                profile_user: user
            });
        }
        
    });

}



// render the sign up page
module.exports.signUp = function(req, res){
    if (req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_up', {
        title: " Sign Up"
    })
}


// render the sign in page
module.exports.signIn = async function(req, res){
    if (req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_in', {
        title: " Sign In"
    })
    
}

// get the sign up data
module.exports.create = function(req, res){
    console.log("*************************************************************************************",req.body);
    if (req.body.password != req.body.confirm_password){
        req.flash('error', 'Passwords do not match');
        return res.redirect('back');
    }

    User.findOne({username: req.body.username}, function(err, user){
        console.log("*************************************************************************************",user);
        if(err){req.flash('error', err); return}

        if (!user){
            User.create(req.body, function(err, user){
                if(err){req.flash('error', err); return res.redirect('back');}

                return res.redirect('/users/sign-in');
            })
        }else{
            req.flash('success', 'You have already signed up, login to continue!');
            return res.redirect('/users/sign-in');
        }

    });
}


// sign in and create a session for the user
module.exports.createSession = function(req, res){ 
    req.flash('success', 'Logged in Successfully');
    return res.redirect('/users/profile');
}

module.exports.destroySession = function(req, res){
    req.logout();
    req.flash('success', 'You have logged out!');

    return res.redirect('/');
}