module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define("Users", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Users.associate = (models) => {
    Users.hasMany(models.Likes, {
      onDelete: "cascade",
    });
    Users.hasMany(models.PhoneBooks, {
      onDelete: "cascade",
    });
    Users.hasOne(models.ContactInfos, {
      onDelete: "cascade",
    });
  };

  return Users;
};
