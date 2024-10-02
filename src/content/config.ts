
import { defineCollection, z } from "astro:content";



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
    author: z.string(),

    // Relacion
    tags: z.array(z.string()), 
    }),
});


// exportamos la coleccion, le vamos a poder nombre blog que va apuntar al blog colection
//la informacion la vamos a grabar en un directorio dentro de content que tiene que tener el nombre blog
export const collections={
    'blog':blogCollection,
};