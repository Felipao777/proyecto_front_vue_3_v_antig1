<script setup>
import { ref } from 'vue';

import AppMenuItem from './AppMenuItem.vue';

const model = ref([
    {
        label: 'Administración',
        items: [{ label: 'Admin', icon: 'pi pi-fw pi-home', to: '/' },
        { label: 'perfil', icon: 'pi pi-fw pi-user', to: '/about' }]
    },
    {
        label: 'Gestión Registros',
        items: [
            { label: 'Empresa', icon: 'pi pi-fw pi-check-square', to: '/empresa' },
            { label: 'Trabajadores', icon: 'pi pi-fw pi-id-card', to: '/trabajador' },


        ]
    },
    {
        label: 'Permisos de Trabajo',
        items: [
            { label: 'Asmt', icon: 'pi pi-fw pi-eye', to: '/asmt' },
            { label: 'NuevoAsmt', icon: 'pi pi-fw pi-eye', to: '/asmt/nuevo' },
            { label: 'Trab Alturas', icon: 'pi pi-fw pi-globe', url: 'https://www.primefaces.org/primeblocks-vue', target: '_blank' },
            { label: 'Trab Caliente', icon: 'pi pi-fw pi-eye', to: '/blocks', badge: 'NEW' },
            { label: 'Trab E.Confinados', icon: 'pi pi-fw pi-eye', to: '/blocks', badge: 'NEW' },
        ]
    },

    {
        label: 'Gestión de Riesgos', icon: 'pi pi-fw pi-briefcase', to: '/pages',
        items: [
            { label: 'Tipo de Riesgos', icon: 'pi pi-fw pi-globe', to: '/landing' },
            {   label: 'Medidas de Riesgos', icon: 'pi pi-fw pi-eye',
                items: [
                    { label: 'ASMT',icon: 'pi pi-fw pi-sign-in', to: '/auth/login' },
                    { label: 'Alturas', icon: 'pi pi-fw pi-times-circle', to: '/auth/error'},
                    { label: 'Caliente',icon: 'pi pi-fw pi-lock', to: '/auth/access'},
                    { label: 'Confinados',icon: 'pi pi-fw pi-lock', to: '/auth/access'}
                ]
            },            
        ]
    },

    {
        label: 'GESTION DE EPPS', icon: 'pi pi-fw pi-briefcase', to: '/pages',
        items: [
            { label: 'Epps', icon: 'pi pi-fw pi-globe', to: '/landing' },
            {   label: 'Epps asignados', icon: 'pi pi-fw pi-eye',
                items: [
                    { label: 'Epps ASMT',icon: 'pi pi-fw pi-sign-in', to: '/auth/login' },
                    { label: 'Epps Alturas', icon: 'pi pi-fw pi-times-circle', to: '/auth/error'},
                    { label: 'Epps Caliente',icon: 'pi pi-fw pi-lock', to: '/auth/access'},
                    { label: 'Epps Confinados',icon: 'pi pi-fw pi-lock', to: '/auth/access'}
                ]
            },            
        ]
    },

    {
        label: 'ASPECTOS A VERIFICAR', icon: 'pi pi-fw pi-briefcase', to: '/pages',
        items: [
            { label: 'Area de Asp verif', icon: 'pi pi-fw pi-globe', to: '/landing' },
            {   label: 'Asp verif', icon: 'pi pi-fw pi-eye',
                items: [
                    { label: 'Asp verif ASMT',icon: 'pi pi-fw pi-sign-in', to: '/auth/login' },
                    { label: 'Asp verif Alturas', icon: 'pi pi-fw pi-times-circle', to: '/auth/error'},
                    { label: 'Asp verif Caliente',icon: 'pi pi-fw pi-lock', to: '/auth/access'},
                    { label: 'Asp verif Confinados',icon: 'pi pi-fw pi-lock', to: '/auth/access'}
                ]
            }, 
            {   label: 'Asp cierre', icon: 'pi pi-fw pi-eye',
                items: [
                    { label: 'Asp cierre ASMT',icon: 'pi pi-fw pi-sign-in', to: '/auth/login' },
                    { label: 'Asp cierre Alturas', icon: 'pi pi-fw pi-times-circle', to: '/auth/error'},
                    { label: 'Asp cierre Caliente',icon: 'pi pi-fw pi-lock', to: '/auth/access'},
                    { label: 'Asp cierre Confinados',icon: 'pi pi-fw pi-lock', to: '/auth/access'}
                ]
            },            
        ]
    },


    {
        label: 'GESTION DE AREAS-SECTORES',
        items: [
            { label: 'Areas', icon: 'pi pi-fw pi-bookmark', to: '/uikit/floatlabel' },
            { label: 'Sectores', icon: 'pi pi-fw pi-desktop', to: '/utilities/icons' },
            // { label: 'Maquinarias', icon: 'pi pi-fw pi-desktop', url: 'https://www.primefaces.org/primeflex/', target: '_blank' }
            { label: 'Maquinarias', icon: 'pi pi-fw pi-prime', to: '/uikit/floatlabel' }
        ]
    },

]);
</script>

<template>
    <ul class="layout-menu">
        <template v-for="(item, i) in model" :key="item">
            <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
            <li v-if="item.separator" class="menu-separator"></li>
        </template>

    </ul>
</template>

<style lang="scss" scoped></style>
