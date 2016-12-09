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
      targets = creep.room.find(FIND_STRUCTURES, {
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

      //add containers to spawners/extensions
      targets.push(containerstorage);

      //find the nearest thing that can take energy
      var nearesttarget = creep.pos.findClosestByRange(targets);

      //transfer to nearest target
      if (nearesttarget){
        if(creep.transfer(nearesttarget, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
          creep.moveTo(nearesttarget);
        }
      }
    }
	}
};

module.exports = roleHarvester;
