# asuka-template
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Vue.js](https://img.shields.io/badge/vuejs-%2335495e.svg?style=for-the-badge&logo=vuedotjs&logoColor=%234FC08D)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)

Frontend and Backend template I've made for myself utilizing [vue.js](https://vuejs.org/), [tailwindcss](https://tailwindcss.com/), [express.js](https://expressjs.com/), and [MongoDB](https://www.mongodb.com/). An explination can be found below.

Live example deployment at: https://asuka-template.vercel.app/

Frontend `localhost:5173`

Backend `localhost:3000`

### Main.js

Pretty much the setup for the entire vue project. Here we can setup our app / site to use routes for quick navigation between pages.

The comments give an explination of this.

```js
...
//Import various views from the /views directory.
import Home from "./views/Home.vue"
import ExampleView from "./views/ExampleView.vue"

//We use these views to setup our routes. Routes basically act like pages that are accessible / can be navigated too.
//Routes can get more complicated with the setup of generated pages. For example /users/:user
const routes = [
    { path: "", component: Home },
    { path: "/exampleView", component: ExampleView},
]
```

### App.vue

Acts as the base HTML for every page for our site. `<RouterView/>` is where whatever the current page / view will be rendered. Often a header and footer are also present here. In this example a `<div>` is also setup to add these ray images at the top of every page.

```html
<template>
  <main class="min-h-screen flex flex-col gap-3 items-center justify-center">
    <RouterView/>
  </main>

  <div class="absolute top-0 w-[108rem] h-fulloverflow-hidden mix-blend-lighten opacity-20 -z-40">
    <img src="/images/rays1.avif" loading="lazy" class="absolute">
    <img src="/images/rays2.avif" loading="lazy" class="absolute">
  </div>
</template>
```

### /views/Home.vue

Because in our `Main.js` file we setup the path "" to bring us to our home page, this is the default page that will be shown when an user visits the site.

`<script setup>` is basically generic js that is ran the page is built. We import `vue-router` here to handle navigating between pages. In this example we have a `<button>` which redirects to the `exampleView` page when clicked.

```html
<template>
    <p>Hello, this is my template for <span class="text-lightpink">Vue</span> and <span class="text-lightpink">Express</span>.</p>
    <button class="w-auto h-8 px-3 bg-bg-light rounded-md" @click="redirect('exampleView')">Example Button</button>
</template>

<script setup>
    import * as vueRouter from "vue-router"

    const router = vueRouter.useRouter()

    function redirect(route) {
        router.push({
            path: route,
        })
    }
</script>
```

### /components/Container.vue

This is an example of a vue component. These are basically custom HTML elements which we can use elsewhere on other pages (will be shown in the next file). 

Vue components can also be passed data when created, here we have the values `title` and `description` which can be referenced within our components HTML by using `{{ value }}`. 

Though not shown here, regular text can still be used with our values like so: `this {{ weapon }} does {{ damage }} damage`.

```js
<template>
    <div class="flex flex-col gap-3 w-96 bg-bg-dark p-4 rounded-md outline outline-1 outline-offset-1 outline-white-10">
        <h1 class="font-bold">{{ title }}</h1>
        <p>{{ description }}</p>
    </div>
</template>

<script>
    export default {
        props: {
            title: String,
            description: String
        }
    }
</script>
```

### /views/exampleView.vue

This is the example page that we are redirected to when the `<button>` from earlier is clicked.

You can see that we're importing the `<Container>` component from `../components/Container.vue` to be used here within our page. We're also providing it the `title` and `description` values it's asking for.

```js
<template>
    <p>Hello, this is an example <span class="text-lightpink">view</span> with a <span class="text-lightpink">component</span>.</p>
    <Container title="Example Container" description="This is an container component I made with vue components."></Container>
</template>

<script setup>
    import Container from "../components/Container.vue"
</script>
```
