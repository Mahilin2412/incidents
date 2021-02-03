// Load the SDK para JavaScript
const AWS = require('aws-sdk');

const s3 = new AWS.S3({
    accessKeyId: "ASIARPFMFNNRSC3X3757",
    secretAccessKey: "Ers9CJMWMyI0svFgzDpDGPMcC14lZa1ctpQDJur1",
    sessionToken:"FwoGZXIvYXdzEAwaDHlaxIZ96RYvoNlKkCLIAc43FFXYBk5/fsbK5D8m31vfvnuAvHb/zRr6DqRDGsLXu9UX8rS0hI5cAT3pnENlE9Ul99k5EHkqNt2aQw49zu0lYL00GWx+bloAYNyeNioJGjx6f7926foJmhT9X7zE0ECmdqiw8ZVuGqVNtTB7tz6uzJ+aeeWMejsZOV+qEa7r0nkZt4JoqtzqmnWTEhbHENAgOQCGe7bx6D+OJ5i0Mdns4l/FtgXCVXeHUa/8ei94MW8ZIUg0XrNiX7H0y0ZekOge/vokJte2KJOc6IAGMi3WqtKKTFQ68pn3XJCuqOyb6lbAzgzdG5HTrhrg6fcOSekTfdbI/CCqdE1/In0="
});
// Set the Region 
//AWS.config.update({region: 'us-west-2'});

//listar los buckets que hay en s3
/*s3.listBuckets({}, (err, data) => {
    if (err) throw err;
    console.log(data);
});*/

// obtener los archivos u objetos almacenados en los buckets especificados
//var param1 = {
//    Bucket: 'backend-prueba'
//}
//s3.listObjectsV2(param1, (err, data) => {
//    if (err) throw err;
//    console.log(data);
//});

