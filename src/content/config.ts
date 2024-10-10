
import { defineCollection, reference, z } from "astro:content";



// const blogCollection = defineCollection({
//     //hay 2 tipos de colecciones content(archivos que tienen markdawn, mdx que se puede renderizar)
//     //data(metadata, osea la informacion en bruto, como por ejemplo un JSON o YAML)
//     type:'content',
//     schema: z.object({
//     title: z.string(),
//     date: z.date(), 
//     description: z.string(),
//     image: z.string(),

//     // Relacion
//     author: z.string(),

//     // Relacion
//     tags: z.array(z.string()), 
//     }),
// });

// IMAGEN EN COLECCION
const blogCollection = defineCollection({
    //hay 2 tipos de colecciones content(archivos que tienen markdawn, mdx que se puede renderizar)
    //data(metadata, osea la informacion en bruto, como por ejemplo un JSON o YAML)
    //Necesitamos decirle a Astro que la imagen no es un string sino que es una imangen dentro de src
    type:'content',
    schema: ({image})=> 
    z.object({
        title: z.string(),
        date: z.date(), 
        description: z.string(),
        image:image().refine((img)=>img.width<1200,{
            message:'Image should be lower than 1200px',
        }),

    // Relacion
    // author: z.string(),
    author:reference('author'),

    // Relacion
    tags: z.array(z.string()), 
    }),
});



//Coleccion de Autores
const authorCollection = defineCollection({
    type:'data',
    schema: ({image})=> 
    z.object({
        name: z.string(),
        avatar: image(), 
        twitter: z.string(),
        linkedIn:z.string(),
        github:z.string(),
        bio: z.string(),
        subtitle: z.string(),
        }),
});




// exportamos la coleccion, le vamos a poder nombre blog que va apuntar al blog colection
//la informacion la vamos a grabar en un directorio dentro de content que tiene que tener el nombre blog
export const collections={
    'author':authorCollection,
    'blog':blogCollection,

};