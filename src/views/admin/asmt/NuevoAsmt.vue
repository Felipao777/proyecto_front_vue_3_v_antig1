<template>
    <div class="grid">
        <div class="col-7">
            <div class="card">
                <!--TablaTrabajadorComponent/-->
                <!--o tb: tabla-trabajador-component/-->
                <tabla-trabajador-component :nombre="nombre" :data="trabajadores"/>

            </div>

        </div>      

        <div class="col-5">
            <div class="grid">
                <div class="col-12">
                    <div class="card">Carrito</div>
                </div>
                <div class="col-12">
                    <div class="card">Cliente</div>
                </div>
                <div class="col-12">
                    <div class="card">Pedido</div>
                </div>
            </div>                             
        </div>
    </div>
</template>

<script setup>
    import TablaTrabajadorComponent from '@/components/admin/TablaTrabajadorComponent.vue';
    import { onMounted, ref } from 'vue';
    import trab_habService from '@/services/trab_hab.service';

    const nombre=ref("Lista de Trabaajdores")
    const trabajadores=ref([])

    onMounted(()=>{
        listaTrabajadores()
    })
    const titulo=ref("Prueba titulo desde el padre")
    const listaTrabajadores=async()=>{
        const{data}=await trab_habService.listar();
        trabajadores.value=data.data
    }
    
</script>