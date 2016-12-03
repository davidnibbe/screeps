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
        spawnextension = creep.pos.findClosestByRange(FIND_STRUCTURES, {
          filter: (structure) => {return (structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_EXTENSION)}});
        console.log(spawnextension[0]);
        //Transfer energy to spawner or extension if close enough, otherwise, move closer to spawner or extension
        if(creep.transfer(spawnextension[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(spawnextension[0]);
        }
      }
	}
};

module.exports = roleHarvester;
