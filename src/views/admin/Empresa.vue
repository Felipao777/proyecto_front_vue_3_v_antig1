<template>
    <h1>Empresas</h1>
    <div class="card">
        <h5>Gestión Emrpesas</h5>

        <Button label="NUEVA EMPRESA" icon="pi pi-external-link" @click="visible = true" />

        <Dialog v-model:visible="visible" modal header="EMPRESA" :style="{ width: '50vw' }" class="p-fluid">

            <label>Ingrese Nombre</label>
            <InputText type="text" v-model="empresa.nombre_empresa" />
            <label>Ingrese region</label>
            <Textarea v-model="empresa.region_empresa" rows="5" cols="30" />
            <button @click="guardarEmpresa()">Guardar</button>
            <h3>{{ empresa.id_empresa }}</h3>
        </Dialog>


        <!--pre>{{ empresas }}</pre-->
        <DataTable :value="empresas" tableStyle="min-width: 50rem">
            <Column field="id_empresa" header="ID"></Column>
            <Column field="nombre_empresa" header="NOMBRE"></Column>
            <Column field="region_empresa" header="REGION"></Column>
            <Column field="rubro_empresa" header="RUBRO"></Column>
            <Column field="int_ext_empresa " header="INT/EXT"></Column>
            <Column field="telefono_empresa" header="TELEFONO"></Column>
            <Column field="representante_empresa" header="REPRESENTANTE"></Column>
            <Column field="direccion_empresa" header="DIRECCIÓN"></Column>
            <Column header="GESTIÓN">
                <template #body="slotProps">
                    <!--  {{ slotProps.data }} -->
                    <!--
                    <button @click="editarEmpr(slotProps.data)">editar</button>
                    <button @click="eliminarEmpr(slotProps.data.id_empresa)">eliminar</button>
                    -->
                    <Button icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2" @click="editarEmpr(slotProps.data)" />
                    <Button icon="pi pi-trash" class="p-button-rounded p-button-warning mt-2" @click="eliminarEmpr(slotProps.data.id_empresa)" />

                </template>
            </Column>
        </DataTable>

        <!--
        <table border="1">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>NOMBRE</th>
                    <th>REGION</th>
                    <th>RUBRO</th>
                    <th>INT/EXT</th>
                    <th>TELEFONO</th>
                    <th>REPRESENTANTE</th>
                    <th>DIRECCION</th>
                    <th>GESTION</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="emp in empresas" :key="emp.id_empresa">
                    <td>{{ emp.id_empresa }}</td>
                    <td>{{ emp.nombre_empresa }}</td>
                    <td>{{ emp.region_empresa }}</td>
                    <td>{{ emp.rubro_empresa }}</td>
                    <td>{{ emp.int_ext_empresa }}</td>
                    <td>{{ emp.telefono_empresa }}</td>
                    <td>{{ emp.representante_empresa }}</td>
                    <td>{{ emp.direccion_empresa }}</td>
                    <td>
                        <button>editar</button>
                        <button>eliminar</button>
                    </td>
                </tr>
            </tbody>
        </table>
        -->
        <!--Toast position="center"/-->
        <Toast />

    </div>

</template>

<script setup>
// importaciones
import empresaService from '@/services/empresa.service';
import { ref, onMounted } from 'vue';
import { useToast } from "primevue/usetoast";

const toast = useToast();

// variables o estados reactivos

const empresas = ref([])
const empresa = ref({ nombre_empresa: '', region_empresa: '' })
const visible = ref(false);

// metodos o funciones
onMounted(() => {
    getEmpresas()
    //alert("hola")
})

async function getEmpresas() {
    const datos = await empresaService.listar();
    empresas.value = datos.data
}

async function guardarEmpresa() {
    //console.log(empresa.id_empresa)
    try {
        if (empresa.value.id_empresa) {
            await empresaService.modificar(empresa.value, empresa.value.id_empresa);
            getEmpresas();
            visible.value = false
            empresa.value = { nombre_empresa: '', region_empresa: '' }
            toast.add({ severity: 'info', summary: 'Empresa Modificadaada', detail: 'La empresa ha sido modificada', life: 3000 });

        } else {
            await empresaService.guardar(empresa.value);
            getEmpresas();
            visible.value = false
            empresa.value = { nombre_empresa: '', region_empresa: '' }
            toast.add({ severity: 'success', summary: 'Empresa Registrada', detail: 'La empresa ha sido registrada', life: 3000 });
        }

    } catch (error) {
        alert(error)

    }
}
function editarEmpr(emp) {
    empresa.value = emp;
    visible.value = true
}
async function eliminarEmpr(id_empresa) {
    if (confirm("Esta seguro de eliminar la Empresa?")) {
        await empresaService.eliminar(id_empresa);

        getEmpresas();
        toast.add({ severity: 'warn', summary: 'Empresa Eliminada', detail: 'La empresa ha sido eliminada', life: 3000 });
    }

}

</script>