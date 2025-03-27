<template>
    <h1>Tabla Componente de Trabajador</h1>
    <DataTable :value="props.data" >
        <Column field="id_trabajador_hab" header="ID"></Column>
        <Column field="pat_trabajador_hab" header="PATERNO"></Column>
        <Column field="nom_trabajador_hab" header="NOMBRE"></Column>
        <Column field="empresa.nombre_empresa" header="Quantity"></Column>
    </DataTable>
    <p>{{ props.data }}</p>
</template>
<script setup>
    const props =defineProps(['nombre', 'data'])
</script>