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
  };

  Users.associate = (models) => {
    Users.hasMany(models.PhoneBooks, {
      onDelete: "cascade",
    });
  };
  Users.associate = (models) => {
    Users.hasMany(models.Messages, {
      onDelete: "cascade",
    });
  };
  Users.associate = (models) => {
    Users.hasOne(models.ContactInfos, {
      onDelete: "cascade",
    });
  };

  return Users;
};
