

let query = require ('./db-connection');
let model ={};

model.list = async (params) =>  {
  
        let sql= "SELECT * FROM habitacion", vector=[], contador=0;

        if(params.estado && params.estado != "") {
            sql += (contador == 0)? " WHERE " : " AND ";
            sql += ` estado = ? `;
            vector.push(params.estado);
            contador++;
        }
        if(params.tipoventilacion && params.tipoventilacion != "") {
            sql += (contador == 0)? " WHERE " : " AND ";
            sql += ` tipoventilacion = ? `;
            vector.push(params.tipoventilacion);
            contador++;
        }
        let result = await query(sql, vector);
        return result;
}
model.create = async (params) => {
    let sql = `
        set @codigo = '0';
        call hotel_db.guardar_habitacion(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, @codigo);
        select @codigo as codigo;
    `;
    let values = [
        params.idhabitacion,
        params.numero ,
        params.precio,
        params.piso,
        params.estado,
        params.tipohabitacion_idtipohabitacion,
        params.banio,
        params.television,
        params.ventanas,
        params.tipoventilacion,
        params.cochera,
        params.netflix,
    ]
    let result = await query(sql, values);
    let indexcodigo = result.length -1;
    let codigo = '';
    if(typeof result[indexcodigo]!="undefined")
        if(typeof result[indexcodigo][0]!= "undefined")
            codigo = result[indexcodigo][0].codigo
    
    let data = "";
    if(typeof result[1] != "undefined")
        if(typeof result[1][0] != "undefined")
            data= result[1][0]
    return {codigo, data}
}
model.data = async (params) => {
    let sql , vector =[];
    sql = `
        SELECT * FROM habitacion WHERE idhabitacion = ?  
    `
    vector = [params.roomId]
    let result = await query(sql, vector)
    return result;
}
model.delete = async (params) => {
    let sql, vector = [];
    sql = `CALL hotel_db.eliminar_habitacion(?);`;
    vector = [params.roomId]
    let result = await query(sql,vector);
    return result;
}
module.exports = model;