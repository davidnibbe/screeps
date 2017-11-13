var roleUpgrader = require('role.upgrader');
var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

	    if(creep.memory.working && creep.carry.energy == 0) {
            creep.memory.working = false;
            creep.memory.harvesting = false;
            creep.say('no energy');
	    }
	    if(!creep.memory.working && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.working = true;
	        creep.say('building');
	    }

	    if(creep.memory.working) {
        var target = dispatcher.getConstructionSite.run(creep.room);
        console.log(target);
        if(target[0]) {
            if(creep.build(target[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target[0], {reusePath: 25});
            }
        }
        else{
            console.log("I'm a upgrader harry.")
          roleUpgrader.run(creep);
        }
	    }
	    else {
      	var sources = creep.pos.findClosestByPath(FIND_SOURCES);
        var spawn = creep.pos.findClosestByRange(FIND_MY_SPAWNS);
        if (!creep.memory.harvesting && creep.room.energyAvailable == creep.room.energyCapacityAvailable){
          creep.memory.harvesting = true;
          creep.say('harvesting');
        }

        if (!creep.memory.harvesting){
          if (creep.pos.isNearTo(spawn)){
              var transferresult = creep.withdraw(spawn, RESOURCE_ENERGY);
              creep.say('transferring');
          }
          else{
            creep.moveTo(spawn, {reusePath: 25});
          }
        }

        if(creep.memory.harvesting){
        	if(creep.harvest(sources) == ERR_NOT_IN_RANGE) {
            	creep.moveTo(sources, {reusePath: 25});
        	}
        }
	    }
	}
};

module.exports = roleBuilder;
