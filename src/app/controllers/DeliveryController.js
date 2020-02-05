import { Op } from 'sequelize';
import Order from '../models/Order';

class DeliveryController {
  async index(req, res) {
    const { page = 1, filter = 'open' } = req.query;
    const { id } = req.params;

    async function handleFilter() {
      let orders;
      const options = {
        async open() {
          orders = await Order.findAll({
            where: {
              deliveryman_id: Number(id),
              canceled_at: null,
              end_date: null,
            },
            limit: 20,
            offset: (page - 1) * 20,
            attributes: [
              'id',
              'product',
              'start_date',
              'recipient_id',
              'deliveryman_id',
              'signature_id',
            ],
          });
          return orders;
        },
        async cancelled() {
          orders = await Order.findAll({
            where: {
              deliveryman_id: id,
              canceled_at: {
                [Op.ne]: null,
              },
            },
            limit: 20,
            offset: (page - 1) * 20,
            attributes: [
              'id',
              'product',
              'start_date',
              'canceled_at',
              'recipient_id',
              'deliveryman_id',
              'signature_id',
            ],
          });
          return orders;
        },
        async delivered() {
          orders = await Order.findAll({
            where: {
              deliveryman_id: id,
              end_date: {
                [Op.ne]: null,
              },
            },
            limit: 20,
            offset: (page - 1) * 20,
            attributes: [
              'id',
              'product',
              'end_date',
              'recipient_id',
              'deliveryman_id',
              'signature_id',
            ],
          });
          return orders;
        },
      };
      return options[filter]();
    }

    const orders = await handleFilter();
    return res.json(orders);
  }
}

export default new DeliveryController();
