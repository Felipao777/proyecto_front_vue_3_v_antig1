<template>
    <!--div>
        {{ usuario }}
        <h1>Login</h1>
        <label for="e">Ingresar correo:</label>
        <input type="email" v-model="usuario.email">
        <span>{{ errors.email }}</span>
        <br>
        <label>Ingrese contraseña </label>
        <input type="password" v-model="usuario.password">
        <span>{{ errors.password }}</span>
        <br>
        <input type="button" value="Ingresar" v-on:click="funIngresar()">
        {{ errors }}
    </div-->

    <div class="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
        <div class="flex flex-column align-items-center justify-content-center">

            <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
                <div class="w-full surface-card py-8 px-5 sm:px-8" style="border-radius: 53px">
                    <div class="text-center mb-5">
                        <img src="data:image/jpeg;base64,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" alt="Image" height="50" class="mb-3" />
                        <div class="text-900 text-3xl font-medium mb-3">Bienvenido</div>
                        <span class="text-600 font-medium">Ingresar para continuar</span>
                    </div>

                    <div>
                        <label for="email1" class="block text-900 text-xl font-medium mb-2">Correo</label>
                        <InputText id="email1" type="text" placeholder="Email address" class="w-full md:w-30rem mb-5" style="padding: 1rem" v-model="usuario.email" />
                        <span>{{ errors.email }}</span>

                        <label for="password1" class="block text-900 font-medium text-xl mb-2">Contraseña</label>
                        <Password id="password1" v-model="usuario.password" placeholder="Password" :toggleMask="true" class="w-full mb-3" inputClass="w-full" :inputStyle="{ padding: '1rem' }"></Password>
                        <span>{{ errors.password }}</span>

                        <div class="flex align-items-center justify-content-between mb-5 gap-5">
                            <!--div class="flex align-items-center">
                                <Checkbox v-model="checked" id="rememberme1" binary class="mr-2"></Checkbox>
                                <label for="rememberme1">Remember me</label>
                            </div-->
                            <a class="font-medium no-underline ml-2 text-right cursor-pointer" style="color: var(--primary-color)">Recuperar contraseña</a>
                        </div>
                        <Button label="Ingresar" class="w-full p-3 text-xl" v-on:click="funIngresar()"></Button>
                    </div>
                </div>
            </div>
        </div>
    </div>




</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter} from 'vue-router';
import authService from './../services/auth.service';

    //variables
    //const correo = ref("micorreo@mail.com");
    //const clave = ref("mi password");
    const usuario = ref({email:"",password:""})
    const errors =ref({})

    const router = useRouter()


    //metodos
    async function funIngresar(){
        try {
            const {data}=await authService.loginConLaravel(usuario.value)
            console.log("CON INTERCEPTOR: ",data)
            errors.value={}  
            
            localStorage.setItem("access_token", data.access_token)
            router.push("/about")       
            
        } catch (error) {
            console.log(error.response.data)
            errors.value=error.response.data.errors
        }

        //axios.post("http://127.0.0.1:8000/api/v1/auth/login", {email: correo.value , password: clave.value}).then(
        // Esto es una promesa:
        /*axios.post("http://127.0.0.1:8000/api/v1/auth/login", usuario.value).then(
            (res)=>{
                console.log("CON AXIOS :",res.data)
            }
        )*/
    }
</script>

