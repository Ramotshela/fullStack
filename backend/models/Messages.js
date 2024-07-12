module.exports=(sequelize,DataTypes)=>{
    const Messages=sequelize.define('Messages',{
        text:{
            type:DataTypes.STRING,
            allowNull:false
        },sender:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        receiver:{
            type:DataTypes.INTEGER,
            allowNull:false
        }

    })
   
    return Messages
}