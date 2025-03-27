<template>
    <div class="card">
        <h1>Trabajadores</h1>
        <!--{{ trabajadores }}-->
        <Toast />

        <Toolbar class="mb-4">
            <template v-slot:start>
                <div class="my-2">
                    <Button label="Nuevo Trabajador" icon="pi pi-plus" class="p-button-success mr-2" @click="openNew" />
                </div>
            </template>

            <template v-slot:end>
                <FileUpload mode="basic" accept="image/*" :maxFileSize="1000000" label="Import" chooseLabel="Import"
                    class="mr-2 inline-block" />
                <Button label="Export" icon="pi pi-upload" class="p-button-help" @click="exportCSV($event)" />
            </template>
        </Toolbar>

        <DataTable ref="dt" :value="trabajadores" :totalRecords="totalRecords" 
            lazy
            :loading="loading"
            @page="onPage($event)"
            dataKey="id_trabajador_hab"
            :paginator="true" :rows="10"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            :rowsPerPageOptions="[5, 10, 25]"
            currentPageReportTemplate="Mostrando {first} al {last} de {totalRecords} trabajadores"
            responsiveLayout="scroll">

            <template #header>
                <div class="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
                    <h5 class="m-0">GESTION TRABAJADORES</h5>
                    <span class="block mt-2 md:mt-0 p-input-icon-left">
                        <i class="pi pi-search" />
                        <!--<InputText placeholder="Buscar..." v-model="buscar" @keyup="buscador()" />-->
                        <InputText placeholder="Buscar..." v-model="buscar" @keypress.enter="buscador()" />
                    </span>
                </div>
            </template>

            <Column field="id_trabajador_hab" header="ID" :sortable="true" headerStyle="width:2%; min-width:1rem;">
                <template #body="slotProps">
                    <span class="p-column-title">Code</span>
                    {{ slotProps.data.id_trabajador_hab }}
                </template>
            </Column>

            <Column field="pat_trabajador_hab" header="Paterno" :sortable="true"
                headerStyle="width:14%; min-width:10rem;">
                <template #body="slotProps">
                    <span class="p-column-title">Name</span>
                    {{ slotProps.data.pat_trabajador_hab }}
                </template>
            </Column>

            <!-- desde aqui las otras columnas-->
            <Column field="mat_trabajador_hab" header="Materno" :sortable="true"
                headerStyle="width:14%; min-width:10rem;">
                <template #body="slotProps">
                    <span class="p-column-title">Name</span>
                    {{ slotProps.data.mat_trabajador_hab }}
                </template>
            </Column>
            <Column field="nom_trabajador_hab" header="Nombre" :sortable="true"
                headerStyle="width:14%; min-width:10rem;">
                <template #body="slotProps">
                    <span class="p-column-title">Name</span>
                    {{ slotProps.data.nom_trabajador_hab }}
                </template>
            </Column>

            <Column field="id_empresa" header="Empresa" :sortable="true" headerStyle="width:14%; min-width:10rem;">
                <template #body="slotProps">
                    <span class="p-column-title">Name</span>
                    {{ slotProps.data.empresa.nombre_empresa }}
                </template>
            </Column>
            <!-- hasta aqui las otras columnas-->

            <Column headerStyle="min-width:10rem;">
                <template #body="slotProps">
                    
                    <Button icon="pi pi-image" class="p-button-rounded p-button-info mr-2"
                        @click="imagenTrabajador(slotProps.data)" />
                    <Button icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2"
                        @click="editTrabajador(slotProps.data)" />                   
                    <Button icon="pi pi-trash" class="p-button-rounded p-button-warning mt-2"
                        @click="confirmDeleteTrabajador(slotProps.data)" />
                </template>
            </Column>

        </DataTable>

        <Dialog v-model:visible="productDialog" :style="{ width: '450px' }" header="Trabajador" :modal="true"
            class="p-fluid">
            <!--{{ trab_hab }}-->

            <div class="field">
                <label for="name">Ap Paterno</label>
                <InputText id="name" v-model.trim="trab_hab.pat_trabajador_hab" required="true" autofocus
                    :class="{ 'p-invalid': submitted && !trab_hab.pat_trabajador_hab }" />
                <small class="p-invalid" v-if="submitted && !trab_hab.pat_trabajador_hab">Paterno es
                    Obligatorio.</small>
            </div>
            <div class="field">
                <label for="description">Description</label>
                <Textarea id="description" v-model="trab_hab.nom_trabajador_hab" rows="3" cols="20" />
            </div>

            <div class="field">
                <label class="mb-3">Empresa</label>
                <div class="formgrid grid">
                    <div class="field-radiobutton col-6" v-for="emp in empresas" :key="emp.id_empresa">
                        <RadioButton :value="emp.id_empresa" v-model="trab_hab.id_empresa" />
                        <label for="category1">{{ emp.nombre_empresa }}</label>
                    </div>
                </div>
            </div>

            <div class="formgrid grid">
                <div class="field col">
                    <label for="price">Carnet</label>
                    <InputNumber id="price" v-model="trab_hab.ci_trabajador_hab" mode="currency" currency="USD"
                        locale="en-US" :class="{ 'p-invalid': submitted && !trab_hab.ci_trabajador_hab }" :required="true" />
                    <small class="p-invalid" v-if="submitted && !trab_hab.ci_trabajador_hab">Carnet es Obligatorio.</small>
                </div>
                <div class="field col">
                    <label for="quantity">Sexo_Trabajador</label>
                    <InputNumber id="quantity" v-model="trab_hab.sexo_trabajador_hab" integeronly />
                </div>
            </div>
            <template #footer>
                <Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="hideDialog" />
                <Button label="Save" icon="pi pi-check" class="p-button-text" @click="saveTrabajador" />
            </template>
        </Dialog>

        <Dialog v-model:visible="deleteProductDialog" :style="{ width: '450px' }" header="Confirmar" :modal="true">
            <div class="flex align-items-center justify-content-center">
                <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                <span v-if="trab_hab"
                >¿Está seguro de eliminar el Producto <b>{{ trab_hab.pat_trabajador_hab }}</b
                >?</span
                >
            </div>
                    <template #footer>
                        <Button label="No" icon="pi pi-times" class="p-button-text" @click="deleteProductDialog = false" />
                        <Button label="Yes" icon="pi pi-check" class="p-button-text" @click="deleteTrab" />
                    </template>
        </Dialog>

        <Dialog v-model:visible="productDialogImagen" :style="{ width: '650px' }" header="Imagen" :modal="true" class="p-fluid">
            <img :src="`http://127.0.0.1:8000/${trab_hab.profesion_trabajador_hab}`" alt="" width="200">
            <FileUpload         
                customUpload @uploader="subirImagenProducto"
                :multiple="true"
                accept="image/*"
                :maxFileSize="1000000"
                >
                <template #empty>
                <p>Arrastrar y soltar para subir imagen.</p>
                </template>
            </FileUpload>
        </Dialog>

    </div>
</template>

<script setup>

import { onMounted, ref } from 'vue';
import trab_habService from '@/services/trab_hab.service';
import empresaService from '@/services/empresa.service';
//import { onMounted, ref } from 'vue';
import { useToast } from 'primevue/usetoast';

const toast = useToast();

const trabajadores = ref([]);
const empresas = ref([])
const dt = ref(null);
const totalRecords = ref(0);
const productDialog = ref(false);
const productDialogImagen=ref(false);
//const product = ref({});
const trab_hab = ref({});
const deleteProductDialog = ref(false);
const deleteProductsDialog = ref(false);
const submitted = ref(false);
const buscar=ref("")

// para lazy
const loading =ref(false)
const lazyParams=ref({page:0})

onMounted(() => {
    listarTrab_habs()
    getEmpresas()
});

const onPage=(event)=>{
    console.log(event)
    lazyParams.value=event;
    listarTrab_habs()

}

async function listarTrab_habs() {
    loading.value=true
    console.log("page:",lazyParams.value.page)

    let page=lazyParams.value.page+1;
    let limit=lazyParams.value.rows;

    const { data } = await trab_habService.listar(page, limit, buscar.value);
    loading.value=false
    console.log(data);
    trabajadores.value = data.data;
    totalRecords.value = data.total;
}

async function getEmpresas() {
    const { data } = await empresaService.listar();
    //console.log(data);
    empresas.value = data;
    /*const datos = await empresaService.listar();
    empresas.value = datos.data*/
}

const openNew = () => {
    trab_hab.value = {};
    submitted.value = false;
    productDialog.value = true;
};

const exportCSV = () => {
    dt.value.exportCSV();
};

const saveTrabajador = async () => {
    submitted.value = true;
    if (trab_hab.value.pat_trabajador_hab && 
        trab_hab.value.pat_trabajador_hab.trim() && 
        trab_hab.value.ci_trabajador_hab) {
        if (trab_hab.value.id_trabajador_hab) {
            
            await trab_habService.modificar(trab_hab.value, trab_hab.value.id_trabajador_hab)
            listarTrab_habs()
            toast.add({ severity: 'success', summary: 'Successful', detail: 'Trabajador Actualizado', life: 3000 });
        } else {
            await trab_habService.guardar(trab_hab.value)
            listarTrab_habs()
            toast.add({ severity: 'success', summary: 'Successful', detail: 'Trabajador registrado', life: 3000 });
        }
        productDialog.value = false;
        trab_hab.value = {};
    }
};

const editTrabajador = (editTrabajador) => {
    trab_hab.value = { ...editTrabajador };
    console.log(trab_hab);
    productDialog.value = true;
};

const imagenTrabajador = (editTrabajador) => {
    trab_hab.value = { ...editTrabajador };
    productDialogImagen.value = true;
};

const confirmDeleteTrabajador = (editTrabajador) => {
    trab_hab.value = editTrabajador;
    deleteProductDialog.value = true;
};


const deleteTrab = async () => {
    trab_hab.value.id_trabajador_hab
    await trab_habService.eliminar(trab_hab.value.id_trabajador_hab)

    deleteProductDialog.value = false;
    trab_hab.value = {};
    toast.add({ severity: 'success', summary: 'Successful', detail: 'Trabajador Eliminado', life: 3000 });
    listarTrab_habs()
};
const buscador=()=>{
    listarTrab_habs()
}


const subirImagenProducto = async (event) => {
  const file = event.files[0];
  console.log(file)
  
  let formData = new FormData();
  formData.append("imagen", file)

  await trab_habService.actualizarImagen(trab_hab.value.id_trabajador_hab, formData)
  productDialogImagen.value = false;
  trab_hab.value = {};

  listarTrab_habs()

  toast.add({
    severity: "success",
    summary: "Imagen Subida",
    detail: "Trabajador Imagen Actualizado",
    life: 3000,
  });

}

</script>