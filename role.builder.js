var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

	    if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.memory.harvesting = false;
            creep.say('no energy');
	    }
	    if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.building = true;
	        creep.say('building');
	    }

	    if(creep.memory.building) {
	        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            }
	    }
	    else {
      	//var sources = creep.pos.findClosestByRange(FIND_SOURCES);
        var spawn = creep.pos.findClosestByRange(FIND_MY_SPAWNS);
        /*if (!creep.memory.harvesting && spawn.energy < 199){
          creep.memory.harvesting = true
          creep.say('harvesting');
        }*/
        if (creep.pos.isNearTo(spawn)){
            var transferresult = spawn.transferEnergy(creep);
            creep.say('transferring');
        }
        else{
          creep.moveTo(spawn);
        }
        /*if(creep.memory.harvesting){
        	if(creep.harvest(sources) == ERR_NOT_IN_RANGE) {
            	creep.moveTo(sources);
        	}
        }*/
	    }
	}
};

module.exports = roleBuilder;
