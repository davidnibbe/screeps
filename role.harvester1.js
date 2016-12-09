var roleHarvester = {

  /** @param {Creep} creep **/
  run: function(creep) {
    if(creep.memory.working == true) {
      //Find all the sources
      var sources = creep.room.find(FIND_SOURCES);

      if(creep.carry.energy == creep.carryCapacity){
          creep.memory.working = false;
      }
      //Harvest if close enough, if not, move closer to source
      harvestresult = creep.harvest(sources[1]);
      if(harvestresult == ERR_NOT_IN_RANGE) {
        creep.moveTo(sources[1]);
      }
      if(harvestresult == ERR_NOT_ENOUGH_RESOURCES){
        creep.memory.working = false;
      }
    }

    if(creep.memory.working == false){
      console.log(creep.name + ' working = false')
      var nearesttarget;
      if(creep.carry.energy == 0){
          creep.memory.working = true;
      }
      else{
        //Find sapwners and extensions
        spawnextensions = creep.room.find(FIND_STRUCTURES, {
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
        targets = [].concat(spawnextensions, containerstorage);
        //find the nearest thing that can take energy
        nearesttarget = creep.pos.findClosestByRange(targets);
        //transfer to nearest target
        if (nearesttarget){
          if(creep.transfer(nearesttarget, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
            creep.moveTo(nearesttarget);
          }
        }
      }
    }
	}
};

module.exports = roleHarvester;
