var roleRepairer = {

  /** @param {Creep} creep **/
  run: function(creep) {
    var actiontaken = false;
    if (creep.carry.energy === 0){
      var spawn = creep.pos.findClosestByRange(FIND_MY_SPAWNS);
      if (spawn.energy > 199){
        if (spawn.transferEnergy(creep) == ERR_NOT_IN_RANGE){
          creep.moveTo(spawn);
        }
      }
    }
    else {
      var mytargets = creep.room.find(FIND_MY_STRUCTURES, {
        filter: (structure) => {
          return (structure.hits < structure.hitsMax / 1.5 )
        }
      });
      var mystorage = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
          return ((structure.structureType == STRUCTURE_CONTAINER || structure.structureType == STRUCTURE_ROAD) && structure.hits < structure.hitsMax / 1.25 )
        }
      });
      var allstructures = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
          return (structure.hits < structure.hitsMax / 1.5 )
        }
      });
      //If there is a structure in my structures then work repair them first
      if ((mytargets.length > 0) && (actiontaken == false)){
        if (creep.repair(mytargets[0]) == ERR_NOT_IN_RANGE){
          creep.moveTo(mytargets[0]);
          actiontaken = true
        }
      }
      //if there isn't any structures in my_strucutres then repair storage
      if ((mystorage.length > 0) && (actiontaken == false)){
        if (creep.repair(mystorage[0] == ERR_NOT_IN_RANGE)){
          creep.moveTo(mystorage[0]);
          actiontaken = true
        }
      }
      //if there isn't any storage to repair, repair whatever else you can find
      if ((allstructures.length > 0) && (actiontaken == false)){
        if (creep.repair(allstructures[0]) == ERR_NOT_IN_RANGE){
          creep.moveTo(allstructures[0]);
          actiontaken = true
        }
      }
    }
  }
};

module.exports = roleRepairer;
