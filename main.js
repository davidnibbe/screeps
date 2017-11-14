require('prototype.spawn')();
var roleHarvester0 = require('role.harvester0');
var roleHarvester1 = require('role.harvester1');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');
var roleMule = require('role.mule');
var roleWallRepairer = require('role.wallrepairer');
var dispatcher = require('dispatcher');
var energytargets;

module.exports.loop = function () {
    //get a list of all the creeps in all the roles
    var harvesters0 = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester0');
    var harvesters1 = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester1');
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
    var mules = _.filter(Game.creeps, (creep) => creep.memory.role == 'mule');
    var wallrepairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'wallrepairer');

    //other variable declaration
    var logspawn = 0;
    var energyAvailable = 0;
    var newname;

    dispatcher.dispatcher.run();

    /*/respawn dead creep
    for(var i in Memory.creeps) {
      if(!Game.creeps[i]) {
        var spawner = Game.getObjectById(Memory.creeps[i].spawn.id);
        energyAvailable = spawner.room.energyAvailable;
        if(Memory.creeps[i].role == 'mule'){
          spawner.spawnMule(energyAvailable, Memory.creeps[i].name, spawner);
        }
        else{
          spawner.spawnBalancedCreep(energyAvailable, Memory.creeps[i], spawner, Memory.creeps[i].role);
        }
      }
    }*/

    //main loop for spawners
    for(var spawnname in Game.spawns) {
      var spawner = Game.spawns[spawnname];
      energyavailable = spawner.room.energyAvailable;

      //code to create harvesters based on available energy and number of harvesters
      if(harvesters0.length < 2){
        newName = spawner.spawnBalancedCreep(energyavailable, undefined, spawner.id, 'harvester0');
        if(newName){
          console.log('Spawning new harvester0: ' + newName);
          break;
        }
      }
      if(harvesters1.length < 2){
        newName = spawner.spawnBalancedCreep(energyavailable, undefined, spawner.id, 'harvester1');
        if(newName){
          console.log('Spawning new harvester1: ' + newName);
          break;
        }
      }

      //code to create builders based on available energy
      if(builders.length < 1){
        newName = spawner.spawnBalancedCreep(energyavailable, undefined, spawner.id, 'builder');
        if(newName){
          console.log('Spawning new builder: ' + newName);
          break;
        }
      }

      //code to create upgraders based on available energy
      if(upgraders.length < 1){
        newName = spawner.spawnBalancedCreep(energyavailable, undefined, spawner.id, 'upgrader');
        if(newName){
          console.log('Spawning new upgrader: ' + newName);
          break;
        }
      }

      //code to create repairers based on available energy
      if(repairers.length < 1){
        newName = spawner.spawnBalancedCreep(energyavailable, undefined, spawner.id, 'repairer');
        if(newName){
          console.log('Spawning new repairer: ' + newName);
          break;
        }
      }

      //code to create mules based on available energy
      if(mules.length < 2 && availablecontainers.length > 0){
        newName = spawner.spawnMule(energyavailable, undefined, spawner.id);
        if(newName){
          console.log('Spawning new mule: ' + newName);
          break;
        }
      }

      //code to create repairers based on available energy
      if(wallrepairers.length < 1){
        newName = spawner.spawnBalancedCreep(energyavailable, undefined, spawner.id, 'wallrepairer');
        if(newName){
          console.log('Spawning new wallrepairer: ' + newName);
          break;
        }
      }
    }

    //code to attack hostiles
    var hostiles = Game.rooms.E22N12.find(FIND_HOSTILE_CREEPS);
    if(hostiles.length > 0) {
        var username = hostiles[0].owner.username;
        var towers = Game.rooms.E22N12.find(
            FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
        towers.forEach(tower => tower.attack(hostiles[0]));
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
        if(creep.memory.role == 'mule'){
            roleMule.run(creep);
        }
        if(creep.memory.role == 'wallrepairer') {
            roleWallRepairer.run(creep);
        }
    }
}
