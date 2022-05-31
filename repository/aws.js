const AWS = require('aws-sdk');

AWS.config.update({region:'us-east-1'});

class imageRepository {

    constructor(){
        
        this.s3 = new AWS.S3({
            accessKeyId: "TU_ACCES_KEY_ID",
            secretAccessKey: "TU_SECRET_ACCESS_KEY",
        });

    }

    async uploadImage(name, imagen, type){

        const key = `${name}.${type.split('/')[1]}`;

        return new Promise((resolve, reject) =>{
            const params = {
                Bucket: 'NOMBRE_DEL_BUCKET',
                Key: key,
                Body: imagen,
                ACL: 'public-read',
                contentType: type
            }
    
            this.s3.upload(params, (err, data) =>{
                if(err){
                    reject(err);
                }
                resolve(`https://NOMBRE_DEL_BUCKET.s3.amazonaws.com/${key}`);
            });
    
            //BUSCAR LOS https://NOMBRE_DEL_BUCKET.s3.amazonaws.com/ Y PONER EL NOMBRE CORRECTO DE TU BUCKET

        })
    }

    async deleteImage(key){

        const params = {
            Bucket: 'azgendabucket',
            Key: key
        }

        this.s3.deleteObject(params, (err, data)=>{
            if (err) throw err;
            console.log('Objeto eliminado: ' + key);
        })

    }

}

    
module.exports = imageRepository