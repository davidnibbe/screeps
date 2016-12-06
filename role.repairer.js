var roleBuilder = require('role.builder');
var roleRepairer = {

  /** @param {Creep} creep **/
  run: function(creep) {
    if (creep.carry.energy === 0){
      var spawn = creep.pos.findClosestByRange(FIND_MY_SPAWNS);
      if (spawn.energy > 199){
        if (spawn.transferEnergy(creep) == ERR_NOT_IN_RANGE){
          creep.moveTo(spawn);
        }
      }
    }
    else {
      var allstructures = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
          return ((structure.structureType != STRUCTURE_WALL) && structure.hits < structure.hitsMax / 1.5 )
        }
      });
      if (creep.repair(allstructures[0]) == ERR_NOT_IN_RANGE){
        creep.moveTo(allstructures[0]);
      }
      else if(!(isNaN(allstructures))){
        roleBuilder.run(creep);
      }
    }
  }
};

module.exports = roleRepairer;
