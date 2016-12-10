module.exports = function() {
  StructureSpawn.prototype.spawnBalancedCreep =
    function(energy, roleName){
      var numberOfParts = Math.floor(energy / 200);
      var body = [];
      for (let i = 0; i < numberOfParts; i++){
          body.push(WORK);
      }
      for (let i = 0; i < numberOfParts; i++){
          body.push(CARRY);
      }
      for (let i = 0; i < numberOfParts; i++){
          body.push(MOVE);
      }
      return this.createCreep(body, undefined, { role: roleName, working: false})
    };
    StructureSpawn.prototype.spawnMule =
      function(energy){
        var numberOfParts = Math.floor(energy / 100);
        var body = [];
        for (let i = 0; i < numberOfParts; i++){
            body.push(CARRY);
        }
        for (let i = 0; i < numberOfParts; i++){
            body.push(MOVE);
        }
        return this.createCreep(body, undefined, { role: 'mule', working: false})
      };
  StructureSpawn.prototype.spawnMiner =
    function(energy, source){
      var body = [];
      body.push(WORK);
      body.push(WORK);
      body.push(WORK);
      body.push(WORK);
      body.push(WORK);
      body.push(CARRY);
      body.push(MOVE);
      this.createCreep(body, undefined, { role: 'miner', sourceId: source})
    };
    StructureSpawn.prototype.createLongDistanceHarvester =
      function(energy){
        var numberOfParts = Math.floor(energy / 150 );
        var body = [];
        for (let i = 0; i < numberOfParts; i++){
            body.push(WORK);
        }
        for (let i = 0; i < numberOfParts; i++){
            body.push(CARRY);
        }
        for (let i = 0; i < numberOfParts; i++){
            body.push(MOVE);
        }
        this.createCreep(body, undefined, { role: ldharvester, working: false})
      };
};
