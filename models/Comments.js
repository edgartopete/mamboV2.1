module.exports = function(sequelize, DataTypes) {
  var Comments = sequelize.define("Comments", {
    serviceRat: DataTypes.INTEGER,
    serviceCom: DataTypes.TEXT
  });

  Comments.associate = function(models) {
    // Services should belong to a Store
    // A service can't be created without a store due to the foreign key constraint
    Comments.belongsTo(models.Services, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Comments;
};
