(async () => {
    const pos = odoo.__WOWL_DEBUG__.root.env.services.pos;

    const rules = {
        "ND71 SWEET & SOUR PORK": 5603
       
    };

    for (const line of pos.selectedOrder.get_orderlines()) {
        const container = rules[line.product_id.display_name];

        if (!container) continue;

        for (let i = 0; i < line.qty; i++) {
            await pos.addLineToCurrentOrder({
                product_id: pos.models["product.product"].get(container)
            });
        }
    }
})();
