module.exports = {
  //a function to run the logic for this role
  run: function(creep){
    let source = Game.getObjectById(creep.memory.sourceId);
    let container = source.pos.findInRange(FIND_STRUCTURES, 1, {
      filter: structure => structure.structureType == STRUCTURE_CONTAINER
    })[0];

    if(creep.pos.isEqualTo(container.pos)){
      creep.harvest(source);
    }
    else{
      creep.moveTo(source);
    }

  }
}
