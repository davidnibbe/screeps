var roleRepairer = {

  /** @param {Creep} creep **/
  run: function(creep) {
    var moverequired = false;
    var movetotarget = null;
    if (creep.carry.energy === 0){
      var spawn = creep.pos.findClosestByRange(FIND_MY_SPAWNS);
      if (creep.pos.isNearTo(spawn)){
        if (spawn.energy > 199){
          var transferresult = spawn.transferEnergy(creep);
        }
      }
      else {
        moverequired = true;
        movetarget = spawn;
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
          return ((structure.structureType == STRUCTURE_CONTAINER) && structure.hits < structure.hitsMax / 1.25 )
        }
      });
      var allstructures = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
          return (structure.hits < structure.hitsMax / 1.5 )
        }
      });
      //If there is a structure in my structures then work repair them first
      if (mytargets.length > 0){
        if (creep.pos.isNearTo(mytargets[0])){
          creep.repair(mytargets[0]);
        }
        else {
          moverequired = true;
          movetarget = mytargets[0];
        }
      }
      else{
        //if there isn't any structures in my_strucutres then repair storage
        if (mystorage != null){
          if (mystorage.length > 0){
            if (creep.pos.isNearTo(mystorage[0])){
              creep.repair(mystorage[0]);
            }
            else {
              moverequired = true;
              movetarget = mystorage[0];
            }
          }
          else{
            if (creep.pos.isNearTo(mystorage)){
              creep.repair(mystorage);
            }
            else {
              moverequired = true;
              movetarget = mystorage;
            }
          }
        }
        //if there isn't any storage to repair, repair whatever else you can find
        else{
          if (allstructures.length > 0){
            if (creep.pos.isNearTo(allstructures[0])){
              creep.repair(allstructures[0]);
            }
            else{
              moverequired = true;
              movetarget = allstructures[0];
            }
          }
        }
      }
    }

    if (moverequired){
      creep.moveTo(movetarget);
    }
  }
};

module.exports = roleRepairer;
