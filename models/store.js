module.exports = function(sequelize, DataTypes) {
  var Store = sequelize.define("Store", {
    storeName: DataTypes.STRING(50),
    phoneN: DataTypes.STRING,
    storeAddress: DataTypes.STRING,
    storeOpen: DataTypes.INTEGER,
    storeClose: DataTypes.INTEGER,
    storeEmail: DataTypes.STRING,
    storePass: DataTypes.STRING,
    storeLogo: DataTypes.STRING,
    storeImg: DataTypes.STRING,
    storeContact: DataTypes.STRING,
    contactPosition: DataTypes.STRING
  });

  Store.associate = function(models) {
    // Associating Store with Services
    Store.hasMany(models.Services, {
      // If we delete a Store, all it´s asosiated services will be deleted
      onDelete: "Cascade"
    });
  };
  return Store;
};
