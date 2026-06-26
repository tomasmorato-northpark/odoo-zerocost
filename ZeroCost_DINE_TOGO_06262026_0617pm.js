(async () => {
    const pos = odoo.__WOWL_DEBUG__.root.env.services.pos;

    const rules = {
        "ND71 SWEET & SOUR PORK": [5603, 13937, 13938]
    };

    for (const line of pos.selectedOrder.get_orderlines()) {
        const containers = rules[line.product_id.display_name];

        if (!containers) continue;

        for (let i = 0; i < line.qty; i++) {
            for (const productId of containers) {
                await pos.addLineToCurrentOrder({
                    product_id: pos.models["product.product"].get(productId)
                });
            }
        }
    }

    console.log("Done.");
})();
