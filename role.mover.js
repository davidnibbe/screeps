var roleMover = {

  /** @param {Creep} creep **/
  run: function(creep) {
    var actiontaken;
    var targets = creep.room.find(FIND_MY_STRUCTURES, {
      filter: (structure) => {
        return (structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_EXTENSION) &&
          structure.energy < structure.energyCapacity;
        }
      });
    if(creep.memory.transferring && creep.carry.energy == 0) {
      creep.memory.transferring = false;
      creep.say('gathering');
    }
  	if(!creep.memory.transferring && creep.carry.energy == creep.carryCapacity) {
      creep.memory.transferring = true;
      creep.say('transferring');
    }

  	if(creep.memory.transferring === true){
	    if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
	    	creep.moveTo(targets[0]);
	    }
  	}

    if(creep.memory.transferring === false) {
      container = creep.pos.findClosestByRange(FIND_STRUCTURES, {
        filter: (structure) => {
          return (structure.structureType == STRUCTURE_CONTAINER) && structure.store[RESOURCE_ENERGY] > 0}
      });
      fullcontainer = creep.pos.findClosestByRange(FIND_STRUCTURES, {
        filter: (structure) => {
          return (structure.structureType == STRUCTURE_CONTAINER) && structure.store[RESOURCE_ENERGY] > structure.storeCapacity}
      });
      if(creep.withdraw(fullcontainer, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.moveTo(fullcontainer);
        actiontaken = true;
      }
	    if(creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE && actiontaken == false) {
        creep.moveTo(container);
      }
    }
  }
};

module.exports = roleMover;
