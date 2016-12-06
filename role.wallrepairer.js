var roleBuilder = require('role.builder');
var roleWallRepairer = {

  /** @param {Creep} creep **/
  run: function(creep) {
    var wallfound = false;
    var target;
    var walls = creep.room.find(FIND_STRUCTURES, {
      filter: (structure) => {
        return ((structure.structureType == STRUCTURE_WALL) );
      }
    });

    for(var percent = .0001; percent < 1; percent + .0001 ){

      for(var i = 0; i < walls.length; i++){
        if(walls[i].hits < walls[i].hitsMax / percent){
          wallfound = true;
          target = walls[i];
          break;
        }
      }

      if(wallfound){
        break;
      }
    }

    if (creep.carry.energy === 0){
      var spawn = creep.pos.findClosestByRange(FIND_MY_SPAWNS);
      if (creep.room.energyAvailable == creep.room.energyCapacityAvailable){
        if (spawn.transferEnergy(creep) == ERR_NOT_IN_RANGE){
          creep.moveTo(spawn);
        }
      }
    }
    else {
      if (creep.repair(target) == ERR_NOT_IN_RANGE){
        creep.moveTo(target);
      }
      else{
        roleBuilder.run(creep);
      }
    }
  }
};

module.exports = roleWallRepairer;
