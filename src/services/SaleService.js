import { API, HOST } from "./Util";

export default class SaleService {
    getSales({ start, limit, sort, includeTotal = true, tag, price, name }) {
        // Empezamos la query
        let query = "?";

        // Añadimos el start
        query += start ? `start=${start}&` : "";

        // 2. Faltan añadir a la query los demás campos

        // Eliminamos el último & de la query
        query = query.substr(0, query.length - 1);

        return fetch(`${HOST}/${API}/anuncios${query}`, {
            method: "GET"
        }).then(res => res.json());
    }

    getTags() {
        return fetch(`${HOST}/${API}/adverts/tags`, {
            method: "GET"
        }).then(response => {
            return response.json();
        }).then(data => {
            return {
                ok: true,
                allowedTags: data.tags
            }
        }); 
    }
}
