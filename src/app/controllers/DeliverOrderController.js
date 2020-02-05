import * as Yup from 'yup';
import { parseISO, isBefore } from 'date-fns';
import Order from '../models/Order';

class DeliverOrderController {
  async update(req, res) {
    const schema = Yup.object().shape({
      end_date: Yup.date().required(),
      signature_id: Yup.number(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed.' });
    }
    const { id, order_id } = req.params;
    const { end_date, signature_id } = req.body;

    const order = await Order.findByPk(order_id);

    if (Number(id) !== order.deliveryman_id) {
      return res.status(401).json({
        error: "You don't have permission to withdraw this order.",
      });
    }

    if (!order.start_date) {
      return res.status(401).json({
        error: "You can't deliver this item without withdrawing it first.",
      });
    }

    const parsedEndDate = parseISO(end_date);

    if (isBefore(parsedEndDate, new Date())) {
      return res.status(400).json({ error: 'Past dates are not permitted.' });
    }

    order.end_date = end_date;
    order.signature_id = signature_id;

    await order.save();

    const { id: deliveryman_id, product, recipient_id, start_date } = order;
    return res.json({
      id,
      product,
      recipient_id,
      deliveryman_id,
      end_date,
      start_date,
      signature_id,
    });
  }
}

export default new DeliverOrderController();
