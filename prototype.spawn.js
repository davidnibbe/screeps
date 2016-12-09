module.exports = function() {
  StructureSpawn.prototype.createBalancedCreep =
    fucntion(energy, roleName){
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
      this.createCreep(body, undefined, { role: roleName, working: false})
    };
  StructureSpawn.prototype.createHarvester =
    fucntion(energy, source){
      var numberOfParts = (Math.floor(energy / 150 ) - 100);
      var body = [];
      for (let i = 0; i < numberOfParts; i++){
          body.push(WORK);
      }
      for (let i = 0; i < numberOfParts; i++){
          body.push(CARRY);
      }
      body.push(MOVE);
      body.push(MOVE);
      var rolename = 'harvester' + source
      this.createCreep(body, undefined, { role: roleName, working: false})
    };
    StructureSpawn.prototype.createLongDistanceHarvester =
      fucntion(energy){
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
