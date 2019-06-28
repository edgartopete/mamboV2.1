module.exports = function(sequelize, DataTypes) {
  var Services = sequelize.define("Services", {
    serviceTitle: DataTypes.STRING,
    serviceDesc: DataTypes.TEXT,
    serviceImg: DataTypes.STRING,
    serviceTime: DataTypes.INTEGER,
    serviceGender: DataTypes.STRING,
    servicePrice: DataTypes.INTEGER
  });

  Services.associate = function(models) {
    // Services should belong to a Store
    // A service can't be created without a store due to the foreign key constraint
    Services.belongsTo(models.Store, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Services;
};
