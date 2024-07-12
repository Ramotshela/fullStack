
module.exports=(sequelize,DataTypes)=>{
    const PhoneBooks=sequelize.define("PhoneBooks",{
        name:{
            type:DataTypes.STRING,
            allowNull:false
        },
        number:{
            type:DataTypes.INTEGER,
            allowNull:false
        }
    })
    
    return PhoneBooks
}