var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {

      if(creep.memory.working && creep.carry.energy == 0) {
          creep.memory.working = false;
          creep.say('harvesting');
      }
      if(!creep.memory.working && creep.carry.energy == creep.carryCapacity) {
          creep.memory.working = true;
          creep.say('upgrading');
      }

      if(creep.memory.working) {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
      }
      else {
        var spawn = creep.pos.findClosestByRange(FIND_MY_SPAWNS);
        if (creep.pos.isNearTo(spawn)){
            if (creep.room.energyAvailable == creep.room.energyCapacityAvailable){
              var transferresult = spawn.transferEnergy(creep);
            }
        }
        else {
          creep.moveTo(spawn);
        }
      }
	}
};

module.exports = roleUpgrader;
