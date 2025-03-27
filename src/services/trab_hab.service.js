import { http } from "./Http"

export default{
    listar(page=1,limit=10, q=""){
        //return http().get("/trab_hab?page="+page+"&q="+q);
        //return http().get("/trab_hab?page="+page+"&limit="+limit+"&q="+q);
        return http().get(`/trab_hab?page=${page}&limit=${limit}&q=${q}`);
        //return http().get(`/trab_hab?page=${page}&q=${q}`); //con convert to template string
    },
    guardar(datos){
        return http().post("/trab_hab", datos);
    },
    mostrar(id){
        return http().get("/trab_hab/"+id);
    },
    modificar(datos, id){
        return http().put("/trab_hab/"+id, datos);
        //return http().put(`/empresa/${id}`, datos);
        //return http().put(`empresa/${id}`, datos);
    },
    eliminar(id){
        return http().delete("/trab_hab/"+id);
    },
    actualizarImagen(id, datos) {
        return http().post(`/trab_hab/${id}/actualizar-imagen`, datos)
    },

}