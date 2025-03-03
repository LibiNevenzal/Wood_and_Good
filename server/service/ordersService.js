import { executeQuery } from './db.js'
import { getAllQuery,addQuery, updateQuery, getByIdQuery, getByConditionQuery, deleteQuery } from '../queries/genericQueries.js'
export class OrdersService {

    async getOrders() {
        const ordersQuery = getAllQuery("orders");
        const ordersResult = await executeQuery(ordersQuery);
        //
        const finishQuery = getAllQuery("finishes");
        const finishesResult = await executeQuery(finishQuery);
        const materialTypeQuery = getAllQuery("material_types");
        const materialTypesResult = await executeQuery(materialTypeQuery);
        const sizeQuery = getAllQuery("sizes");
        const sizesResult = await executeQuery(sizeQuery);
        const fontQuery = getAllQuery("fonts");
        const fontsResult = await executeQuery(fontQuery);
        return {'ordersResult':ordersResult,
                'finishesResult':finishesResult,
                'materialTypesResult':materialTypesResult,
                'sizesResult':sizesResult,
                'fontsResult':fontsResult }
    }

    async getContactById(id) {
        const queryPost = getByIdQuery("contacts");
        const result = await executeQuery(queryPost, [id]);
        return result;
    }

    async deleteContact(idKey, idValue) {
        const donors = await donorsService.getDonors({ filter: `contact_id=${idValue}` });
        for (const donor of donors.data) {
            await donorsService.patchDonor({ contact_id: null }, donor.id);
        }
        const query = deleteQuery("contacts", `${idKey}`);
        const result = await executeQuery(query, [idValue]);
        return result;
    }

    async updateContact(updatedItem, id) {
        const query = updateQuery("contacts", updatedItem, "id");
        const values = Object.values(updatedItem);
        values.push(id);
        const result = await executeQuery(query, values);
        return result;
    }

    async addOrder(newOrder) {
        const values = Object.values(newOrder);
        const queryOrder = addQuery("orders", newOrder);
        const result = await executeQuery(queryOrder, values);
        return result;
    }
}