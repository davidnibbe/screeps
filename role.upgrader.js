var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {

      if(creep.memory.upgrading && creep.carry.energy == 0) {
          creep.memory.upgrading = false;
          creep.say('harvesting');
      }
      if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
          creep.memory.upgrading = true;
          creep.say('upgrading');
      }

      if(creep.memory.upgrading) {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
      }
      else {
        var spawn = creep.pos.findClosestByRange(FIND_MY_SPAWNS);
        if (creep.pos.isNearTo(spawn)){
            if (spawn.energy > 199){
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
