/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

var expect = require('chai').expect;
var ObjectId = require('mongodb').ObjectID;

const CONNECTION_STRING = process.env.DB; //MongoClient.connect(CONNECTION_STRING, function(err, db) {});
const mongoose = require('mongoose');
mongoose.connect(process.env.DB, {useNewUrlParser: true}, (err, db) => {
  if(!err) console.log('successfully connected')
  
})

const Project = require('../schema');

module.exports = function (app) {



      
  app.route('/api/issues/:project')

    .get(function (req, res){
      var project = req.params.project;
      
      Project.find({project: project}, (err, docs) => {
        res.send(docs);
      })
    })

    .post(function (req, res){
      var project = req.params.project;
    
      var proj = new Project({
        issue_title: req.body.issue_title,
        issue_text: req.body.issue_text,
        created_by: req.body.created_by,
        assigned_to: req.body.assigned_to || '',
        status_text: req.body.status_text || '',
        created_on: new Date().toISOString(),
        updated_on: new Date().toISOString(),
        open: true,
        project: project
      })
      proj.save((err, data) => {
        if(err) console.log(err);
        

        res.json(data);
      })
    })

    .put(function (req, res){
      var project = req.params.project;
     
      const {_id} = req.body
    
      var keys = Object.keys(req.body);
      var values = Object.values(req.body);
      
      var update = {}
    
      values.forEach((ele, i) => {
        if(ele !== '') {
          update[keys[i]] = ele;
        }
      })
      delete update._id;
      
      if(Object.keys(update).length < 1) {
        res.send('no updated field sent');
      } else {
        update.updated_on = new Date().toISOString();

        Project.findByIdAndUpdate(_id, update, {new: true}, (err, data) => {
          if(err) {
            res.send('could not update ' + _id)
          } else {
            res.send('successfully updated')
          }
        });

      }
      
    })

    .delete(function (req, res){
      var project = req.params.project;
      const {_id} = req.body;
      
      console.log(_id)
      if(_id == '' || !_id) {
        res.send('_id error');
      } else {
         Project.findByIdAndRemove(_id, (err) => {
          if(!err) res.send('deleted ' + _id);
          else { res.send('could not delete ' + _id) }
         }) 
      }

    
    });
    
};