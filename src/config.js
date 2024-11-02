module.exports={
    app:{
        port:process.env.PORT || 3000,
    },
    jwt:{
       secret: process.env.JET_SECRET || 'estoEsUnaNotaSecreta!'
    },
    mysql:{
        host:process.env.MYSQL_HOST || 'localhost',
        user:process.env.MYSQL_USER || 'root',
        password:process.env.MYSQL_PASSWORD || '',
        database:process.env.MYSQL_DB || 'nodejsexpress'


    }
}