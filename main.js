var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');
var roleMover = require('role.mover');


module.exports.loop = function () {
    //get a list of all the creeps in all the roles
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
    var movers = _.filter(Game.creeps, (creep) => creep.memory.role == 'mover');

    //other variable declaration
    var logspawn = 0;
    var energyavailable = 0;

    //main loop for spawners
    for(var spawnname in Game.spawns) {
      var spawner = Game.spawns[spawnname]

      //find all energy structures in the same room as the spawner
      availablestructures = spawner.room.find(FIND_MY_STRUCTURES, {
                  filter: (structure) => {
                      return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN);
                  }
      });

      availablecontainers = spawner.room.find(FIND_STRUCTURES, {
                  filter: (structure) => {
                      return (structure.structureType == STRUCTURE_CONTAINER);
                  }
      });

      //Run through all the spawns/extensions/containers/storage and add up the energy in the room
      for(var i = 0, len = availablestructures.length; i < len; i++){
        energyavailable += availablestructures[i].energy;
      }

      //code to create harvesters based on available energy and number of harvesters
      if(harvesters.length < 3){
        if(energyavailable >= 550) {
          var newName = spawner.createCreep([WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE], undefined, {role: 'harvester'});
          logspawn = 1;
        }
        if(energyavailable > 300 && energyavailable < 550) {
          var newName = spawner.createCreep([WORK,WORK,CARRY,MOVE], undefined, {role: 'harvester'});
          logspawn = 1;
        }
        if(energyavailable > 200 && energyavailable < 300){
          var newName = spawner.createCreep([WORK,CARRY,MOVE], undefined, {role: 'harvester'});
          logspawn = 1;
        }
        if(logspawn === 1){
          console.log('Spawning new harvester: ' + newName);
          break;
        }
      }

      //code to create builders based on available energy and number of harvesters
      if(builders.length < 3){
        if(energyavailable >= 550) {
          var newName = spawner.createCreep([WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE], undefined, {role: 'builder'});
          logspawn = 1;
        }
        if(energyavailable > 350 && energyavailable < 550) {
          var newName = spawner.createCreep([WORK,WORK,CARRY,MOVE,MOVE], undefined, {role: 'builder'});
          logspawn = 1;
        }
        if(energyavailable > 200 && energyavailable < 350){
          var newName = spawner.createCreep([WORK,CARRY,MOVE], undefined, {role: 'builder'});
          logspawn = 1;
        }
        if(logspawn === 1){
          console.log('Spawning new builder: ' + newName);
          break;
        }
      }

      //code to create upgraders based on available energy and number of harvesters
      if(upgraders.length < 3){
        if(energyavailable >= 550) {
          var newName = spawner.createCreep([WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE], undefined, {role: 'upgrader'});
          logspawn = 1;
        }
        if(energyavailable > 350 && energyavailable < 550) {
          var newName = spawner.createCreep([WORK,WORK,CARRY,MOVE,MOVE], undefined, {role: 'upgrader'});
          logspawn = 1;
        }
        if(energyavailable > 200 && energyavailable < 350){
          var newName = spawner.createCreep([WORK,CARRY,MOVE], undefined, {role: 'upgrader'});
          logspawn = 1;
        }
        if(logspawn === 1){
          console.log('Spawning new upgrader: ' + newName);
          break;
        }
      }

      //code to create repairers based on available energy and number of harvesters
      if(repairers.length < 2){
        if(energyavailable >= 550) {
          var newName = spawner.createCreep([WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE], undefined, {role: 'repairer'});
          logspawn = 1;
        }
        if(energyavailable > 300 && energyavailable < 550) {
          var newName = spawner.createCreep([WORK,WORK,CARRY,MOVE], undefined, {role: 'repairer'});
          logspawn = 1;
        }
        if(energyavailable > 200 && energyavailable < 300){
          var newName = spawner.createCreep([WORK,CARRY,MOVE], undefined, {role: 'repairer'});
          logspawn = 1;
        }
        if(logspawn === 1){
          console.log('Spawning new repairer: ' + newName);
          break;
        }
      }

      //code to create movers based on available energy and number of harvesters
      if(movers.length < 2 && availablecontainers.length > 0){
        if(energyavailable >= 550) {
          var newName = spawner.createCreep([WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], undefined, {role: 'mover'});
          logspawn = 1;
        }
        if(energyavailable > 300 && energyavailable < 550) {
          var newName = spawner.createCreep([WORK,CARRY,CARRY,MOVE,MOVE], undefined, {role: 'mover'});
          logspawn = 1;
        }
        if(energyavailable > 200 && energyavailable < 300){
          var newName = spawner.createCreep([WORK,CARRY,MOVE], undefined, {role: 'mover'});
          logspawn = 1;
        }
        if(logspawn === 1){
          console.log('Spawning new mover: ' + newName);
          break;
        }
      }
    }

    //main loop for creeps: based on role jump to the role module associated with that role
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'repairer') {
            roleRepairer.run(creep);
        }
        if(creep.memory.role == 'mover'){
            roleMover.run(creep);
        }
    }
}
