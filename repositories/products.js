const Repository=require('./repository');

class ProductsRepository extends Repository{

}

//create an instance or ProductsRepository and export it

module.exports=new ProductsRepository('products.json')