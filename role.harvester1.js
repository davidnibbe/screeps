var roleHarvester = {

  /** @param {Creep} creep **/
  run: function(creep) {
    if(creep.memory.harvesting == true) {
      //Find all the sources
      var sources = creep.room.find(FIND_SOURCES);
      if(creep.carry.energy == creep.carryCapacity){
          creep.memory.harvesting == false;
      }
      //Harvest if close enough, if not, move closer to source
      if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
        creep.moveTo(sources[1]);
      }

    }

    if(creep.memory.harvesting == false){

      var nearesttarget;
      if(creep.carry.energy == 0){
          creep.memory.harvesting = true;
      }
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
        console.log(containerstorage);
      //add containers to spawners/extensions
      containerstorage.push(targets);
        console.log(targets);
        console.log(targets.length);
      //find the nearest thing that can take energy
      nearesttarget = creep.pos.findClosestByRange(targets);
        console.log(nearesttarget);
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
