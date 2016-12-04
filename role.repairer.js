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
      var targets = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
          return (structure.hits < structure.hitsMax / 1.5 )
        }
      });
      if (mytargets > 0){
        if (creep.pos.isNearTo(mytargets[0])){
          creep.repair(mytargets[0]);
        }
        else {
          moverequired = true;
          movetarget = mytargets[0];
        }
      }
      else{
        if (mystorage > 0){
          if (creep.pos.isNearTo(mystorage[0])){
            creep.repair(mystorage[0]);
          }
          else {
            moverequired = true;
            movetarget = mystorage[0];
          }
        }
        else{
          if (creep.pos.isNearTo(targets[0])){
            creep.repair(targets[0]);
          }
          else {
            moverequired = true;
            movetarget = targets[0];
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
