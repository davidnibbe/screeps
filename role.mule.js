var roleMule = {

  /** @param {Creep} creep **/
  run: function(creep) {
    var targets = creep.room.find(FIND_MY_STRUCTURES, {
      filter: (structure) => {
        return (structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_EXTENSION ||
	       structure.structureType == STRUCTURE_TOWER) &&
          structure.energy < structure.energyCapacity;
        }
      });
    if(creep.memory.working && creep.carry.energy == 0) {
      creep.memory.working = false;
      creep.say('gathering');
    }
  	if(!creep.memory.working && creep.carry.energy == creep.carryCapacity) {
      creep.memory.working = true;
      creep.say('transferring');
    }

  	if(creep.memory.working === true){
      console.log('Im working');
      if(targets[0] === undefined){
        console.log("looking for storage");
        var storage = creep.room.find(FIND_MY_STRUCTURES, {
          filter: (structure) => {
            return (structure.structureType == STRUCTURE_STORAGE) &&
              structure.store[RESOURCE_ENERGY] < structure.storeCapacity;
            }
        });
        console.log(storage);
        \\if(creep.transfer(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
          creep.moveTo(storage, {reusePath: 25});
        \\}
      }
      else{
        console.log(targets[0]);
        if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
  	    	creep.moveTo(targets[0], {reusePath: 25});
  	    }
      }
  	}

    if(creep.memory.working === false) {
      container = creep.pos.findClosestByRange(FIND_STRUCTURES, {
        filter: (structure) => {
          return (structure.structureType == STRUCTURE_CONTAINER) && structure.store[RESOURCE_ENERGY] > 0}
        });
      if(container){
        if(creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
          creep.moveTo(container, {reusePath: 25});
        }
      }
      else{
        var storage = creep.room.find(FIND_MY_STRUCTURES, {
          filter: (structure) => {
            return (structure.structureType == STRUCTURE_STORAGE) &&
              structure.store[RESOURCE_ENERGY] < structure.storeCapacity;
            }
        });
        creep.withdraw(storage, {reusePath: 25});
      }
    }
  }
};

module.exports = roleMule;
