import { API, HOST } from "./Util";

export default class SaleService {
    async getSales({ start, limit, sort, includeTotal = true, tag, price, name }) {
        // Empezamos la query
        let query = "?";

        // Añadimos el start
        query += start ? `start=${start}&` : "";
        query += limit ? `limit=${limit}&` : "";
        query += sort ? `sort=${sort}&` : "";
        query += tag ? `tags=${tag}&` : "";
        query += name ? `name=${name}&` : "";
        query += price ? `price=0-${price}&` : "";
        query += `includeTotal=${includeTotal}&`

        // Eliminamos el último & de la query
        query = query.substr(0, query.length - 1);

        console.log(query);

        return fetch(`${HOST}/${API}/adverts${query}`, {
            method: "GET"
        }).then(res => res.json());
    }

    async getTags() {
        const response = await fetch(`${HOST}/${API}/adverts/tags`, {
            method: "GET"
        });
        const data = await response.json();
        return {
            ok: true,
            allowedTags: data.tags
        }; 
    }
}
