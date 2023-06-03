import React, { useState, useEffect, useRef } from 'react'
import '../store/firebase'
import { db } from '../store/firebase';
import { addressWallet, setProductSelected } from '../../sesion'
import { ethers, JsonRpcProvider } from "ethers";
import contractABI from '../store/abi.json'
import { collection, query, doc, getDocs, where, updateDoc } from "firebase/firestore";
import CardProduct from '../products/cardProduct';

const priceMonitorAddress = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9"
const SmartContractLocalIP = "http://127.0.0.1:8545/"

const TITLE = 0
const BRAND = 1
const DESCRIPTION = 2

function CategoryFilter(props) {

  const [categories, setCategories] = useState("")
  const [productsFiltered, setProductsFiltered] = useState([])
  const [products, setProducts] = useState([])
  const [productsFirebase, setProductsFirebase] = useState([])
  const selectedCategories = useRef([])
  
  async function getAllProducts() {
    if(typeof window.ethereum != 'undefined'){

      //By using the provider object we’re ready to retrieve a reference to the SC
      //on the blockchain by creating a new ethers.Contract object.
      // const provider = new BrowserProvider(window.ethereum)
      const provider = new JsonRpcProvider(SmartContractLocalIP);
      const contract = new ethers.Contract(priceMonitorAddress, contractABI, provider)
      try{
        const data = await contract.getAllProducts()
        const productsFromContract = data.filter(item => {
          if(item[TITLE] != '' || item[BRAND] != '' || item[DESCRIPTION] != ''){
            return item
          }
        })
        setProducts(productsFromContract)
        setProductsFiltered(productsFromContract)
        console.log("Products from contract", productsFromContract)
      }catch(err){
        console.log("Error: ", err)
      }
    }
  }

  async function getCategoriesFromFirebase() {
    const q = query(collection(db, "categories"))
    const querySnapshot = await getDocs(q)
    let listOfCategories = []
    querySnapshot.forEach((doc) => {
      let category = {"id":doc.id, "title":doc.data()['title']}
      listOfCategories.push(category);
    });
    console.log(listOfCategories)
    setCategories(listOfCategories)
  }

  async function onChangeState(id){
    let checkBox = document.getElementById(id)
    if(checkBox.checked){
      let category = categories.filter(c=> c["id"] == id)
      selectedCategories.current.push(category[0]);
    }else{
      selectedCategories.current = selectedCategories.current.filter(function(c) {return c.id != id})
    }
    await getProductsFromFirebase()
  }

  /**
   * Get products from firebase
   */
  async function getProductsFromFirebase() {
    let myQuery;
    let isFiltered = false;
    console.log(selectedCategories.current.length)
    if(selectedCategories.current.length == 0){
      myQuery = query(collection(db, "products_blockchain"));
    }else{
      let IDs = selectedCategories.current.map(function(c){return c.id})
      myQuery = query(collection(db, "products_blockchain"), where("category", "in", IDs));
      isFiltered = true
    }

    console.log("Getting products...")
    const querySnapshot = await getDocs(myQuery)
    let listOfProducts = []
    querySnapshot.forEach((p) => {
      let data = p.data()
      data['id'] = p.id
      listOfProducts.push(data);
    });
    console.log("Products from Firebase", listOfProducts)
    setProductsFirebase(listOfProducts)

    if(isFiltered){
      let productsUpdated = []
      for (let index = 0; index < listOfProducts.length; index++) {
        const element = listOfProducts[index];
        productsUpdated.push(products[Number(element.id)])
      }      
      setProductsFiltered(productsUpdated)
    }else{
      console.log("Setting: ", products)
      setProductsFiltered(products)
    }
  }

  async function TrackProduct(id){
    console.log("Filter detecting tracking of product: ", id)
    console.log(addressWallet.value)
    console.log(addressWallet)

    const docRef = doc(db, 'users', '0xaD15200e1200388D6b6f642805FFe77214E2Bf31');
    await updateDoc(docRef, {
      tracking: id
    });
  }

  function ReportPrice(id){
    console.log("Reporting price of: "+id)
    setProductSelected(id)
    {/* window.location.href = "/home/product-detail" */}
    window.location.href = `/product/${id}`
  }

  useEffect(() => {
    getProductsFromFirebase().catch(console.error)
    return () => {
    }
  }, [products])
  

  useEffect(() => {
    getAllProducts()
    getCategoriesFromFirebase().catch(console.error)
    return () => {}
  },[])
  
  // async function getDocument(){
  //   const docRef = doc(db, "categories", "1");
  //   const docSnap = await getDoc(docRef);

  //   if (docSnap.exists()) {
  //     console.log("Document data:", docSnap.data());
  //   } else {
  //     // docSnap.data() will be undefined in this case
  //     console.log("No such document!");
  //   }
  // }

  return (
    <>
      <div className="card card-product card-plain">
        <div className="d-flex border-bottom pb-3">
          <h2 className="mb-3">Categories</h2>
        </div>
        <div className="row mt-5">
          <div className="col-12 col-md-4">
            <div className="accordion" id="accordionArrivals">

              <div className="accordion-item">
                <h5 className="accordion-header" id="headingFour">
                  <button className="accordion-button border-bottom font-weight-bold py-4" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="true" aria-controls="collapseFour">
                    Category
                    <i className="collapse-close fa fa-plus text-xs pt-1 position-absolute end-0 me-3" aria-hidden="true"></i>
                    <i className="collapse-open fa fa-minus text-xs pt-1 position-absolute end-0 me-3" aria-hidden="true"></i>
                  </button>
                </h5>
                <div id="collapseFour" className="accordion-collapse" aria-labelledby="headingFour" data-bs-parent="#accordionArrivals">
                  <div className="accordion-body text-sm opacity-8">
                    { categories != ""?
                        categories.map(function(c){
                          return(
                            <div className="form-check justify-content-start" key={c.id}>
                              <input className="form-check-input me-2" type="checkbox" value="" onChange={()=>{onChangeState(c.id)}} id={c.id} />
                              <label className="custom-control-label mb-0">{c.title}</label>
                            </div>
                          )
                        })
                      :
                        <></>
                    }
                  </div>
                </div>
              </div>

            </div>
          </div>
          <div className="col-12 col-md-8">
            <div className="border border-3 rounded-3 border-dashed h-100" style={{display:'flex', flexWrap:'wrap'}}>
              {
                productsFiltered.length > 0 && productsFirebase.length > 0?
                  productsFiltered.map((product, index) => 
                    <div className="col-md-6 col-lg-6"  key={index}>
                      <CardProduct
                        id={index}
                        thumb_src = {productsFirebase[index].image_url}
                        thumb_alt = "image of product"
                        // color = {product.color}
                        // colors = {product.colors}
                        title = {product[TITLE]}
                        description = {product[DESCRIPTION]}
                        // price = {product.price}
                        url={`/home/product/${index}`}
                        position = "center"
                        track = {TrackProduct}
                        report = {ReportPrice}
                      />
                    </div>
                  )
                  :
                  <></>
              }
              {/* {data.products.map(product => 
                <div class="col-md-6 col-lg-3">
                  <CardProduct 
                    thumb_src = {product.thumb_src}
                    thumb_alt = {product.thumb_alt}
                    color = {product.color}
                    colors = {product.colors}
                    title = {product.title}
                    description = {product.description}
                    price = {product.price}
                    position = "center"
                  />
                </div>
              )} */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CategoryFilter