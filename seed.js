var mongoose = require("mongoose");
var Department = require("./models/departments");


var data = [
    {
        name: "Clouds"
    },
    {
        name: "Clouds 2"
    },
    {
        name: "Clouds 3"
    }
];

var formdata = [
    {
        field1: "abc",
        field2: "abcd",
        field3: "ab",
        field4: "dcfvg",
        field5: "mnop"
    }
]

function seedDB(){
    
    data.forEach(function(seed){
        Department.create(seed, function(err, depart){
            if(err){
                console.log(err);
            } else {
                console.log(seed);
            }
        });
    });


    // Department.remove({}, function(err){
    //     if(err){
    //         console.log(err);
    //     } else{
    //         console.log("Done");
    //         //adding
    //         data.forEach(function(seed){
    //             Department.create(seed, function(err, department){
    //                 if(err){
    //                     console.log(err)
    //                 } else {
    //                     console.log("added a department");
    //                 }
    //             });
    //         });
    //     }
    // });
}

module.exports = seedDB;