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
      else{
        var sources = room.find(FIND_SOURCES);
        for(var i in sources){
          var source = sources[i];
          source.memory = room.memory.sources[source.id];
        }
      }

      if(!room.memory.spawn){
        console.log("Room: " + roomname + " doesn't have spawn set in memory. Setting.")
        var spawn = room.find(FIND_MY_SPAWNS);
        room.memory.spawn = {};
        console.log(spawn[0].id);
        room.memory.spawn.id = spawn[0].id;
      }
      else{
        var spawn = room.find(FIND_MY_SPAWNS);
        room.memory.spawn.id = spawn[0].id;
      }

      //get all the construction sites in the creeps room
      if(!room.memory.constructionSites){
        var constructionSites = room.find(FIND_CONSTRUCTION_SITES);
        room.memory.constructionSites = {};
        for(var i in constructionSites){
          var site = constructionSites[i];
          room.memory.constructionSites[site.id] = {};
          room.memory.constructionSites[site.id].workers = 0;
        }
      }
      else{
        var constructionSites = room.find(FIND_CONSTRUCTION_SITES);
        for(var i in constructionSites){
          var site = constructionSites[i];
          room.memory.constructionSites[site.id] = {};
        }
      }
    }
  }
};

var getConstructionSite = {
  run: function(room) {
    var availableSites = room.memory.constructionSites
    for(var i in availableSites){
      var site = availableSites[i];
      return site;
    }
  }
};

module.exports = {dispatcher, getConstructionSite};
