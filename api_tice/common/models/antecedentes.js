'use strict';

module.exports = function(Antecedentes) {
    Antecedentes.eliminaPorIdConductor = (idConductor, cb) => {
        var ds = Antecedentes.dataSource;
        var sql = `
        delete from antecedentes where id_conductor = ${idConductor};
        `;

        ds.connector.query(sql, (err, instance) => {
            if (err) console.error(err);
            //pubsub.publish('/Pedidoreporte/GET', instance);
            cb(err, instance);
        })
    }
    
    Antecedentes.remoteMethod(
        'eliminaPorIdConductor',
        {
            http: { verb: 'delete', path:'/antecedenteConductor'},
            accepts: { arg: 'idConductor', type: 'string' },
            returns: { arg: 'data', type: 'any', root: true },
            description:"Elimina los antecedentes correspondientes a un conductor"
        }
    )
};

