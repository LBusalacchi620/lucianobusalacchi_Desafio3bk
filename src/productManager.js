import { promises as fs } from "fs";

export default class ProductManager {
  constructor() {
    this.path = "./producto.json";
    this.products = [];
  }
  static id = 0;
  addProduct = async (title, description, price, thumbnail, code, stock) => {
    ProductManager.id++;
    let newProduct = {
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
      id: ProductManager.id,
    };
    this.products.push(newProduct);
    await fs.writeFile(this.path, JSON.stringify(this.products));
  };

  readproducts = async () => {
    let respuesta = await fs.readFile(this.path, "utf-8");
    return JSON.parse(respuesta);
  };

  getProducts = async () => {
    let respuesta2 = await this.readproducts();
    return console.log(respuesta2);
  };
  getProductById = async (id) => {
    let respuesta3 = await this.readproducts();
    if (!respuesta3.find((product) => product.id == id)) {
      console.log("El Id solicitado es inexistente");
    } else {
      console.log("con el getProductsById");
      console.log(respuesta3.find((product) => product.id == id));
    }
  };
  deleteProductById = async (id) => {
    let respuesta4 = await this.readproducts();
    if (!respuesta4.find((product) => product.id == id)) {
      console.log("El producto que se quiere eliminar no es válido");
    } else {
      let productFilter = respuesta4.filter((products) => products.id != id);
      await fs.writeFile(this.path, JSON.stringify(productFilter));
      console.log(productFilter);
      console.log("Producto eliminado con éxito");
    }
  };
  updateProduct = async (id, ...producto) => {
    await this.deleteProductById(id);
    let productOld = await this.readproducts();
    let productMod = [{ ...producto, id }, ...productOld];
    await fs.writeFile(this.path, JSON.stringify(productMod));
  };
}

// productos.addProduct(
//   "Mayonesa Hellmans",
//   "Mayonesa por 950g",
//   900,
//   "https://res.cloudinary.com/dxf8ebmi7/image/upload/v1679363368/mayonesa_nde5bs.webp",
//   "may01",
//   200
// );
// productos.addProduct(
//   "Vino Calia",
//   "Vino Malbec por 1L",
//   1560,
//   "https://res.cloudinary.com/dxf8ebmi7/image/upload/v1679363368/malbeccalia_csfm9p.webp",
//   "vmk01",
//   201
// );
// productos.addProduct(
//   "Queso cremoso",
//   "Queso cremoso por 500g",
//   800,
//   "https://res.cloudinary.com/dxf8ebmi7/image/upload/v1679363369/quesocremoso_vwdrco.webp",
//   "qcr01",
//   202
// );
// productos.addProduct(
//   "Queso rayado",
//   "Queso rayado por 300g",
//   700,
//   "https://res.cloudinary.com/dxf8ebmi7/image/upload/v1679363369/ralladosancor_erwe3r.webp",
//   "qrr01",
//   203
// );
// productos.addProduct(
//   "New Style",
//   "Vodka por 1L",
//   1200,
//   "https://res.cloudinary.com/dxf8ebmi7/image/upload/v1679363369/vodkanewstyle_m9ldmn.webp",
//   "vdk01",
//   204
// );
// productos.addProduct(
//   "Speed",
//   "Energizante en lata por 300ml",
//   250,
//   "https://res.cloudinary.com/dxf8ebmi7/image/upload/v1679363369/speed_hyctgz.jpg",
//   "eng01",
//   205
// );
// productos.addProduct(
//   "Aceite Libra",
//   "Aceite de girasol por 1L",
//   500,
//   "https://res.cloudinary.com/dxf8ebmi7/image/upload/v1679363369/lira_lkmsfj.webp",
//   "ace01",
//   206
// );
// productos.addProduct(
//   "Jardinera Okey",
//   "Jardinera por 1Kg",
//   450,
//   "https://res.cloudinary.com/dxf8ebmi7/image/upload/v1679363368/okey_vfc1ym.jpg",
//   "jar01",
//   207
// );

//productos.getProducts();

//productos.getProductById(4);

//productos.deleteProductById(4);

// productos.updateProduct(8, {
//   title: "Producto 8",
//   description: "Descripcion8",
//   price: 300000,
//   thumbnail: "imagen8",
//   code: "adc3",
//   stock: 8,
//   id: 8,
// });
