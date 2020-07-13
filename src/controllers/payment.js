import mercadopago from 'mercadopago';


const controller = {
    payment: async(req, res, next) => {
        let preference = {
            items: [
                {
                    title: req.query.titulo,
                    unit_price: req.query.precio_unitario,
                    quantity: 1,
                }
            ]
        };
    
        mercadopago.preferences.create(preference)
            .then(function (response) {
                res.json({ response});
            }).catch(function (err) {
                next(err);
            });
     
    }
    
}

export default controller;
