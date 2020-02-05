import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class CancelOrder {
  get key() {
    return 'CancelOrder';
  }

  async handle({ data }) {
    const { cancelOrder } = data;

    await Mail.sendMail({
      to: `${cancelOrder.deliveryman_name} <${cancelOrder.recipient_name}>`,
      subject: 'Encomenda cancelada',
      template: 'cancelOrder',
      context: {
        deliveryman: cancelOrder.deliveryman_name,
        recipient: cancelOrder.recipient_name,
        product: cancelOrder.product,
        description: cancelOrder.description,
        canceled_at: format(
          parseISO(cancelOrder.canceled_at),
          "'dia' dd 'de' MMMM', às' H:mm'h'",
          {
            locale: pt,
          }
        ),
      },
    });
  }
}

export default new CancelOrder();
