var roleMule = {

  /** @param {Creep} creep **/
  run: function(creep) {

    //Find Spawns, Extensions, and Towers that are not full
    var targets = creep.room.find(FIND_MY_STRUCTURES, {
      filter: (structure) => {
        return (structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_EXTENSION ||
	       structure.structureType == STRUCTURE_TOWER) &&
          structure.energy < structure.energyCapacity;
        }
      });

    //Set working to false if energy hits 0
    if(creep.memory.working && creep.carry.energy == 0) {
      creep.memory.working = false;
      creep.say('gathering');
    }
    //Set working to true once full of energy
  	if(!creep.memory.working && creep.carry.energy == creep.carryCapacity) {
      creep.memory.working = true;
      creep.say('transferring');
    }

    //While working (not empty)
  	if(creep.memory.working === true){
      //If the target array is empty then dump the energy in storage otherwise fill first target
      if(targets[0] === undefined){
        var storage = creep.room.find(FIND_MY_STRUCTURES, {
          filter: (structure) => {
            return (structure.structureType == STRUCTURE_STORAGE) &&
              structure.store[RESOURCE_ENERGY] < structure.storeCapacity;
            }
        });
        if(creep.transfer(storage[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
          creep.moveTo(storage[0], {reusePath: 25});
        }
      }
      else{
        if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
  	    	creep.moveTo(targets[0], {reusePath: 25});
  	    }
      }
  	}

    //When empty fill up from containers first, then go to storage
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
