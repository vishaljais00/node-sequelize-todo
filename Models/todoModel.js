module.exports = (sequelize, DataTypes) => {
    const Todo = sequelize.define(
      "db_todos", // database table name
      {
        todo_id: {
              type: DataTypes.INTEGER,
              autoIncrement: true,
              primaryKey: true,
          },
  
        task: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        
        due_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        
        status: {
            type: DataTypes.ENUM('Pending', 'Doing', 'Done'),
			      defaultValue: 'Pending'
        },

        priority: {
            type: DataTypes.BOOLEAN,
			      defaultValue: false
        },
  
      },
      { paranoid: true, timestamps: true },   
    );
  
    return Todo;
  };
  