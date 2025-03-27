import { http } from "./Http"

export default{
    listar(){
        return http().get("/empresa");
    },
    guardar(datos){
        return http().post("/empresa", datos);
    },
    mostrar(id){
        return http().get("/empresa/"+id);
    },
    modificar(datos, id){
        return http().put("/empresa/"+id, datos);
        //return http().put(`/empresa/${id}`, datos);
        //return http().put(`empresa/${id}`, datos);
    },
    eliminar(id){
        return http().delete("/empresa/"+id);
    }

}