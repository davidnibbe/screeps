var dispatcher = {

  /** @param {Creep} creep **/
  run: function() {
    //get all the spawns that I control
    var spawns = Game.spawns;
    //we will run the dispatcher on each room we own
    //(indicated by spawn presence)
    for (i = 0; i < spawns.length; i++){
      var spawn = Game.spawns[spawns[i]];
      var room = spawn.room
      energytargets = room.find(FIND_MY_STRUCTURES, {
        filter: (structure) => {
          return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) && structure.energy < structure.energyCapacity;
        }
      });
      
    }
  }
};

module.exports = dispatcher;
