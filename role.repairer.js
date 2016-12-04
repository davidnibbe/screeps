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
	    var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.hits < structure.hitsMax / 1.5 )
                    }
            });
            if (creep.pos.isNearTo(targets[0])){
                creep.repair(targets[0]);
            }
            else {
                moverequired = true;
                movetarget = targets[0];
            }
        }
        if (moverequired){
            creep.moveTo(movetarget);
        }
    }
};

module.exports = roleRepairer;
