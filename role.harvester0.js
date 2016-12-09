var roleHarvester = {

  /** @param {Creep} creep **/
  run: function(creep) {
    if(creep.carry.energy < creep.carryCapacity) {
      //Find all the sources
      var sources = creep.room.find(FIND_SOURCES);
      //Harvest if close enough, if not, move closer to source
      if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
        creep.moveTo(sources[0]);
      }
    }
    else {

      //Find sapwners and extensions
      spawnextension = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
          return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
            structure.energy < structure.energyCapacity;
          }
        });

      //find containers
      containerstorage = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
          return (structure.structureType == STRUCTURE_CONTAINER || structure.structureType == STRUCTURE_STORAGE) && structure.store[RESOURCE_ENERGY] < structure.storeCapacity;
        }
      });
      var allenergystructures = spawnextension + containerstorage;
      var nearesttarget = creep.pos.findClosestByRange(allenergystructures);
      console.log(nearesttarget);
      //if there are containers, transfer to container
      if(nearesttarget != null || nearesttarget > 0){
        if (nearesttarget > 0){
          if(creep.transfer(nearesttarget, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
            creep.moveTo(nearesttarget);
          }
        }
        else{
          if(creep.transfer(nearesttarget, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
            creep.moveTo(nearesttarget);
          }
        }
      }
    }
	}
};

module.exports = roleHarvester;
