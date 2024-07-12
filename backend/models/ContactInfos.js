module.exports=(sequelize,DataTypes)=>{
    const ContactInfos=sequelize.define("ContactInfos",{
        name:{
            type:DataTypes.STRING,
            allowNull:false
        },
        number:{
            type:DataTypes.INTEGER,
            allowNull:false
        }
    })
    return ContactInfos
}