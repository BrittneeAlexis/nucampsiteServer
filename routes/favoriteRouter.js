const express = require("express");
const Favorite = require("../models/favorite");
const authenticate = require("../authenticate");
const cors = require('./cors');
const { options } = require("mongoose");
const { application } = require("express");

const favoriteRouter = express.favoriteRouter
favoriteRouter.route('/')
options(cors.corsWithOptions,(req,res) => res.sendStatus(200))
.get(cors.cors, authenticate.verifyUser, (req,res,next) =>{
    Favorite.find({user: req.user._id})
    .populate('user')
    .populate('campsites')
    .then((favorite) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(favorite);
      })
      .catch((err) => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, (req,res,next) =>{
    Favorite.findOne({ user:req.user._id})
    .then(favorite =>{
        if(favorite) {
            req.body.forEach(fav => {
                if(!favorite.campsites.includes(fav.id)) {
                    favorites.campsites.push(fav._id);
                }
                
            });
            favorite.save()
            .then(favorite => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(favorite);
            })
            .catch((err) => next(err))
        } else {
            Favorite.create({user: req.user._id})
            .then(favorite => {
                req.body.forEach(fav => {
                    if(!favorite.campsites.includes(fav.id)) {
                        favorites.campsites.push(fav._id);
                    }
                    
                });
                favorite.save()
                .then(favorite => {
                    res.statusCode = 200;
                    res.setHeader("Content-Type", "application/json");
                    res.json(favorite);
                })
                .catch((err) => next(err))

            })
        }
    })
})
.put(cors.corsWithOptions, (req, res) =>{
    res.statusCode = 403;
    res.end("PUT operation not supported on /campsites");
}) 

  //dead endpoint
.delete(cors.cors, authenticate.verifyUser, (req, res, next) => {
    Favorite.findOneAndDelete ({user: req.user._id})
    .then(favorite => {
        res.statusCode -200;
        if(favorite) {
            res.setHeader('Content-Type', 'application/json');
            res.json(favorite);
        }else {
            res. favorite('Content-Type', 'text/plain');
            res.end( "You don;t have any favorites");
        }
    })
})
favoriteRouter
  .route("/:campsiteId")
  .options(cors.corsWithOptions,(req,res) => res.sendStatus(200))
  .get(cors.cors, (req,res,next) => {res.statusCode= 403;
  res.end ('Get operation not supported');
})
    
  .post(cors.corsWithOptions, authenticate.verifyUser , (req,res,next) =>{
    Favorite.findOne({ user:req.user._id})
    .then(favorite =>{
        if(favorite) {
         
                if(!favorite.campsites.includes(req.params.campsiteId)) {
                    favorites.campsites.push(req.params.campsiteId);
                }
                
            favorite.save()
            .then(favorite => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(favorite);
            })
            .catch((err) => next(err))
        } else {
            Favorite.create({user: req.user._id})
            .then(favorite => {
             
                    if(!favorite.campsites.includes(req.params.campsiteId)) {
                        favorites.campsites.push(req.params.campsiteId);
                    }
                    
              
                favorite.save()
                .then(favorite => {
                    res.statusCode = 200;
                    res.setHeader("Content-Type", "application/json");
                    res.json(favorite);
                })
                .catch((err) => next(err))

            })
        }
    })
})
  .put(cors.corsWithOptions, (req,res) => 
  {res.statusCode= 403;
    res.end ('Put operation not supported');
  })
  .delete(cors.cors, authenticate.verifyUser, (req, res, next) => {
    Favorite.findOne({ user: req.user._id})
    .then(favorite => {
        if(favorite) {
            favorites.campsites.indexOf(req.params.campsitesId);
            if(index >= 0) {
                favorite.campsites.splice(index, 1);
            }
            favorite.save()
                .then(favorite => {
                    res.statusCode = 200;
                    res.setHeader("Content-Type", "application/json");
                    res.json(favorite);
                })
                .catch((err) => next(err))

            }else{
            {
                res.statusCode = 200;
                res. favorite('Content-Type', 'text/plain');
                res.end( "You don't have any favorites to delete");
            }
        }
    })
    .catch(err => next(err))
  })


  module.exports = favoriteRouter

 