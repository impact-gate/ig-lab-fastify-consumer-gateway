export class GatewayProxy {
  constructor(private fastifyUrl: string) {}

  async forwardOrder(orderId: string) {
    // Calls /v1/orders without X-Organization-Id header
    const res = await fetch(`${this.fastifyUrl}/v1/orders/${orderId}`);
    const order = (await res.json()) as any;
    // Dereferences nested billingAddress
    const postal = order.billingAddress.postalCode;
    return { id: order.id, postal };
  }

  async checkMetrics() {
    const res = await fetch(`${this.fastifyUrl}/v1/metrics`);
    const m = (await res.json()) as any;
    // Only reads status and latencyMs (ignores debugHost)
    return { status: m.status, latencyMs: m.latencyMs };
  }
}
