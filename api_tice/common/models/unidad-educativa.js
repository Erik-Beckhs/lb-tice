'use strict';

module.exports = function(Unidadeducativa) {
    Unidadeducativa.countDriversByUE = (cb) => {
        var ds = Unidadeducativa.dataSource
        var sql = `
        SELECT ue.nombre, count(c.id) cantidad
        FROM conductor c, unidad_educativa ue
        WHERE c.id_ueducativa = ue.id
        GROUP BY ue.nombre
        `;

        ds.connector.query(sql, (err, instance) => {
            if (err) console.error(err);
            //pubsub.publish('/Pedidoreporte/GET', instance);
            cb(err, instance);
        })
    }
    
    Unidadeducativa.remoteMethod(
        'countDriversByUE',
        {
            http: { verb: 'get' },
            accepts: [
            ],
            description:'Devuelve la cantidad de conductores por unidad educativa',
            returns: { arg: 'data', type: ['any'], root: true }
        }
    )
};
