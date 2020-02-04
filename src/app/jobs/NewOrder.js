import Mail from '../../lib/Mail';

class NewOrder {
  get key() {
    return 'NewOrder';
  }

  async handle({ data }) {
    const { order } = data;

    await Mail.sendMail({
      to: `${order.deliveryman_name} <${order.recipient_name}>`,
      subject: 'Nova encomenda cadastrada',
      template: 'newOrder',
      context: {
        deliveryman: order.deliveryman_name,
        recipient: order.recipient_name,
        product: order.product,
      },
    });
  }
}

export default new NewOrder();
