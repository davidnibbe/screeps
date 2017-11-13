var dispatcher = {

  /** @param {Creep} creep **/
  run: function() {
    //we will run the dispatcher on each room we own
    //(indicated by spawn presence)
    for (var roomName in Game.rooms){
      var room = Game.rooms[roomName];
      var roomname = room.name;
      if(!room.memory.sources){
        room.memory.sources = {};
        var sources = room.find(FIND_SOURCES);
        for(var i in sources){
          var source = sources[i];
          source.memory = room.memory.sources[source.id] = {};
          source.memory.workers = 0;
        }
      }
      if(!room.memory.spawn){
        console.log("Room: " + roomname + " doesn't have spawn set in memory. Setting.")
        var spawn = room.find(FIND_MY_SPAWNS)
        room.memory.spawn = {}
      }
      console.log(room);
      if(Memory.rooms.room)
      console.log(spawn);
      energytargets = room.find(FIND_MY_STRUCTURES, {
        filter: (structure) => {
          return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) && structure.energy < structure.energyCapacity;
        }
      });
    }
  }
};

var getConstructionSite = {
  function() {
    //get all the spawns that I control
    var spawns = Game.spawns;
    //we will run the dispatcher on each room we own
    //(indicated by spawn presence)
    for (i = 0; i < spawns.length; i++){
      var spawn = Game.spawns[spawn[i]];
      var room = spawn.pos.roomName;
      console.log(room);
      energytargets = room.find(FIND_MY_STRUCTURES, {
        filter: (structure) => {
          return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) && structure.energy < structure.energyCapacity;
        }
      });
    }
  }
};

module.exports = {dispatcher, getConstructionSite};
