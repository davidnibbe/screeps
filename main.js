var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');
var roleMover = require('role.mover');

module.exports.loop = function () {

    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
    var movers = _.filter(Game.creeps, (creep) => creep.memory.role == 'mover');
    var energyavailable;
    var logspawn = 0;

    for(var spawnname in Game.spawns) {
      var spawner = Game.spawns[spawnname]
      availablestructures = spawner.room.find(FIND_MY_STRUCTURES, {
                  filter: (structure) => {
                      return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN);
                  }
      });

      for(var i = 0, len = availablestructures.length; i < len; i++){
        energyavailable += availablestructures[i].energy;
        console.log(energyavailable);
      }
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

      if(movers.length < 2){
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
