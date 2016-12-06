var roleHarvester0 = require('role.harvester0');
var roleHarvester1 = require('role.harvester1');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');
var roleMover = require('role.mover');
var roleWallRepairer = require('role.repairer');

module.exports.loop = function () {
    //get a list of all the creeps in all the roles
    var harvesters0 = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester0');
    var harvesters1 = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester1');
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
    var movers = _.filter(Game.creeps, (creep) => creep.memory.role == 'mover');
    var wallrepairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'wallrepairer');

    //other variable declaration
    var logspawn = 0;
    var energyavailable = 0;

    //clear memory of dead creeps
    for(var i in Memory.creeps) {
      if(!Game.creeps[i]) {
        delete Memory.creeps[i];
      }
    }

    //main loop for spawners
    for(var spawnname in Game.spawns) {
      var spawner = Game.spawns[spawnname];

      availablecontainers = spawner.room.find(FIND_STRUCTURES, {
                  filter: (structure) => {
                      return (structure.structureType == STRUCTURE_CONTAINER);
                  }
      });

      energyavailable = spawner.room.energyAvailable;

      //code to create harvesters based on available energy and number of harvesters
      if(harvesters0.length < 2){
        if(energyavailable >= 550) {
          var newName = spawner.createCreep([WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE], undefined, {role: 'harvester0'});
          logspawn = 1;
        }
        if(energyavailable => 300 && energyavailable < 550) {
          var newName = spawner.createCreep([WORK,WORK,CARRY,MOVE], undefined, {role: 'harvester0'});
          logspawn = 1;
        }
        if(logspawn === 1){
          console.log('Spawning new harvester: ' + newName);
          break;
        }
      }
      if(harvesters1.length < 2){
        if(energyavailable >= 550) {
          var newName = spawner.createCreep([WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE], undefined, {role: 'harvester1'});
          logspawn = 1;
        }
        if(energyavailable => 300 && energyavailable < 550) {
          var newName = spawner.createCreep([WORK,WORK,CARRY,MOVE], undefined, {role: 'harvester1'});
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
          var newName = spawner.createCreep([WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], undefined, {role: 'mover', transferring: false});
          logspawn = 1;
        }
        if(energyavailable > 300 && energyavailable < 550) {
          var newName = spawner.createCreep([CARRY,CARRY,CARRY,CARRY,MOVE,MOVE], undefined, {role: 'mover', transferring: false});
          logspawn = 1;
        }
        if(energyavailable > 200 && energyavailable < 300){
          var newName = spawner.createCreep([WORK,CARRY,MOVE], undefined, {role: 'mover', transferring: false});
          logspawn = 1;
        }
        if(logspawn === 1){
          console.log('Spawning new mover: ' + newName);
          break;
        }
      }
      //code to create repairers based on available energy and number of harvesters
      if(wallrepairers.length < 1){
        if(energyavailable >= 550) {
          var newName = spawner.createCreep([WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE], undefined, {role: 'wallrepairer'});
          logspawn = 1;
        }
        if(energyavailable > 300 && energyavailable < 550) {
          var newName = spawner.createCreep([WORK,WORK,CARRY,MOVE], undefined, {role: 'wallrepairer'});
          logspawn = 1;
        }
        if(energyavailable > 200 && energyavailable < 300){
          var newName = spawner.createCreep([WORK,CARRY,MOVE], undefined, {role: 'wallrepairer'});
          logspawn = 1;
        }
        if(logspawn === 1){
          console.log('Spawning new repairer: ' + newName);
          break;
        }
      }
    }


    //main loop for creeps: based on role jump to the role module associated with that role
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester0') {
            roleHarvester0.run(creep);
        }
        if(creep.memory.role == 'harvester1') {
            roleHarvester1.run(creep);
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
        if(creep.memory.role == 'wallrepairer') {
            roleWallRepairer.run(creep);
        }
    }
}
