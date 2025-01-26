////////
function convertToJson(response){
  if(response.ok){
    return response.json();
  }else{
    throw new Error("Bad Response Data")
  }
}

//////////
export default class ProductData{
  constructor(category = "tents"){
    this.category = category;
    this.path = `/json/${this.category}.json`;
  }
  ////Get Data function
  getData(){
    return fetch(this.path)
    .then(convertToJson)
    .then((data) => data);
  }

  ////Find Product By ID
  async findProductById(id){
    const products = await this.getData();
    return products.find((item) => item.Id == id);
  }
}
////////
////////
